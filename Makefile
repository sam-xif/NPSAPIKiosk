# Bundler command
JSBUNDLER=browserify

# Script directory relative to the directory that the Makefile executes from
SCRIPTDIR=script

# The entry point file and its path relative to the current directory
MAIN=main.js
MAINPATH=$(SCRIPTDIR)/$(MAIN)

# Command options; change this variable to add more options
BUNDLEOPTS=-s main

# Output file name and relative path
OUTFILE=bundle.js
OUTPATH=$(SCRIPTDIR)/$(OUTFILE)

# Exclude these files (names separated by spaces) from the bundle
EXCLUDES=$(OUTPATH)

# Build the bundle
$(OUTPATH): $(filter-out $(EXCLUDES), $(wildcard $(SCRIPTDIR)/*.js))
	pushd $(SCRIPTDIR); $(JSBUNDLER) $(MAIN) $(BUNDLEOPTS) > $(OUTFILE); popd

# Clean up
.PHONY: clean
clean:
	pushd $(SCRIPTDIR); rm $(OUTFILE); popd

