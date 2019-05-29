JSBUNDLER=browserify
SCRIPTDIR=script
MAIN=main.js
MAINPATH=$(SCRIPTDIR)/$(MAIN)
OUTFILEOPT=-o
OUTFILE=bundle.js
OUTPATH=$(SCRIPTDIR)/$(OUTFILE)

$(SCRIPTDIR)/$(OUTFILE): $(filter-out $(OUTPATH), $(wildcard $(SCRIPTDIR)/*.js))
	pushd $(SCRIPTDIR); $(JSBUNDLER) $(MAIN) --s main > $(OUTFILE); popd

.PHONY: clean
clean:
	pushd ./$(SCRIPTDIR); rm $(OUTFILE); popd

