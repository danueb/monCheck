App.Views.Search = Backbone.View.extend({
  className: 'search',

  initialize: function() {
    _.bindAll(this, 'render', 'enter');
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

  enter: function(){
    //this is horrible
    console.log('whoop');
    var monName = $('.searchbox').val();
    this.viewMaster.goToMon($('.searchbox').val());
  },

  events: {
    "typeahead:selected .searchbox": "selectMon"
  },

  selectMon: function() {
    this.viewMaster.goToMon($('.searchbox').val());
  }
});