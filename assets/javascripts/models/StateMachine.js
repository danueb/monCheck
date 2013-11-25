App.Models.StateMachine = Backbone.Model.extend({
  
  defaults: {
    'currentView': 'home',
    'currentMon': null
  },

  initialize: function(){
    this.set({ 'mons': new App.Collections.Mons(window.monSeedData) });
  },

  onHome: function(){
    return this.get('currentView') === 'home' ? true : false;
  },

  currentMon: function(){
    if (this.get('currentMon') === null) {
      return null;
    }
    return this.get('mons').get(this.get('currentMon'));
  },

  /* navigation */

  goToMon: function(id){
    var mon;
    if(/^-?[\d.]+(?:e-?\d+)?$/.test(id)){ // if id is a number
      if(id <= this.get('mons').length && id > 0){
        this.set({ 'currentMon': id });
      }
    } else {
      mon = this.get('mons').findWhere({ 'name': id.toLowerCase() });
      if (mon){
        this.set({ 'currentMon': mon.get('id') });
      }
    }
  }
});