describe('App.Model.StateMachine', function() {
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
    beforeEach(function() {
      this.navigateStub = sinon.stub(App.router, 'navigate', function(){});
    });
    afterEach(function() {
      this.navigateStub.restore();
    });

    describe('#goToMon', function(){
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

    describe('#goToNextMon', function(){

      describe('when there is a mon after the current mon', function(){
        it('should change the current mon to that one', function(){
          this.viewMaster.goToMon(1);
          this.viewMaster.goToNextMon();
          expect(this.viewMaster.currentMon().get('id')).toBe(2);
        });
      });

      describe('when there is not a mon after the current mon', function(){
        it('should change the current mon to the first one', function(){
          this.viewMaster.set({ 'currentMon': 9 });
          this.viewMaster.goToNextMon();
          expect(this.viewMaster.currentMon().get('id')).toBe(1);
        });
      });

      describe('when there is no current mon', function(){
        it('should do nothing', function(){
          this.viewMaster.set({ 'currentMon': null });
          this.viewMaster.goToNextMon();
          expect(this.viewMaster.currentMon()).toBeNull();
        });
      });
    });

    describe('#goToPrevMon', function(){

      describe('when there is a mon before the current mon', function(){
        it('should change the current mon to that one', function(){
          this.viewMaster.goToMon(2);
          this.viewMaster.goToPrevMon();
          expect(this.viewMaster.currentMon().get('id')).toBe(1);
        });
      });

      describe('when there is not a mon after the current mon', function(){
        it('should change the current mon to the last one', function(){
          this.viewMaster.set({ 'currentMon': 1 });
          this.viewMaster.goToPrevMon();
          expect(this.viewMaster.currentMon().get('id')).toBe(9);
        });
      });

      describe('when there is no current mon', function(){
        it('should do nothing', function(){
          this.viewMaster.set({ 'currentMon': null });
          this.viewMaster.goToPrevMon();
          expect(this.viewMaster.currentMon()).toBeNull();
        });
      });
    });
  });
});