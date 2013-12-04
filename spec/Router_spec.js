describe("App.Router", function() {
  beforeEach(function() {
    window.monSeedData = [
      { id: 1, name: "bulbasaur"},
      { id: 2, name: "ivysaur"},
      { id: 3, name: "venuasur"},
      { id: 4, name: "charmander"},
      { id: 5, name: "charmeleon"},
      { id: 6, name: "charizard"},
      { id: 7, name: "squirtle"},
      { id: 8, name: "wartortle"},
      { id: 9, name: "blastoise"}
    ];
    this.viewMaster = new App.Models.StateMachine();
  });
  describe("mon routes", function() {
    beforeEach(function() {
      var that = this;
      this.updateHashStub = sinon.stub(Backbone.history, '_updateHash', function (loc, frag) {
        // assuming all navigation in this scope is to a mon
        App.router.mon(frag);
      });
      this.goToMonStub = sinon.stub(App.viewMaster, 'goToMon', function(id){
        that.viewMaster.goToMon(id);
      });
    });
    afterEach(function() {
      this.updateHashStub.restore();
      this.goToMonStub.restore();
      App.router.navigate('');
    });
    describe("with a mon name that exists", function() {
      it("should change the currentMon to the appropriate mon", function() {
        App.router.navigate('Bulbasaur');
        expect(this.viewMaster.currentMon().get('name')).toBe("bulbasaur");
      });
    });
    describe("with a mon name that doesn't exist", function() {
      it("should not change the currentMon", function() {
        App.router.navigate('Ubuntu');
        expect(this.viewMaster.currentMon()).toBeNull();
      });
    });
  });
});