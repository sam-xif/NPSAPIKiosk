# Bundler command
JSBUNDLER=browserify

# Script directory relative to the directory that the Makefile executes from
SRC=script/src
DIST=script/dist
BACK=../..

# The entry point file and its path relative to the current directory
MAIN=main.js
MAINPATH=$(SCRIPTDIR)/$(MAIN)
WORKER=apiservice.js

# Exclude these files (names separated by spaces) from the list of dependencies
EXCLUDES=$(OUTPATH) $(WORKERS)

# Command options which exclude files from the bundle itself
BUNDLE_EXCLUDES=

# Command options
LIB_BUNDLE_OPTS=-r ./model.js:model -r ./client.js:client -r ./controller.js:controller -r ./view.js:view $(BUNDLE_EXCLUDES)
# In the worker bundle, we re-require model and client because the worker cannot
#  refer to lib as it runs in a separate context.
WORKER_BUNDLE_OPTS=-r ./model.js:model -r ./client.js:client
MAIN_BUNDLE_OPTS=-x controller

# Output file name and relative path
LIB_BUNDLE=lib.js
WORKER_BUNDLE=worker.js
MAIN_BUNDLE=main.js

# Worker scripts that should not be included in the bundle
WORKERS=$(SCRIPTDIR)/apiservice.js 

.PHONE: all
all: $(DIST)/$(MAIN_BUNDLE) $(DIST)/$(WORKER_BUNDLE) $(DIST)/$(LIB_BUNDLE)

$(DIST)/$(MAIN_BUNDLE): $(DIST)/$(LIB_BUNDLE)
	pushd $(SRC) && $(JSBUNDLER) $(MAIN) $(MAIN_BUNDLE_OPTS) > $(BACK)/$(DIST)/$(MAIN_BUNDLE) && popd

# Build the worker bundle
$(DIST)/$(WORKER_BUNDLE) : $(DIST)/$(LIB_BUNDLE)
	pushd $(SRC) && $(JSBUNDLER) $(WORKER) $(WORKER_BUNDLE_OPTS) > $(BACK)/$(DIST)/$(WORKER_BUNDLE) && popd

# Build the main bundle
$(DIST)/$(LIB_BUNDLE): $(filter-out $(EXCLUDES), $(wildcard $(SCRIPTDIR)/*.js))
	pushd $(SRC) && $(JSBUNDLER) $(LIB_BUNDLE_OPTS) > $(BACK)/$(DIST)/$(LIB_BUNDLE) && popd

# Clean up
.PHONY: clean
clean:
	pushd $(DIST); rm $(LIB_BUNDLE) $(MAIN_BUNDLE) $(WORKER_BUNDLE); popd

