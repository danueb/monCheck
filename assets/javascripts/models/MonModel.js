App.Models.Mon = Backbone.Model.extend({

});

App.Collections.Mons = Backbone.Collection.extend({
  model: App.Models.Mon,
  url: '/mons.json',

  findMon: function(id){
    var mon;
    if(/^-?[\d.]+(?:e-?\d+)?$/.test(id)){ // if id is a number
      if(id <= this.length && id > 0){
        return this.get(id);
      }
    } else {
      mon = this.findWhere({ 'name': id.toLowerCase() });
      if (mon){
        return mon;
      }
    }
    return null;
  }
});