/*
 Add this file to $(ipython locate)/nbextensions/sageDragon.js
 And load it with:
 
 require(["nbextensions/sageDragon"], function (sageDragon_extension) {
 console.log('sageDragon extension loaded');
 sageDragon_extension.load_ipython_extension();
 });
 
 */

define(

function () {
     var boolean = false; // permet de connait l'état de notre module ( actvé, désactivé)
     var idTextarea = 0;
    	/*Display latex et bouton start*/
	var sageDragon_notebook = function () {
		// Vérifier si l'utilisateur à déja activé le module
		if(boolean == false){
			/*Affichage du latex*/
			Jupyter.notebook.kernel.execute("%display latex");
			/*Bouton start*/
			display_start_button();
			//Display Advanced Button
			display_button();
			/*Affiche l' input de la cellule*/
			click_on_button();	
			// module activé		
			boolean = true;
		}
	};

 
	/*Display start button*/
	var display_start_button = function(){
		$('#maintoolbar:first').append('<div id=\"sageD_activated\"><div class=\" text-center container col-xs-2 \"><div class=\"alert alert-info\" role=\"alert\"><strong>SageDragon is now activated</strong></div><div id =\"content_sageD\"></div></div></div>');
			
	} 
	
	/*Display input cel*/
	var click_on_button = function(){
			//Permet de rafraichir le DOM et d'ajouter nos fonctionnalités
	
		$("body").on('click','button[title =\"sageButton\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
			var valeurInput = cell.get_text();
			// on crée une fenetre pour afficher les options
			alert(valeurInput);
		});
	};

	//Display Advanced Button
	var display_button = function(){
	// buttons
	var buttons ="<div title=\"sage\" class =\"container\" style=\"border: 5px solid transparent\" ><div class=\"row\" <div class =\"col-xs-12\"><div class =\"col-xs-1\"><button title =\"sageButton\"type=\"button\" class=\"btn btn-info\">Factory</button></div><div class =\"col-xs-3\"><button title =\"sageButton\"type=\"button\" class=\"btn btn-warning\">Resolve</button></div></div></div></div>";

		// check the focus
		$('body').on('focusin', '.selected .input_area', function(){
			// check if the sage butons is write
			if($('.selected > div[title !=\"sage\"]')){
				// supprimer div 
				$('.selected > div[title =\"sage\"').remove();
				//Buttons à insérer
				$('.selected').prepend(buttons);
			}		
		});	
	}

	/*Ajouter un bouton sageDragon*/
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


        var test = function(jupyter, $) {
            $(jupyter.events).on("kernel_ready.Kernel", function () {
                console.log("Auto-running all cells-below...");
                jupyter.actions.call('jupyter-notebook:run-all-cells-below');
                jupyter.actions.call('jupyter-notebook:save-notebook');
            });
        }


	var load_ipython_extension = function () {
		var kernel = IPython.notebook.kernel;
		/*Activer le module*/
		sageDragon_button();
		/*Activer l'extension*/
		activate_extension(self);
	};

	var activate_extension = function (self) {
		//Install JS extensions
			path = os.path.abspath(os.path.join.dirname("notebook", os.path.padir));
			install_nbextension(path, overwrite = True, user = True);
			js_cm = ConfigManager();
			// activer l'extension
			js_cm.update('notebook', {"load_extensions": {'sageDragon/static/js/notebook ': True}})
	};
		return {
		load_ipython_extension: load_ipython_extension
	};
});








