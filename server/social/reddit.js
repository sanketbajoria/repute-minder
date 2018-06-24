const snoowrap = require('snoowrap');
const r = new snoowrap({
    userAgent: 'Node 7',
    clientId: 'Bao3pWPPaeiJUg',
    clientSecret: 'q_vV_w49ndoe7j0AymJylopE3pM',
    refreshToken: '45135371-XvUXohdfYbz4rjC1JA_d57VFu8Y'
});
  

module.exports = {
    search: function(arr){
        return r.search({
            query: arr.join(" OR "),
            syntax: 'lucene',
            sort: 'new'
        })
    }
}