App.Models.Mon = Backbone.Model.extend({

});

App.Collections.Mons = Backbone.Collection.extend({
  model: App.Models.Mon,
  url: '/mons.json'
});