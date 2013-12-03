//= require vendor/modernizr
//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require vendor/handlebars
//= require vendor/typeahead
//= require App
//= require Router
//= require_directory ./templates
//= require_directory ./models
//= require_directory ./views

App.viewMaster = new App.Models.StateMachine();
App.router = new App.Router();
Backbone.history.start();


// for mobile
if($(window).width() < 768){
  window.scroll(0,38);
} 