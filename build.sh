#!/bin/bash

# Compile templates
source ./env/bin/activate
python compile-templates.py templates.config.json
deactivate

# make all scripts
make all

# Copy static resources
cp -r ./static/ ./dist/static/
