/* possibly overtesting here, I'm in the process of groking jasmine */

describe('App.Models.Mon', function() {
  beforeEach(function() {
    this.mon = new App.Models.Mon();
  });

  it('can be instantiated', function() {
    expect(this.mon).not.toBeNull();
  });
});

describe('App.Collections.Mons', function() {
  beforeEach(function(){
    this.mons = new App.Collections.Mons();
  });

  it('can be instantiated', function() {
    expect(this.mons).not.toBeNull();
  });

  describe('#fetch', function() {
    beforeEach(function() {
      this.server = sinon.fakeServer.create();
    });

    afterEach(function() {
      this.server.restore();
    });

    describe('request', function() {
      beforeEach(function() {
        this.mons.fetch();
        this.request = this.server.requests[0];
      });

      itShouldBeGET();
      itShouldBeAsync();
      itShouldHaveUrl('/mons.json');
    });

    describe('on success', function() {
      var responseFixture = [
        { id: 1, name: "bulbasaur", type1: "grass", type2: "poison" },
        { id: 2, name: "ivysaur", type1: "grass", type2: "poison" }
      ];

      beforeEach(function() {
        this.server.respondWith('GET', '/mons.json', [
          200,
          { "Content-Type": "application/json"},
          JSON.stringify(responseFixture)
        ]);
        this.mons.fetch();
        this.server.respond();
      });

      describe('loaded mon collection', function() {
        it('loads all mons', function() {
          expect(this.mons.models.length).toEqual(2);
        });
        it('parses mon data from the response', function() {
          expect(this.mons.get(1).get('name')).toEqual('bulbasaur');
          expect(this.mons.get(2).get('type2')).toEqual('poison');
        })
      });
    });
  });
});