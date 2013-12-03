App.Views.Search = Backbone.View.extend({
  className: 'search',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile( App.Templates.search );
    this.viewMaster = this.options.viewMaster;
  },

  render: function() {
    $(this.el).html( this.template({}) );
    this.$('.searchbox').typeahead([{
      name: 'pokemon',
      local: this.model
    }]);
    return this;
  },

  events: {
    "typeahead:selected .searchbox": "selectMon"
  },

  selectMon: function() {
    this.viewMaster.goToMon($('.searchbox').val());
  }
});