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
	}

	var factor = function () 
	{
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
	        var valide_function_to_factor = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_factor, "");
	        if(!valide)
	        {
	             create_var(cell);
	             if(cell.output_area.outputs[0]!=undefined)
	                 cell.output_area.clear_output();
	             Jupyter.notebook.kernel.execute("factor("+text+");", cell.get_callbacks(), {silent:false} );
	        }
	        else{
	        alert("Formule non valide");
	    }
	}


	var factor_button = function () 
	{
			if (!IPython.toolbar) {
			    $([IPython.events]).on("app_initialized.NotebookApp", factor_button);
			    return;
			}
			if ($("#factor").length === 0) {
			    IPython.toolbar.add_buttons_group([
			        {
			            'label': 'Factor',
			            'icon': 'fa-play-circle',
			            'callback': factor,
			            'id': 'factor'
			        },
			    ]);
			}
	    };
    	/*Display latex et bouton start*/
	var sageDragon_notebook = function () {
		/*Affichage du latex*/
		Jupyter.notebook.kernel.execute("%display latex");
		/*Bouton start*/
		 $('#maintoolbar:first').append('<div id=\"sageD_activated\"><div class=\" text-center container col-xs-2 \"><div class=\"alert alert-info\" role=\"alert\"><strong>SageDragon is now activated</strong></div><div id =\"content_sageD\"></div></div></div>');
		/*AJouter le click sur une cellules*/
		//<textarea id="textarea" rows="4" cols="50">sample textarea</textarea>

		%%javascript 
		$("#notebook-container").on('click',function() 
		{ 
	    	if ($('#fonct').length>0) 
	     	{
	            $("#fonct").appendTo('.selected .input');
	    	} 
	     	else 
	     	{
	        	var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
	        	$('.selected .input').append('<div id="fonct"><button id="factor">factor</button></div>');
	        	$('#factor').click(function()
	         	{
	            	if(cell.output_area.outputs[0]!=undefined)
	                	cell.output_area.clear_output();
	            		Jupyter.notebook.kernel.execute("factor("+cell.get_text()+");", cell.get_callbacks(), {silent:false} );
	         	});
	     	}
    
		});
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
			$(".cell, .selected").click(function(){
				var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
				 ​alert("ok");
					});
		 	$("body").on('click','.input_prompt', function() {
				var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
				var valeurOutput = cell.output_area.outputs[0].data["text/plain"];

				// on crée une fenetre pour afficher les options
				alert(valeurOutput);
		 		
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
		factor_button();
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

