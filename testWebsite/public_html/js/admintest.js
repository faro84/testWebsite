/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("F4gEdmUQFaJrx5AQXoNXOgDx7RXNb0wWnXvcbfkY", "t457sgnbXkPX5HSQNYKPAELeNM5b0RvZnj94cE3t");
    
    var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        events: {
            'submit .form-signin': 'login'
        },
        login: function(e) {

            // Prevent Default Submit Event
            e.preventDefault();

            // Get data from the form and put them into variables
            var data = $(e.target).serializeArray(),
                username = data[0].value,
                password = data[1].value;

            // Call Parse Login function with those variables
            Parse.User.logIn(username, password, {
                // If the username and password matches
                success: function(user) {
                    var welcomeView = new WelcomeView({ model: user });
                    welcomeView.render();
                    $('.main-container').html(welcomeView.el);
                },
                // If there is an error
                error: function(user, error) {
                    console.log(error);
                }
            });
        },
        render: function(){
            this.$el.html(this.template());
        }
    });
    var WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        }
    });
    
    var currentUser = Parse.User.current();
    if (currentUser) {
        var welcomeView = new WelcomeView({ model: currentUser });
        welcomeView.render();
        $('.main-container').html(welcomeView.el);
    } else {
        var loginView = new LoginView();
        loginView.render();
        $('.main-container').html(loginView.el);
    }
 
});
