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

	//Créé les variables inséré dans l'input
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

        /*
        Cette fonction prend en paramètre une cellule et une opération. L’opération contient ce qu’il faut exécuter avec le kernel, 
        et elle est définie auparavant dans les différente fonctions qui appeleront check_and_execute. 
        */
	var check_and_execute_formule = function (cell, operation)
	{
		//Exécute une commande "opération" via le kernel
                //cell.get_callbacks() permet de récupérer le résultat et de le mettre dans l'output de la cellule
		Jupyter.notebook.kernel.execute(operation, cell.get_callbacks(), {silent:false} );
		//On attend le résultat
                setTimeout(function(){
			//si output contient une erreur on vide l'output et on indique que la formule n'est pas valide
			if(cell.output_area.outputs[0].traceback != undefined){			
				cell.output_area.clear_output();
				alert("Formule non valide");		
			}	
		}, 200);
	}



	//developpe les formules
	var expand = function (cell) 
	{
                //On récupère ce qu'il y dans l'input de la cellule
		var text = cell.get_text();
                //si l'input est vide on indique que le formule n'est pas valide
		if(text.trim()!="")
		{
			//formatage de la chaine en fonction de l'opération à effectuer
			var operation = "expand("+text+");"
			//Création des variables
	        	create_var(cell);
                        //si l'output n'est pas vide, on le vide
	        	if(cell.output_area.outputs[0]!=undefined){
	        		cell.output_area.clear_output();
			}
                //vérification de la formule et exécution de la commande	
		check_and_execute_formule(cell, operation);	
	        }
	 	else
	 	{
	        	alert("Formule non valide");
	 	}
	};
	
	// Fonction pour factoriser
	var factor = function (cell) 
	{
		//On récupère ce qu'il y dans l'input de la cellule
		var text = cell.get_text();
		//si l'input est vide on indique que le formule n'est pas valide
		if(text.trim()!="")
		{
			//formatage de la chaine en fonction de l'opération à effectuer			
			var operation = "factor("+text+");";
			//Création des variables
	        	create_var(cell);
			//si l'output n'est pas vide, on le vide
	        	if(cell.output_area.outputs[0]!=undefined){
	        		cell.output_area.clear_output();
			}	
		//vérification de la formule et exécution de la commande
		check_and_execute_formule(cell, operation);	
	        }
	 	else
	 	{
	        	alert("Formule non valide");
	 	}
	};
	// Créer un boite de dialog
	var createDialog = function(title, text, options) {
    		return $("<div class='modal-dialog modal-lg' title='" + title + "'><p>" + text + "</p></div>").dialog(options);
	}

	var solve = function (cell) 
	{	
	        var valide_function_to_solve = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
		
		// contenu input
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_solve, "");
		if(text.trim()!="")
		{
			var vars; // variables en string
			var input; // l'input de la cellule
			var inputTab =[]; // cellule Unique dans un tab
			var find; // permet de savoir si la variable est unique ou pas
			var buttons = {} ;//Stocker les boutons dans la boite de dialog


			/*Création des variables*/
			    vars = create_var(cell);
				if(cell.output_area.outputs[0]!=undefined){
	        			cell.output_area.clear_output();
				}
			/*Propositions des variables*/
			 inputTab = variablesUnique(vars);

			// On créé notre input
			input = "<div class ='col-xs-12'><b>Choose the variable in order to solve :<br><center>"+text+"</center></b></div>";
		
			// création des boutons

			var val = [];
			for(i = 0 ; i < inputTab.length; i ++){
				val[i] = inputTab[i];
				buttons[val[i]] = factoryButtons(val[i],text,cell);	 
			}

			// creation de la boite de dialog
			var options = {height: 'auto',width: 'auto', buttons:buttons}
			createDialog("Choose your variable",input,options);
		}else{
	        	alert("Formule non valide");
		}
	};
	
	//Check des noms de variables : on élimine les doublons
	var variablesUnique = function (vars){
		var b = 0; // indice de parcour de inputTab
		var inputTab = []; // tableau de stockage des variables uniques
		for (i = 0; i < vars.length; i++) {
			 
			for (a = 0; a < inputTab.length; a++) {
				if(inputTab[a] == vars[i]){
					find = true;
				}
			}
			if(find != true){
				inputTab[b] = vars[i];
				b ++;
			}else{
				find = false;
			}
		}
		return inputTab;
	}

	//Créer les boutons du popups de séléctions des variables
	var factoryButtons = function(i,text,cell){
		return function(){
			solvExec(text,i,cell);
			$(this).dialog('close'); 
	}

	};


	// Exécution solve : on attend le click du bouton de la boite de dialog pour connaître la variable
	var solvExec = function (text,varChosen,cell){
		var operation = "solve("+text+","+varChosen+");";
		check_and_execute_formule(cell, operation);	
	};


                        
 
	//Donne la dérivée
	var diff = function (cell) 
	{
		//On récupère ce qu'il y dans l'input de la cellule
		var text = cell.get_text();
		//si l'input est vide on indique que le formule n'est pas valide
		if(text.trim()!="")
		{
			//formatage de la chaine en fonction de l'opération à effectuer	
			var operation = "diff("+text+");"
			//Création des variables 
	        	create_var(cell);
			//si l'output n'est pas vide, on le vide
	        	if(cell.output_area.outputs[0]!=undefined){
	        		cell.output_area.clear_output();
			}
		//vérification de la formule et exécution de la commande	
		check_and_execute_formule(cell, operation);	
	        }
	 	else
	 	{
	        	alert("Formule non valide");
	 	}
	};



	//Affiche un repère
	var plot = function (cell) 
	{
		//On récupère ce qu'il y dans l'input de la cellule
		var text = cell.get_text();
		//si l'input est vide on indique que le formule n'est pas valide
		if(text.trim()!="")
		{
			//formatage de la chaine en fonction de l'opération à effectuer
			var operation = "plot("+text+");"
			//Création des variables 
	        	create_var(cell);
			//si l'output n'est pas vide, on le vide
	        	if(cell.output_area.outputs[0]!=undefined){
	        		cell.output_area.clear_output();
			}
		//vérification de la formule et exécution de la commande	
		check_and_execute_formule(cell, operation);	
	        }
	 	else
	 	{
	        	alert("Formule non valide");
	 	}
	};


		
		        		
	//simplifie les formules
	var simplify = function (cell) 
	{
		//On récupère ce qu'il y dans l'input de la cellule
		var text = cell.get_text();
		//si l'input est vide on indique que le formule n'est pas valide
		if(text.trim()!="")
		{
			//formatage de la chaine en fonction de l'opération à effectuer
			var operation = "("+text+").simplify_full();"
			//Création des variables
	        	create_var(cell);
			//si l'output n'est pas vide, on le vide
	        	if(cell.output_area.outputs[0]!=undefined){
	        		cell.output_area.clear_output();
			}
		//vérification de la formule et exécution de la commande	
		check_and_execute_formule(cell, operation);	
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
		$('#maintoolbar:first').append('<div class =\"text-center\"><div class=\" text-center container col-xs-2 \"><div class=\"alert alert-info\" role=\"alert\"><strong>SageDragon is now activated</strong></div><div id =\"content_sageD\"></div></div></div>');
			
	} 
	
	/*Display input cel*/
	var click_on_button = function(){
			//Permet de rafraichir le DOM et d'ajouter nos fonctionnalités
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
		// On écoute sur le bouton simplify
		$("body").on('click','button[title =\"sageButtonSimplify\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On simplify notre entrée
			simplify(cell);
		});
			// On écoute sur le bouton Expand
		$("body").on('click','button[title =\"sageButtonExpand\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On Expand notre entrée
			expand(cell);
		});
	};

	//Display Advanced Button
	var display_button = function(){
	// buttons

		var buttons ="<div title=\"sage\" class =\"container\" style=\"border: 5px solid transparent\" ><div class=\"row\"> <div class =\"col-xs-12\"><div class =\"col-xs-1\"><button title =\"sageButtonFactor\"type=\"button\" class=\"btn btn-info\">Factor</button></div><div class =\"col-xs-1\"><button title =\"sageButtonSolve\"type=\"button\" class=\"btn btn-warning\">Solve</button></div><div class =\"col-xs-1\"><button title =\"sageButtonPlot\"type=\"button\" class=\"btn btn-danger\">Plot</button></div><div class =\"col-xs-1\"><button title =\"sageButtonExpand\"type=\"button\" class=\"btn btn-warning\">Expand</button></div><div class =\"col-xs-1\"><button title =\"sageButtonDiff\"type=\"button\" class=\"btn btn-danger\">Diff</button></div><div class =\"col-xs-1\"><button title =\"sageButtonSimplify\"type=\"button\" class=\"btn btn-info\">Simplify</button></div></div></div>";

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
			// activer l'extension
			js_cm.update('notebook', {"load_extensions": {'sageDragon/static/js/notebook ': True}})
	};
		return {
		load_ipython_extension: load_ipython_extension
	};
});
