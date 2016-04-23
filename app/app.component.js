(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      template: '<h1>PLD Front bitches</h1>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));