var friends = require('../data/friends.js').friends;
var questions = require('../public/questions.js').questions;

module.exports = function(app) {
    app.get("/api/friends", function(req,res) {
        return res.json(friends);
    });

    app.post("/api/friends", function(req,res) {
        var user = req.body;
        var totalDiff = [];

        for(var i=0; i<friends.length; i++) {
            var diffs = [];
            for(var j=0; j<10; j++) {
                diffs.push(Math.abs(friends[i].scores[j] - user.scores[j]));
            }
            totalDiff.push(diffs.reduce(function(total, num) {
                return Math.abs(total+num);
            }));
        }

        var lowestDiffIndex = totalDiff.indexOf(Math.min.apply(null, totalDiff));
        var bestFriend = friends[lowestDiffIndex];
        return res.json(bestFriend);
    });

    app.get("/api/questions", function(req,res) {
        return res.json(questions);
    });
};
