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
     var boolean = false; // permet de connaitre l'état de notre module ( actvé, désactivé)

	
  	var create_var = function (){
	            var cell = arguments[0];
	            var text = cell.get_text();
	            var valide_function_to_factor = /([^a-zA-Z])/g;
	            var resultat = text.replace(valide_function_to_factor, "").split('');

	            for (var iter = 0; iter < resultat.length; iter++) 
	            {
	                var new_var = resultat[iter] + "=var('"+resultat[iter]+"')";
	                Jupyter.notebook.kernel.execute(new_var);
	            }
		return resultat;
	};

	var factor = function (cell) 
	{
	        var valide_function_to_factor = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_factor, "");

	        if(!valide && text.trim()!="")
	        {
		/*Création des variables*/
	             create_var(cell);
	             if(cell.output_area.outputs[0]!=undefined){
	                 cell.output_area.clear_output();
			}
	             Jupyter.notebook.kernel.execute("factor("+text+");", cell.get_callbacks(), {silent:false} );
	        }
	        else
	        {
	        	alert("Formule non valide");
	    	}
	};


	var createDialog = function(title, text, options) {
    		return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>").dialog(options);
	}

	var solve = function (cell) 
	{	
	        var valide_function_to_solve = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_solve, "");
		var vars;
		var varsButtons ="";
	

		
		if(!valide && text.trim()!="")
	        {
		/*Création des variables*/
	            vars = create_var(cell);
		/*Propositions des variables*/
		createDialog("Choose your variable",);

			if(vars[0] != undefined){
			     if(cell.output_area.outputs[0]!=undefined){
			         cell.output_area.clear_output();
				}

			
			     Jupyter.notebook.kernel.execute("solve("+text+","+vars[0]+");", cell.get_callbacks(), {silent:false} );
			}else{
				alert("Formule non valide");
			}
	        }
	        else
	        {
	        	alert("Formule non valide");
	    	}
	};

	//Donne la dérivée
	var diff = function (cell) 
	{
	        var valide_function_to_solve = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_solve, "");
		var vars;
		var varsButtons ="";

	        if(!valide && text.trim()!="")
	        {
		/*Création des variables*/
	            vars = create_var(cell);
			if(vars[0] != undefined){
			     if(cell.output_area.outputs[0]!=undefined){
			         cell.output_area.clear_output();
				}
			     Jupyter.notebook.kernel.execute("diff("+text+");", cell.get_callbacks(), {silent:false} );
			}else{
				alert("Formule non valide");
			}
	        }
	        else
	        {
	        	alert("Formule non valide");
	    	}
	};


	//Affiche un repère
	var plot = function (cell) 
	{
	        var valide_function_to_solve = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_solve, "");
		var vars;
		var varsButtons ="";

	        if(!valide && text.trim()!="")
	        {
		/*Création des variables*/
	            vars = create_var(cell);
			if(vars[0] != undefined){
			     if(cell.output_area.outputs[0]!=undefined){
			         cell.output_area.clear_output();
				}
			     Jupyter.notebook.kernel.execute("plot("+text+");", cell.get_callbacks(), {silent:false} );
			}else{
				alert("Formule non valide");
			}
	        }
	        else
	        {
	        	alert("Formule non valide");
	    	}
	};


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
		$('#maintoolbar:first').append('<div style="width:800px; margin:0 auto;" id=\"sageD_activated\"><div class=\" text-center container col-xs-2 \"><div class=\"alert alert-info\" role=\"alert\"><strong>SageDragon is now activated</strong></div><div id =\"content_sageD\"></div></div></div>');
			
	} 
	
	/*Display input cel*/
	var click_on_button = function(){
			//Permet de rafraichir le DOM et d'ajouter nos fonctionnalités
		// On écoute sur le bouton factor
		$("body").on('click','button[title =\"sageButtonFactor\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On factorise notre entrée
			factor(cell);
		});
		// On écoute sur le bouton solve
		$("body").on('click','button[title =\"sageButtonSolve\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On factorise notre entrée
			solve(cell);
		});		
		// On écoute sur le bouton Plot
		$("body").on('click','button[title =\"sageButtonPlot\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On plot notre entrée
			plot(cell);
		});
			// On écoute sur le bouton Diff
		$("body").on('click','button[title =\"sageButtonDiff\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On diff notre entrée
			diff(cell);
		});
	};

	//Display Advanced Button
	var display_button = function(){
	// buttons
<<<<<<< HEAD
	var buttons ="<div title=\"sage\" class =\"container\" style=\"border: 5px solid transparent\" ><div class=\"row\" <div class =\"col-xs-12\"><div class =\"col-xs-1\"><button title =\"sageButtonFactor\"type=\"button\" class=\"btn btn-info\">Factor</button></div><div class =\"col-xs-1\"><button title =\"sageButtonSolve\"type=\"button\" class=\"btn btn-warning\">Solve</button></div></div></div></div>";
=======
	var buttons ="<div title=\"sage\" class =\"container\" style=\"border: 5px solid transparent\" ><div class=\"row\" <div class =\"col-xs-12\"><div class =\"col-xs-1\"><button title =\"sageButtonFactor\"type=\"button\" class=\"btn btn-info\">Factor</button></div><div class =\"col-xs-1\"><button title =\"sageButtonSolve\"type=\"button\" class=\"btn btn-warning\">Solve</button></div><div class =\"col-xs-1\"><button title =\"sageButtonPlot\"type=\"button\" class=\"btn btn-danger\">Plot</button></div><button title =\"sageButtonDiff\"type=\"button\" class=\"btn btn-default\">Diff</button></div></div></div></div>";
>>>>>>> aa4103b93fa9605c3cb3d4fbf15800ed5b221958

		// check the focus
		$('body').on('focusin', '.selected .input_area', function(){
			// check if the sage butons is write
				$('.unselected > div[title =\"sage\"').remove();		
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








