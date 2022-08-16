// get a param app 
module.exports = app => {
    const express = require('express')
    // child route
    const router = express.Router()

    const connection = require('../../plugins/connection')

    router.get('/monthlyUV', async (req, res) => {
        // const sqlState = "Select * from csv_au_uv"

        const sqlState = `select ${req.query.month} from csv_au_uv where city_name="${req.query.city}" and state_name="${req.query.state}"`
        connection.invokeQuery(sqlState, function (rows) {

            res.send({ data: rows })
        })

    })

    router.get('/state', async (req, res) => {

        const sqlState = `select distinct state_name from csv_au_uv`
        connection.invokeQuery(sqlState, function (rows) {

            res.send({ data: rows })
        })
    })

    router.get('/city', async (req, res) => {

        const sqlState = `select city_name,state_name from csv_au_uv`
        connection.invokeQuery(sqlState, function (rows) {

            res.send({ data: rows })
        })
    })

    //here use this url to connect api http://localhost:3000/home/api/ttc
    app.use('/api/uvLevel', router)

}