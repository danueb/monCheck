App.Views.Header = Backbone.View.extend({
  tagName: 'header',
  className: 'top-nav',

  initialize: function() {
    _.bindAll(this, 'render', 'toggleHomeButton');
    this.template = Handlebars.compile( App.Templates.header );

    this.viewMaster = this.options.viewMaster;
    this.listenTo(this.viewMaster, 'change:currentView', this.toggleHomeButton());
  },

  render: function(){
    $(this.el).html( this.template({}) );
    this.toggleHomeButton();
    return this;
  },

  toggleHomeButton: function() {
    this.$('.nav-head').toggleClass('clickable', !this.viewMaster.onHome());
  },

  events: {
    "click .nav-head.clickable": "home",
    "click .nav-option.chart": "chart",
    "click .nav-option.about": "about"
  },

  home: function() {
    this.viewMaster.goToHome();
    // FIXME: why isn't this called via the listener?
    this.toggleHomeButton();
  },

  chart: function() {
    // TODO: CHART
    console.log('chart button clicked');
  },

  about: function() {
    if(this.viewMaster.onAbout()){
      this.viewMaster.goToHome();
    } else{
      this.viewMaster.goToAbout();
    }
    // FIXME: why isn't this called via the listener?
    this.toggleHomeButton();
  }

});