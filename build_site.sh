#!/bin/bash

# make all scripts
make all

source ./env/bin/activate
python compile_templates.py
deactivate

cp -r ./static/ ./dist/static/
