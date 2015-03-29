/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("F4gEdmUQFaJrx5AQXoNXOgDx7RXNb0wWnXvcbfkY", "t457sgnbXkPX5HSQNYKPAELeNM5b0RvZnj94cE3t");
    
    var Blog = Parse.Object.extend("Blog");
 
    var Blogs = Parse.Collection.extend({
        model: Blog
    });
    
    var blogs = new Blogs();
    
    var BlogsView =  Parse.View.extend({
        template: Handlebars.compile($('#blogs-tpl').html()),
        render: function(){ 
            var collection = { blog: this.collection.toJSON() };
            this.$el.html(this.template(collection));
        }
    });
 
    blogs.fetch({
        success: function(blogs) {
            var blogsView = new BlogsView({ collection: blogs });
            blogsView.render();
            $('.main-container').html(blogsView.el);
        },
        error: function(blogs, error) {
            console.log(error);
        }
    });
 
});
