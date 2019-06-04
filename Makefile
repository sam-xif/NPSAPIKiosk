# Bundler command
JSBUNDLER=browserify

# Script directory relative to the directory that the Makefile executes from
SRC=src/script
OUT=dist/script
BACK=../..

# The entry point file and its path relative to the current directory
MAIN=main.js
MAINPATH=$(SCRIPTDIR)/$(MAIN)
WORKER_SCRIPTS=clientWorkerMain.js

# Command options
LIB_BUNDLE_OPTS=-r ./model.js:model -r ./client.js:client -r ./controller.js:controller -r ./view.js:view -r ./clientWorkerManager.js:worker
MAIN_BUNDLE_OPTS=-x controller

# In the worker bundle, unlike the main bundle, we re-require model and client because the worker cannot
#  refer to lib as it runs in a separate context.
WORKER_BUNDLE_OPTS=-r ./model.js:model -r ./client.js:client

# Output file name and relative path
LIB_BUNDLE=lib.js
WORKER_BUNDLE=worker.js
MAIN_BUNDLE=main.js

# This command creates the output directory if it does not exist
MK_OUT_DIR=mkdir -p $(OUT)

# Make all targets
.PHONY: all
all: $(OUT)/$(MAIN_BUNDLE) $(OUT)/$(WORKER_BUNDLE) $(OUT)/$(LIB_BUNDLE)

# Build the main bundle
$(OUT)/$(MAIN_BUNDLE): $(OUT)/$(LIB_BUNDLE)
	$(MK_OUT_DIR)
	pushd $(SRC) && $(JSBUNDLER) $(MAIN) $(MAIN_BUNDLE_OPTS) > $(BACK)/$(OUT)/$(MAIN_BUNDLE) && popd

# Build the worker bundle
$(OUT)/$(WORKER_BUNDLE) : $(OUT)/$(LIB_BUNDLE) $(add-prefix $(SRC),$(WORKER_SCRIPTS))
	$(MK_OUT_DIR)
	pushd $(SRC) && $(JSBUNDLER) $(WORKER_SCRIPTS) $(WORKER_BUNDLE_OPTS) > $(BACK)/$(OUT)/$(WORKER_BUNDLE) && popd

# Build the library bundle
$(OUT)/$(LIB_BUNDLE): $(filter-out $(add-prefix $(SRC)/,$(WORKER_SCRIPTS)), $(wildcard $(SRC)/*.js))
	$(MK_OUT_DIR)
	pushd $(SRC) && $(JSBUNDLER) $(LIB_BUNDLE_OPTS) > $(BACK)/$(OUT)/$(LIB_BUNDLE) && popd

# Clean up
.PHONY: clean
clean:
	pushd $(OUT); rm $(LIB_BUNDLE) $(MAIN_BUNDLE) $(WORKER_BUNDLE); popd

