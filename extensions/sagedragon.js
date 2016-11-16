/*
 Add this file to $(ipython locate)/nbextensions/sageDragon.js
 And load it with:
 
 require(["nbextensions/sageDragon"], function (sageDragon_extension) {
 console.log('sageDragon extension loaded');
 sageDragon_extension.load_ipython_extension();
 });
 
 */


define(/*['../../static/notebook/js/outputarea',
        '../../static/notebook/js/cell',
	'../../static/notebook/js/codecell',
	'../../static/notebook/js/notebook'
], */function () {
     


    /*Display latex et clear outputs*/

    var sageDragon_notebook = function () {
        Jupyter.notebook.kernel.execute("%display latex");
        Jupyter.dialog.modal({
            title: "sageDragon activé",
            body: "",
            buttons: {"ok": {}}
        });
    };

 
	

	var afficher_Output = function () {
		var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
		var valeurOutput = JSON.stringify(cell.output_area.outputs[0].data["text/plain"]).replace(/\"/g,"");
	Jupyter.dialog.modal({
            title: valeurOutput,
            body: "",
            buttons: {"ok": {}}
        });
    };
	

    var display_output = function () {
        $(".output_result").text(function (index, actuel) {
            alert('Output ' + (index + 1) + ' : ' + actuel)
        });
    };

    var sageDragon_button = function () {
        if (!IPython.toolbar) {
            $([IPython.events]).on("app_initialized.NotebookApp", sageDragon_button);
            return;
        }
        if ($("#sageDragon_notebook").length === 0) {
            IPython.toolbar.add_buttons_group([
                {
                    'label': 'Use sageDragon',
                    'icon': 'fa-play-circle',
                    'callback': sageDragon_notebook,
                    'id': 'sageDragon_notebook'
                },
            ]);
        }
    };

     var afficherOutput_button = function () {
        if (!IPython.toolbar) {
            $([IPython.events]).on("app_initialized.NotebookApp", afficherOutput_button);
            return;
        }
        if ($("#afficher_Output").length === 0) {
            IPython.toolbar.add_buttons_group([
                {
                    'label': 'Use afficherOutput',
                    'icon': 'fa-play-circle',
                    'callback': afficher_Output,
                    'id': 'afficher_Output'
                },
            ]);
        }
    };

    var load_ipython_extension = function () {
        sageDragon_button();
	afficherOutput_button();
        activate_extension(self);
    };

    var activate_extension = function (self) {
        //Install JS extensions
        path = os.path.abspath(os.path.join.dirname("notebook", os.path.padir));
        install_nbextension(path, overwrite = True, user = True);
        js_cm = ConfigManager();
        js_cm.update('notebook', {"load_extensions": {'sageDragon/static/js/notebook ': True}})
    };
    return {
        load_ipython_extension: load_ipython_extension
    };



});








