const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = 8001

const db = require('./db/connection')

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const noteRoutes = require('./routes/notes')

app.get('/', async function (req, res) {
        const notes = await db.getDb().db().collection('notes').find({}).toArray()
        res.render( 'home', {notes} )
})

/*app.get('/', (req, res) => {
    (async () => {
        const notes = await db.getDb().db().collection('notes').find({}).toArray()
        res.render( 'home', {notes} )
    }) ()
    
})*/

app.use('/notes', noteRoutes)

db.initDb((err, db) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Aplicação rodando na porta ${port}`)
        })
    }
})