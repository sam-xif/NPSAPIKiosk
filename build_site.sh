#!/bin/bash

# Compile templates
source ./env/bin/activate
python compile_templates.py template_config.json
deactivate

# make all scripts
make all

# Copy static resources
cp -r ./static/ ./dist/static/
