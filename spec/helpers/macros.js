
/* request test macros (for use with sinon's fake server requests) */

window.itShouldBePOST = function() {
  it('should be a POST request', function() {
    expect(this.request.method).toMatch('POST');
  });
};
window.itShouldBeGET = function() {
  it('should be a GET request', function() {
    expect(this.request.method).toMatch('GET');
  });
};
window.itShouldBeAsync = function() {
  it('should be asynchronous', function() {
    expect(this.request.async).toBeTruthy();
  });
};
window.itShouldHaveUrl = function(url) {
  it('should have the url ' + url, function() {
    expect(this.request.url).toEqual(url);
  });
};