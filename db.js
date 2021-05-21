const credentials = require("./credentials.json");
const consolePrefix = credentials.consolePrefix;
const sqlite = require("sqlite3");

let db = new sqlite.Database(".../os_lutadores_django/db.sqlite3", sqlite.OPEN_READONLY , (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`${consolePrefix} Conectado ao banco!`);
});

db.serialize(() => {
    db.each(
        `SELECT 
    fighter_id as fighter_id, 
    fighter_name as fighter_name, 
    fighter_token as fighter_token 
    from Fighters`,
        (err, row) => {
            if (err) {
                console.log(err);
            }
            console.log(row.fighter_id)
        }
    );
});

module.exports = db;
