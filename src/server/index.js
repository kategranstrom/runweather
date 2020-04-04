// Create express app
var express = require("express")
var app = express()
var workoutdb = require("./workoutdb.js")
	
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/workouts", (req, res, next) => {
    var sql = "select * from workout"
    var params = []
    workoutdb.all(sql, params, (err, rows) => {
		res.header('Access-Control-Allow-Origin', '*');
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/workout/:userId", (req, res, next) => {
      var sql = "select * from workout where userId = ?"
	    var params = [req.params.userId]
	    workoutdb.all(sql, params, (err, rows) => {
			res.header('Access-Control-Allow-Origin', '*');
	        if (err) {
	          res.status(400).json({"error":err.message});
	          return;
	        }
	        res.json({
	            "message":"success",
	            "data":rows
	        })
	      });
});

app.post("/api/workout/", (req, res, next) => {
    var errors=[]
    if (!req.body.userId){
        errors.push("No userId specified");
    }
    if (!req.body.date){
        errors.push("No date specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        userId: req.body.userId,
        date: req.body.date,
        temperature : req.body.temperature,
		topLayer: req.body.topLayer
    }
    var sql ='INSERT INTO workout (userId, date, temperature, topLayer) VALUES (?,?,?,?)'
    var params =[data.userId, data.date, data.temperature, data.topLayer]
    workoutdb.run(sql, params, function (err, result) {
        res.header('Access-Control-Allow-Origin', '*');
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

//patch hack, actual app.patch wasn't working
app.post("/api/updateworkout/:id", (req, res, next) => {
    var data = {
        userId: req.body.userId,
        date: req.body.date,
        temperature : req.body.temperature,
		topLayer: req.body.topLayer
    }
    workoutdb.run(
        `UPDATE workout set 
           userId = COALESCE(?,userId), 
           date = COALESCE(?,date), 
           temperature = COALESCE(?,temperature),
		   topLayer = COALESCE(?,topLayer)
           WHERE id = ?`,
        [data.userId, data.date, data.temperature, data.topLayer, req.params.id],
        function (err, result) {
			res.header('Access-Control-Allow-Origin', '*');
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

//delete hack, actual app.delete wasn't working
app.get("/api/workout/delete/:id", (req, res, next) => {
    workoutdb.run(
        'DELETE FROM workout WHERE id = ?',
        [req.params.id],
        function (err, result) {
			res.header('Access-Control-Allow-Origin', '*');
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});