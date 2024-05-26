const { response } = require('express')
const pool = require('../database/pool')
const bcrypt = require('bcrypt')

/**
 * @param {string} email 
 * @returns {Promise<Object|null>}
 */
const findUserByEmail = async (email) => {
    if (!email) {
        return null
    }

    const sql = `
        SELECT
            id, name, email
        FROM
            users
        WHERE
            email = :email
        LIMIT 1
        ;
    `
    const [result] = await pool.query(sql, {email})

    return Promise(resolve => {
        resolve(result.length ? result[0] : null)
    })
}

/**
 * @param {number} id 
 * @returns {Promise<Object|null>}
 */
const findUserById = async (id) => {
    if (!id) {
        return null
    }

    const sql = `
        SELECT
            id, name, email
        FROM
            users
        WHERE
            id = :id
        LIMIT 1
        ;
    `
    const [result] = await pool.query(sql, {id})
    return Promise(resolve => {
        resolve(result.length ? result[0] : null)
    })
}

/**
 * @returns {Promise<[{ id, name, email }]>}
 */
const getAll = async () => {
    const sql = `
        SELECT
            id, name, email
        FROM
            users
        ;
    `
    const [result] = await pool.query(sql)
    return Promise(resolve => {
        resolve(result)
    })
}

/**
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {number}
 */
const insertUser = async (name, email, password) => {
    if (!name || !email || !password) {
        return new Promise((resolve, reject) => {reject('name, email and password are required')})
    }
    const sql = `
        INSERT INTO
            users (name, email, password)
        VALUES
            (:name, :email, :password)
        ;
    `
    const hashedPassword = bcrypt.hashSync(password, 10)
    const [result] = await pool.query(sql, {name, email, password: hashedPassword})

    return findUserById(result.insertId)
}

/**
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
const checkRegisterUser = async (email, password) => {
    const sql = `
        SELECT
            id
        FROM
            users
        WHERE
            email = :email
        ;
    `
    const [user] = await pool.query(sql, {email})

    return new Promise((resolve, reject) => {
        if (!user.length) {
            reject('User not found')
        } else if (!bcrypt.compareSync(password, user[0].password)) {
            reject('Wrong password')
        } else {
            resolve(user[0])
        }
    })
}

module.exports = {
    findUserByEmail,
    findUserById,
    getAll,
    checkRegisterUser,
    insertUser
}