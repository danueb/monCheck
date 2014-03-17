App.AdminRouter = Backbone.Router.extend({
  routes: {
    "": "index"
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
  }

});