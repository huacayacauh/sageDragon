'use-mathjax':{
            help: "Use latex display",
            handler : function (env, event) {
                env.notebook.save_checkpoint();
                if(event){
                    event.preventDefault();
                }
                return false;
            }
        },
