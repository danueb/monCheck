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
  },

  chart: function() {
    // TODO: CHART
    console.log('chart button clicked');
  },

  about: function() {
    // TODO: ABOUT
    console.log('about button clicked');
  }

});