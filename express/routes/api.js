const router = require('express').Router()
const pool = require('../database/pool')

router.get('/', async (req, res, next) => {
    const sql = `
        SELECT id, name, email FROM users;
    `
    const [result] = await pool.query(sql);
    res.send({
        result: result[0]
    })
})

module.exports = router