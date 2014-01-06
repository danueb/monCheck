App.Views.Main = Backbone.View.extend({
  className: 'main',

  initialize: function(){
    _.bindAll(this, 'createMonView', 'toggleSubviews', 'render', 'update');
    this.aboutView = new App.Views.About();
    this.headerView = new App.Views.Header({
      viewMaster: this.model
    });
    this.searchView = new App.Views.Search({
      model: this.model.get('mons').getNameList(),
      viewMaster: this.model
    });
    this.createMonView();
    this.listenTo(this.model, 'change:currentView', this.toggleSubviews);
    this.listenTo(this.model, 'change:currentMon', this.update);

    // Can't really do this with backbone events, unfortunately :( 
    $('body').keyup(this.handleKey);
  },

  update: function() {
    if(this.pokemonView){
      this.pokemonView.remove();
    }    
    this.createMonView();
    if(this.pokemonView){
      $(this.el).append(this.pokemonView.render().el);
    }
  },

  render: function() {
    // $(this.el).append(this.chartView.render().el);
    $(this.el).append(this.searchView.render().el);
    if(this.pokemonView){
      $(this.el).append(this.pokemonView.render().el);
    }
    this.toggleSubviews();
    return this;
  },

  toggleSubviews: function() {
    $('#abt').toggle(this.model.onAbout());
    // this.$('.chart').toggle(this.model.onChart());
    this.$('.search').toggle(this.model.onHome());
    this.$('.mon').toggle(this.model.onHome());
  },

  createMonView: function() {
    var currentMon = this.model.currentMon();
    if(currentMon){
      this.pokemonView = new App.Views.Mon({
        model: currentMon
      });
    }
  },

  handleKey: function(e) {
    // I really wish I could do this the backbone way, 
    // but it doesn't look possible
    if ($(e.target).is('input')) { return true }
    if(App.viewMaster.onHome() && App.viewMaster.currentMon()){
      if(e.keyCode === 37){
        App.viewMaster.goToPrevMon();
      } else if(e.keyCode === 39){
        App.viewMaster.goToNextMon();
      }
    }
  }
});