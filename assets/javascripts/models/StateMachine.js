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
    var mon = this.get('mons').findMon(id);
    if(mon){
      App.router.navigate('/mon/' + mon.get('name'));
      this.set({ 'currentMon': this.get('mons').findMon(id).get('id') });
    }
  }
});