App.Views.Mon = Backbone.View.extend({
  className: 'mon',
  tagName: 'section',

  initialize: function() {
    _.bindAll(this, 'render');
    this.template = Handlebars.compile( App.Templates.mon );
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});