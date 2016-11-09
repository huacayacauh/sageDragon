/*
 Add this file to $(ipython locate)/nbextensions/sageDragon.js
 And load it with:
 
 require(["nbextensions/sageDragon"], function (sageDragon_extension) {
 console.log('sageDragon extension loaded');
 sageDragon_extension.load_ipython_extension();
 });
 
 */


define(function () {


    /*Display latex et clear outputs*/
    var sageDragon_notebook = function () {
        Jupyter.notebook.kernel.execute("%display latex");
        Jupyter.dialog.modal({
            title: "sageDragon activé",
            body: "",
            buttons: {"ok": {}}
        });

        // on cherche le bouton run cell et on ajoute l'action onclick
        //PROBLEME IL FAUT RÉUSIR A AFFICHER APRES LE OUTPUT DE MATHJAX ET NON AVANT
        $('[title ="run cell, select below"]').click(function () {
            alert($(".MJX_Assistive_MathML:last").text())
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

    var load_ipython_extension = function () {
        sageDragon_button();
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








