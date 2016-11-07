define(
 function(Jupyter, events) {
        var load_ipython_extension = function () {
            Jupyter.toolbar.add_buttons_group([
                {
                     'id'      : 'displayLatex',
                     'label'   : 'Displays LaTeX',
                     'icon'    : 'fa-play-circle',
                     'callback': function () {
                         Jupyter.notebook.kernel.execute('%display latex')
                     }
                }
            ]);
        };
        return {
            load_ipython_extension : load_ipython_extension
        };
});
