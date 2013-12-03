Handlebars.registerHelper('capitalize', function(input){
  return input.charAt(0).toUpperCase() + input.slice(1);
});