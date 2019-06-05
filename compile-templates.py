import os
import sys
import json
import re
import subprocess

from functools import reduce

from jinja2 import Environment, FileSystemLoader, select_autoescape


class Filter:
    def __init__(self):
        pass

    def test(self, file_name):
        raise NotImplementedError()

    @classmethod
    def from_json(cls, data):
        if data["type"] == "includeAllExcept":
            return IncludeAllExceptFilter(data["pattern"])
        elif data["type"] == "excludeAllExcept":
            return ExcludeAllExceptFilter(data["pattern"])
        else:
            raise ValueError("Invalid filter type in given JSON")


class BinaryFilter(Filter):
    def __init__(self, filter1, filter2, combine_func):
        super()
        self.filter1 = filter1
        self.filter2 = filter2
        self.combine_func = combine_func

    def test(self, file_name):
        return self.combine_func(self.filter1.test(file_name), self.filter2.test(file_name))


class IncludeAllExceptFilter(Filter):
    def __init__(self, pattern):
        super()
        self.pattern = pattern
        self.compiled_pattern = re.compile(pattern)

    def test(self, file_name):
        match = self.compiled_pattern.search(file_name)
        return match is None


class ExcludeAllExceptFilter(Filter):
    def __init__(self, pattern):
        super()
        self.pattern = pattern
        self.compiled_pattern = re.compile(pattern)

    def test(self, file_name):
        match = self.compiled_pattern.search(file_name)
        return match is not None


class AcceptAll(Filter):
    def test(self, pattern): return True


class AcceptNone(Filter):
    def test(self, pattern): return False


if __name__ == "__main__" :
    CONFIG = sys.argv[1]

    print("Loading configuration\n")
    with open(CONFIG, "r") as config_file:
        config = json.loads(config_file.read())

    source_root = config["sourceRoot"] if "sourceRoot" in config else "./"
    global_context = config["globalContext"] if "globalContext" in config else {}

    for rule in config["rules"]:
        source = rule["source"]
        print("Creating environment for", source)
        env = Environment(
            loader=FileSystemLoader(os.path.join(source_root, source)),
            autoescape=select_autoescape(['html', 'xml'])
        )

        target = rule["target"]
        global_context.update(rule["context"] if "context" in rule else {})

        if "filters" in rule:
            filters = [Filter.from_json(filter_json) for filter_json in rule["filters"]]
            or_func = lambda a, b: a or b
            compiled_filter = reduce(lambda f1, f2: BinaryFilter(f1, f2, or_func), filters, AcceptNone())
        else:
            compiled_filter = None

        if "before" in rule:
            print("Executing before script with SRC={0} and TARGET={1}".format(source, target))
            subprocess.run("SRC={0} TARGET={1}; {2}".format(source, target, rule["before"]), shell=True, check=True)

        print("Compiling templates to", target)
        templates = env.list_templates()
        for name in templates:
            if compiled_filter is not None and not compiled_filter.test(name):
                continue

            if "beforeEach" in rule:
                print("Executing beforeEach script with FILE={0}".format(name))
                subprocess.run("FILE={0}; {1}".format(name, rule["beforeEach"]), shell=True, check=True)

            template = env.get_template(name)
            template_str = template.render(global_context)
            outpath = os.path.join(target, name)
            print("Writing to", outpath)
            with open(outpath, "w+") as outfile:
                outfile.write(template_str)

            if "afterEach" in rule:
                print("Executing afterEach script with FILE={0}".format(name))
                subprocess.run("FILE={0}; {1}".format(name, rule["afterEach"]), shell=True, check=True)

        if "after" in rule:
            print("Executing after script with SRC={0} and TARGET={1}".format(source, target))
            subprocess.run("SRC={0} TARGET={1}; {2}".format(source, target, rule["after"]), shell=True, check=True)

        print("")  # newline
