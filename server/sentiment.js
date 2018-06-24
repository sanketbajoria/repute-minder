var Sentiment = require('sentiment');
var sentiment = new Sentiment();

module.exports = {
  analyze: function(s) {
    return sentiment.analyze(s);
  }
}