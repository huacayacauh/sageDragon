/*
Add this file to $(ipython locate)/nbextensions/sageDragon.js
And load it with:

require(["nbextensions/sageDragon"], function (sageDragon_extension) {
    console.log('sageDragon extension loaded');
    sageDragon_extension.load_ipython_extension();
});

*/
define( function () {
    
    var sageDragon_notebook = function () {
       Jupyter.notebook.kernel.execute("%display latex");
       alert("SageDragon est activé");
    };
    
    var update_sageDragon_link = function(sageDragon_id) {
        if (!IPython.notebook) return;
        
        if (!sageDragon_id) {
            sageDragon_id = IPython.notebook.metadata.sageDragon_id;
        } else {
            IPython.notebook.metadata.sageDragon_id = sageDragon_id;
        }
        if (!sageDragon_id) {
            return;
        }
        var toolbar = IPython.toolbar.element;
        var link = toolbar.find("a#nbviewer");
        if ( ! link.length ) {
            link = $('<a id="nbviewer" target="_blank"/>');
            toolbar.append(
                $('<span id="nbviewer_span"/>').append(link)
            );
        }
    
        link.attr("href", "https://nbviewer.jupyter.org/" + sageDragon_id);
        link.text("https://nbviewer.jupyter.org/" + sageDragon_id);
    };

    var sageDragon_button = function () {
        if (!IPython.toolbar) {
            $([IPython.events]).on("app_initialized.NotebookApp", sageDragon_button);
            return;
        }
        if ($("#sageDragon_notebook").length === 0) {
            IPython.toolbar.add_buttons_group([
                {
                    'label'   : 'Use sageDragon',
                    'icon'    : 'fa-play-circle',
                    'callback':	sageDragon_notebook,
                    'id'      : 'sageDragon_notebook'
                },
            ]);
        }
        update_sageDragon_link();
    };
    
    var load_ipython_extension = function () {
        sageDragon_button();
        update_sageDragon_link();
        $([IPython.events]).on("notebook_loaded.Notebook", function () {update_sageDragon_link();});
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});
