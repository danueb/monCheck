describe('App.Model.StateMachine', function() {
  beforeEach(function() {
    window.monSeedData = [
      { id: 1, name: "bulbasaur"},
      { id: 2, name: "ivysaur"},
      { id: 1, name: "venuasur"},
      { id: 2, name: "charmander"},
      { id: 1, name: "charmeleon"},
      { id: 2, name: "charizard"},
      { id: 1, name: "squirtle"},
      { id: 2, name: "wartortle"},
      { id: 1, name: "blastoise"}
    ];
    this.viewMaster = new App.Models.StateMachine();
  });

  it('can be instantiated', function(){
    expect(this.viewMaster).not.toBeNull();
  });

  describe('defaults', function(){
    it('has currentMon default to null', function(){
      expect(this.viewMaster.get('currentMon')).toBeNull();
    });
    it('has currentView default to "home"', function(){
      expect(this.viewMaster.get('currentView')).toBe('home');
    });
    describe('mons attribute', function(){
      beforeEach(function(){
        this.mons = this.viewMaster.get('mons');
      });
      it('should be a collection', function(){
        expect(this.mons.models).toBeDefined();
      });
      it('should be a collection of mons', function(){
        expect(this.mons.get(1).get('name')).toBe('bulbasaur');
      });
    });
  });

  describe('#onHome', function(){
    it('should be defined', function(){
      expect(this.viewMaster.onHome).toBeDefined();
    });
    it('should return true if currentView is home', function(){
      this.viewMaster.set({"currentView" : "home"});
      expect(this.viewMaster.onHome()).toBeTruthy();
    });
    it('should not return true if currentView is not home', function(){
      this.viewMaster.set({"currentView" : "about"});
      expect(this.viewMaster.onHome()).toBeFalsy();
    });
  });

  describe('#currentMon', function(){
    it('should be defined', function(){
      expect(this.viewMaster.currentMon).toBeDefined();
    });
    it('should return the current mon, if there is one', function(){
      this.viewMaster.set({ 'currentMon': 1 });
      expect(this.viewMaster.currentMon().get('name')).toBe('bulbasaur');
    });
    it('should return null if there is no current mon', function(){
      this.viewMaster.set({ 'currentMon': null });
      expect(this.viewMaster.currentMon()).toBeNull();
    });
  });

  describe('navigation', function(){
    describe('#goToMon', function(){
      beforeEach(function() {
        this.navigateStub = sinon.stub(App.router, 'navigate', function(){});
      });
      afterEach(function() {
        this.navigateStub.restore();
      });
      it('should be defined', function(){
        expect(this.viewMaster.goToMon).toBeDefined();
      });
      describe('when given a numerical argument', function(){
        it('should change url to match that mon, if it exists', function(){
          this.viewMaster.goToMon(1);
          expect(this.navigateStub).toHaveBeenCalledWith('/mon/bulbasaur');
        });
        it('should do nothing if the id matches no mon', function(){
          this.viewMaster.goToMon(0);
          expect(this.navigateStub).not.toHaveBeenCalled(); 
          this.viewMaster.goToMon(10);
          expect(this.navigateStub).not.toHaveBeenCalled(); 
        });
      });
      describe('when given a string argument', function(){
        it('should change url to match that mon, if it exists', function(){
          this.viewMaster.goToMon('Bulbasaur');
          expect(this.navigateStub).toHaveBeenCalledWith('/mon/bulbasaur'); 
        });
        it('should do nothing if the name matches no mon', function(){
          this.viewMaster.goToMon('Ubuntu');
          expect(this.navigateStub).not.toHaveBeenCalled(); 
        });
      });
    });
  });
});