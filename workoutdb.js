var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "workoutdb.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		// Cannot open database
		console.error(err.message)
		throw err
	} else {
		console.log('Connected to the SQLite database.')
		db.run(`CREATE TABLE workout (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER, 
            date INTEGER UNIQUE, 
			temperature REAL,
			humidity REAL,
			feelsLike REAL,
			description TEXT,
			windSpeed REAL,
			topLayer TEXT,
			bottomLayer TEXT,
			extras TEXT,
			notes TEXT
		)`,
		(err) => {
			if (err) {
				// Table already created
			} else {
				// Table just created, creating some rows
				//var insert = 'INSERT INTO workout (userId, date, temperature, topLayer) VALUES (?,?,?,?)'
				//db.run(insert, [2,1584064658,5.5, "short sleeve"])
                //db.run(insert, [1,1584064825,-12, "long sleeve"])
			}
		});
	}
});

module.exports = db