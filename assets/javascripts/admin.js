//= require vendor/modernizr
//= require vendor/jquery
//= require vendor/underscore
//= require vendor/backbone
//= require vendor/handlebars
//= require vendor/typeahead
//= require App
//= require AdminRouter
//= require_directory ./templates
//= require_directory ./models
//= require_directory ./views

$(document).ready(function() {
  App.viewMaster = new App.Models.StateMachine();
  App.router = new App.AdminRouter();
  Backbone.history.start();


  // for mobile
  if($(window).width() < 768){
    window.scroll(0,38);
  } 
});