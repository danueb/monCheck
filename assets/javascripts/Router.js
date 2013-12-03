App.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "mon/:monName": "mon"
  },

  initialize: function() {
    this.mainView = new App.Views.Main({
      model: App.viewMaster
    });
  },
  
  index: function() {
    var $motherDiv = $('#mother');

    if (!$(".top-nav")[0]){
      $motherDiv.before(this.mainView.headerView.render().el);
    }

    $motherDiv.empty();
    $motherDiv.append(this.mainView.render().el);    
  },
  mon: function(monName) {
    this.index();
    App.viewMaster.goToMon(monName);
  }

});