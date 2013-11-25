describe("App.Router", function() {
  beforeEach(function(){
    router = new App.Router;
    try {
      Backbone.history.start({silent:true, pushState:true});
    } catch(e) {}
  });

  it("fires the index route with a blank hash", function() {
    var index = sinon.spy(router, 'index');
    var pushStateSpy = sinon.stub(window.history, 'pushState', function (data, title, url) {
        expect(url).toEqual('/');
        router.index();
    });
    router.navigate('');
    expect(pushStateSpy).toHaveBeenCalled();
    expect(index).toHaveBeenCalled();
  });
});