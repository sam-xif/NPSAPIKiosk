"""
This script uses the Jinja2 library to compile templates according to a given build specification.
The first command line argument must be a file containing valid JSON that defines rules for how to build targets.

This is an overview of the format ([]'s around a field denote that a field is optional):

{
    ["globalContext": <global context object>],
    "rules": [
        {
            ["before": <command to run before processing files>],
            ["beforeEach": <command to run before processing EACH file>],
            ["after": <command to run after processing ALL files>],
            ["afterEach": <command to run after processing EACH file],
            ["context": <local context that shadows global context>],
            "source": <source_dir>,
            "target": <target_dir>,
            ["filters": [
                {
                    "type": <filter_type>
                    "pattern": <regex pattern that the filter uses to match; only required by some filter types>
                },
                ...
            ]]
        },
        ...
    ]
}
"""

import os
import sys
import json
import re
import subprocess

from functools import reduce

from jinja2 import Environment, FileSystemLoader, select_autoescape


class Filter:
    """
    Abstract base class for Filters. Defines a single method, test(), which is the Filter's predicate.
    """

    def __init__(self):
        pass

    def test(self, file_name):
        """
        Checks whether the given file name passes through this filter or not.
        :param file_name: The file name to test
        :return: Whether the file name passed through the filter or not
        """
        raise NotImplementedError()

    @classmethod
    def from_json(cls, data):
        """
        Creates a filter from a given JSON representation.
        :param data: JSON object to attempt to parse
        :return: A new Filter instance
        :raises ValueError: if the given JSON does not represent a filter or is not valid.
        """
        if "type" not in data:
            raise ValueError("JSON must have attribute 'type' defined")

        if data["type"] == "includeAllExcept" and "pattern" in data:
            return IncludeAllExceptFilter(data["pattern"])
        elif data["type"] == "excludeAllExcept" and "pattern" in data:
            return ExcludeAllExceptFilter(data["pattern"])
        elif data["type"] == "includeAll":
            return AcceptAll()
        elif data["type"] == "excludeAll":
            return AcceptNone()
        else:
            raise ValueError("Invalid filter type in given JSON")


class BinaryFilter(Filter):
    """
    Composes two Filters.
    """

    def __init__(self, filter1, filter2, combine_func):
        """
        Creates a new BinaryFilter instance.
        :param filter1: The first filter
        :param filter2: The second filter
        :param combine_func: A (boolean, boolean) -> boolean function that combines the results of the two
                             Filter's tests
        """

        super()
        self.filter1 = filter1
        self.filter2 = filter2
        self.combine_func = combine_func

    def test(self, file_name):
        return self.combine_func(self.filter1.test(file_name), self.filter2.test(file_name))


class IncludeAllExceptFilter(Filter):
    """
    Filter that includes all files except for files that match a certain pattern.
    """

    def __init__(self, pattern):
        super()
        self.pattern = pattern
        self.compiled_pattern = re.compile(pattern)

    def test(self, file_name):
        match = self.compiled_pattern.search(file_name)
        return match is None


class ExcludeAllExceptFilter(Filter):
    """
    Filter that excludes all files except for files that match a certain pattern.
    """

    def __init__(self, pattern):
        super()
        self.pattern = pattern
        self.compiled_pattern = re.compile(pattern)

    def test(self, file_name):
        match = self.compiled_pattern.search(file_name)
        return match is not None


class AcceptAll(Filter):
    """
    Filter that accepts all files.
    """
    def test(self, pattern): return True


class AcceptNone(Filter):
    """
    Filter that rejects all files.
    """
    def test(self, pattern): return False


def execute_command(command, vars):
    full_command = '{0}; {1}'.format(' '.join([name + "=" + vars[name] for name in vars]), command)
    print("Executing command:", full_command)
    subprocess.run(full_command, shell=True, check=True)


if __name__ == "__main__" :
    CONFIG = sys.argv[1]

    print("Loading configuration\n")
    with open(CONFIG, "r") as config_file:
        config = json.loads(config_file.read())

    source_root = config["sourceRoot"] if "sourceRoot" in config else "./"
    global_context = config["globalContext"] if "globalContext" in config else {}

    if "rules" not in config:
        raise ValueError("Configuration must define a 'rules' array")

    for rule in config["rules"]:
        source = rule["source"]
        print("Creating environment for", source)
        env = Environment(
            loader=FileSystemLoader(os.path.join(source_root, source)),
            autoescape=select_autoescape(['html', 'xml'])
        )

        target = rule["target"]

        # Combine the two dictionaries
        context = {**global_context, **(rule["context"] if "context" in rule else {})}

        if "filters" in rule:
            filters = [Filter.from_json(filter_json) for filter_json in rule["filters"]]
            or_func = lambda a, b: a or b
            compiled_filter = reduce(lambda f1, f2: BinaryFilter(f1, f2, or_func), filters, AcceptNone())
        else:
            compiled_filter = AcceptAll()

        if "before" in rule:
            execute_command(rule["before"], {"SRC": source, "TARGET": target})

        print("Compiling templates to", target)
        templates = env.list_templates()
        for name in templates:
            if compiled_filter is not None and not compiled_filter.test(name):
                continue

            if "beforeEach" in rule:
                execute_command(rule["beforeEach"], {"FILE": name, "SRC": source, "TARGET": target})

            template = env.get_template(name)
            template_str = template.render(global_context)
            outpath = os.path.join(target, name)

            print("Writing to", outpath)
            with open(outpath, "w+") as outfile:
                outfile.write(template_str)

            if "afterEach" in rule:
                execute_command(rule["afterEach"], {"FILE": name, "SRC": source, "TARGET": target})

        if "after" in rule:
            execute_command(rule["after"], {"SRC": source, "TARGET": target})

        print("")  # newline
