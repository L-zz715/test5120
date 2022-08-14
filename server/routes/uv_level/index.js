// get a param app 
module.exports = app => {
    const express = require('express')
    // child route
    const router = express.Router()
    let mysq
    mysq = require('../../plugins/mysq')
    // start connect mysql
    mysq.connect()
    router.get('/monthlyUV', async (req, res) => {
       
        const sql = `select ${req.query.month} from au_uv where CITY="${req.query.city}" and STATE="${req.query.state}"`
        mysq.query(sql, (err, result) => {
            if (err) {
                console.log('err', err)
                res.send(err)
                return

            }
            res.send(result)
        })

    })

    router.get('/state', async (req, res) => {
    
        const sql = `select distinct STATE from au_uv`
        mysq.query(sql, (err, result) => {
            if (err) {
                console.log('err', err)
                res.send(err)
                return

            }

            console.log(typeof result)
            res.send(result)
        })

    })

    router.get('/city', async (req, res) => {
    
        const sql = `select CITY,STATE from au_uv`
        mysq.query(sql, (err, result) => {
            if (err) {
                console.log('err', err)
                res.send(err)
                return

            }

            console.log(typeof result)
            res.send(result)
        })

    })

    //here use this url to connect api http://localhost:3000/home/api/ttc
    app.use('/api/uvLevel', router)

}