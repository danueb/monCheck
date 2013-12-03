App.Views.Main = Backbone.View.extend({
  className: 'main',

  initialize: function(){
    _.bindAll(this, 'createMonView', 'toggleSubviews', 'render', 'update');
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
    // $(this.el).append(this.aboutView.render().el);
    // $(this.el).append(this.chartView.render().el);
    $(this.el).append(this.searchView.render().el);
    if(this.pokemonView){
      $(this.el).append(this.pokemonView.render().el);
    }
    this.toggleSubviews();
    return this;
  },

  toggleSubviews: function() {
    // this.$('.about').toggle(this.model.onAbout());
    // this.$('.chart').toggle(this.model.onChart());
    this.$('.search').toggle(this.model.onHome());
    // this.$('.pokemon').toggle(this.model.onHome());
  },

  createMonView: function() {
    var currentMon = this.model.currentMon();
    if(currentMon){
      this.pokemonView = new App.Views.Mon({
        model: currentMon
      });
    }
  }
});