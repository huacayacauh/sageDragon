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
     

    	/*Display latex et bouton start*/
	var sageDragon_notebook = function () {
		/*Affichage du latex*/
		Jupyter.notebook.kernel.execute("%display latex");
		/*Bouton start*/
		 $('#maintoolbar:first').append('<div id=\"sageD_activated\"><div class=\" text-center container col-xs-2 \"><div class=\"alert alert-info\" role=\"alert\"><strong>SageDragon is now activated</strong></div><div id =\"content_sageD\"></div></div></div>');
		/*AJouter le click sur une cellules*/
		add_click_on_cell();
	};

 

	/*Rend une cellule clickable*/
	var add_click_on_cell = function(){
			//Permet de rafraichir le DOM et d'ajouter nos fonctionnalités
			$(document).on("append",".input_prompt",
			    function(){
				$(Items).chosen({disable_search_threshold: 100});
				$("#Items_chosen").css({"width":"100px","position":"absolute","left":"5px","top":"20px"});
			    }
			);
			
			$("body").on('append','.input_prompt', function() {
				$('.input_prompt').append("<button type=\"button\" class=\"btn btn-default\">Advanced</button>");
			});
		 	$("body").on('click','.input_prompt', function() {
				var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
				//var valeurOutput = JSON.stringify(cell.output_area.outputs[0].data["text/plain"]).replace(/\"/g,"");

				// on crée une fenetre pour afficher les options
				alert("ok");
		 		
			});
	};



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
			// activer l'exte
			js_cm.update('notebook', {"load_extensions": {'sageDragon/static/js/notebook ': True}})
	};
		return {
		load_ipython_extension: load_ipython_extension
	};
});








