const spicedPg = require('spiced-pg');
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // const garbage = require('./garbage_file.json');
    db = spicedPg(`postgres:postgres:databoy@localhost:5432/dankstream`)
};

function addMessage(data) {
    return db.query(`INSERT INTO messages (sender, message) VALUES ($1, $2)`,
    [data.name, data.message]).then(result => {
        if (result.rowCount) {
            return true;
        } else {
            return false;
        }
    }).catch(err => false);
}

function getMessages() {
    return db.query(`SELECT * FROM messages ORDER BY id DESC LIMIT 20`).then(result => result.rowCount ? result.rows : false).catch(err => false);
}

module.exports.addMessage = addMessage;
module.exports.getMessages = getMessages;
