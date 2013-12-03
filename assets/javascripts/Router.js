App.Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },
  
  index: function() {},
  mon: function(monName) {
    App.viewMaster.setCurrentMon(monName);
  }

});