App.Models.Mon = Backbone.Model.extend({
  initialize: function(){
    var x = 0 - (Math.floor(this.get('genPos') / 
      App.Constants.SpriteKey[this.get('gen')]) * App.Constants.SpriteOffset);
    var y = 0 - (this.get('genPos') % 
      App.Constants.SpriteKey[this.get('gen')] * App.Constants.SpriteOffset);
    this.set({spriteX: x});
    this.set({spriteY: y});
  }  
});

App.Collections.Mons = Backbone.Collection.extend({
  model: App.Models.Mon,
  url: '/mons.json',

  findMon: function(id){
    var mon;
    if(!id){
      return null;
    } else if(/^-?[\d.]+(?:e-?\d+)?$/.test(id)){ // if id is a number
      if(id <= this.length && id > 0){
        return this.get(id);
      }
    } else if(id.toLowerCase) {
      mon = this.findWhere({ 'name': id.toLowerCase() });
      if (mon){
        return mon;
      }
    }
    return null;
  },

  getNameList: function(){
    return _.pluck(this.toJSON(), 'name');
  }
});