/*
Add this file to $(ipython locate)/nbextensions/sageDragon.js
And load it with:

require(["nbextensions/sageDragon"], function (sageDragon_extension) {
    console.log('sageDragon extension loaded');
    sageDragon_extension.load_ipython_extension();
});

*/
var activ = false;
define( function () {

    var sageDragon_notebook = function () {

	if(activ == false){
	       Jupyter.notebook.kernel.execute("%display latex");
		activ = true;
	       alert("SageDragon est activé");
	}else{
		alert("SageDragon est déja activé");	
	}
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
    };
    
    var load_ipython_extension = function () {
        sageDragon_button();
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});
