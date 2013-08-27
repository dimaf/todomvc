// For an introduction to the Grid template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";
    require.config({
        paths: {
            jquery: 'Scripts/jquery-2.0.3',
            can:'Scripts/lib/can'
        }
    });

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            require(["jquery", "can", "js/models/todo.js", "js/controllers/todo.js"], function ($, can,TodoModel,TodoControll) {
                can.route(':filter');
                // Delay routing until we initialized everything
                can.route.ready(false);

                // Initialize the app
                TodoModel.findAll({}, function (todos) {
                    new TodoControll('#todoapp', {
                        todos: todos,
                        state: can.route,
                        view: 'pages/todo/todos.ejs'
                    });
                });

                // Now we can start routing
                can.route.ready(true);
            })
         
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
