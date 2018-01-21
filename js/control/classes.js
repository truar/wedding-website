/* Need JQUERY to work */

class Website {
    constructor(numberSection, currentSection, pageCurrentSection, screen, pages, guest) {
        this.numberSection = numberSection;
        this.currentSection = currentSection;
        this.pageCurrentSection = pageCurrentSection;
        this.screen = screen;
        this.pages = pages;
        this.guest = guest;
    }

    renderFirst(whereToRender, callback) {
        $(whereToRender).append("<section id="+this.pages[0].id+"></section>");
        this.pages[0].render(callback);
    }

    /* This method has to render the element given the order in the array */
    render(toRender, callback) {
        // Nothing to do if already rendered
        if(this.pages[toRender].isRendered) {
            if(callback) {
                callback();
            }
            return;
        }
        
        var lastRendered = this.pages[0];
        // First : research the closest lower rendered
        for(var i = 0; i < toRender; i++) {
            if(this.pages[i].isRendered) {
                lastRendered = this.pages[i];
            }
        }

        // Insert the content after the last rendered
        $("#" + lastRendered.id).after("<section id="+this.pages[toRender].id+"></section>");
        this.pages[toRender].render(callback);
    }
}

class Page {
    constructor(id, htmlFile, htmlPath, jsFile) {
        this.id = id;
        this.htmlFile = htmlFile;
        this.htmlPath = htmlPath;
        this.jsFile = jsFile;
        this.isRendered = false;
    }

    /* 
        Does not return anything. Apply the new HTML at the correct place into the webpage
    */
    render(callback) {
        
        if(this.isRendered) {
            if(callback) {
                callback();
            }
            return;
        }

        if(this.htmlFile) {
            var htmlPath = (this.htmlPath)? " " + this.htmlPath : "";
            $("#" + this.id).load(this.htmlFile + htmlPath, () => {
                this.isRendered = true;
                if(this.jsFile) {
                    $.getScript(this.jsFile).done(() => {
                        if(callback) {
                            callback();
                        }
                    });
                } else {
                    if(callback) {
                        callback();
                    }
                }
                
            });
        }
    }
}