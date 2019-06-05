import os
import json
from jinja2 import Environment, PackageLoader, select_autoescape

# Make these configurable as command line params
TARGET='dist'
CONFIG='template_config.json'

SOURCE_ROOT='src'

if __name__ == "__main__" :
    print("Loading configuration")
    with open(CONFIG, "r") as config_file:
        config = json.loads(config_file.read())

    for source in config["sources"]:
        print("Creating environment for", source)
        env = Environment(
            loader=PackageLoader(SOURCE_ROOT, source),
            autoescape=select_autoescape(['html', 'xml'])
        )

        context = config["context"] # this can be loaded from a config file...

        print("Compiling templates to", TARGET)
        templates = env.list_templates()
        for name in templates:
            if name not in config["exclude"]:
                template = env.get_template(name)
                template_str = template.render(context)
                outpath = os.path.join(TARGET, name)
                print("Writing to", outpath)
                with open(outpath, "w+") as outfile:
                    outfile.write(template_str)
