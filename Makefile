# Bundler command
JSBUNDLER=browserify

# Script directory relative to the directory that the Makefile executes from
SRC=script/src
DIST=script/dist
BACK=../..

# The entry point file and its path relative to the current directory
MAIN=main.js
MAINPATH=$(SCRIPTDIR)/$(MAIN)
WORKER_SCRIPTS=apiservice.js

# Command options
LIB_BUNDLE_OPTS=-r ./model.js:model -r ./client.js:client -r ./controller.js:controller -r ./view.js:view
MAIN_BUNDLE_OPTS=-x controller

# In the worker bundle, unlike the main bundle, we re-require model and client because the worker cannot
#  refer to lib as it runs in a separate context.
WORKER_BUNDLE_OPTS=-r ./model.js:model -r ./client.js:client

# Output file name and relative path
LIB_BUNDLE=lib.js
WORKER_BUNDLE=worker.js
MAIN_BUNDLE=main.js

# This command creates script/dist if it does not exist
MK_DIST_DIR=mkdir -p $(DIST)

# Make all targets
.PHONY: all
all: $(DIST)/$(MAIN_BUNDLE) $(DIST)/$(WORKER_BUNDLE) $(DIST)/$(LIB_BUNDLE)

# Build the main bundle
$(DIST)/$(MAIN_BUNDLE): $(DIST)/$(LIB_BUNDLE)
	$(MK_DIST_DIR)
	pushd $(SRC) && $(JSBUNDLER) $(MAIN) $(MAIN_BUNDLE_OPTS) > $(BACK)/$(DIST)/$(MAIN_BUNDLE) && popd

# Build the worker bundle
$(DIST)/$(WORKER_BUNDLE) : $(DIST)/$(LIB_BUNDLE) $(add-prefix $(SRC),$(WORKER_SCRIPTS))
	$(MK_DIST_DIR)
	pushd $(SRC) && $(JSBUNDLER) $(WORKER_SCRIPTS) $(WORKER_BUNDLE_OPTS) > $(BACK)/$(DIST)/$(WORKER_BUNDLE) && popd

# Build the library bundle
$(DIST)/$(LIB_BUNDLE): $(filter-out $(add-prefix $(SRC)/,$(WORKER_SCRIPTS)), $(wildcard $(SRC)/*.js))
	$(MK_DIST_DIR)
	pushd $(SRC) && $(JSBUNDLER) $(LIB_BUNDLE_OPTS) > $(BACK)/$(DIST)/$(LIB_BUNDLE) && popd

# Clean up
.PHONY: clean
clean:
	pushd $(DIST); rm $(LIB_BUNDLE) $(MAIN_BUNDLE) $(WORKER_BUNDLE); popd

