var friends = require("../data/friends");
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log("Route HIT");
        var newfriend = req.body;
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        // newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();
        var bestMatch = { difference: 21 };
        for (var i = 0; i < friends.length; i++) {
            difference = 0;
            for (var j = 0; j < friends[i].answers; j++) {
               difference += Math.abs(friends[i].answers[j] - newfriend.answers[j]);
            }
            if(difference < bestMatch.difference){
                bestMatch.difference = difference;
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
            }
        }



        console.log(newfriend);

        friends.push(newfriend);

        res.json(bestMatch);


    })
};
