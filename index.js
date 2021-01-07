const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Ask = require('./model/Ask')

//db
connection.authenticate().then(() => {
    console.log("conexão feita com o banco de dados")
    }).catch((msgErro) => {
    console.log(msgErro)
})

//EJS
app.set('view engine', 'ejs')
app.use(express.static('public'))

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROTAS
app.get('/', (req, res) => {
    Ask.findAll({ raw: true, order:[
        ['id', 'DESC']
    ]}).then(asks => {
        res.render('index', {
            asks: asks
        })
    })
})
app.get('/ask', (req,res) => {
    res.render("ask")
})
app.post('/saveask', (req, res) => {
    
    var titulo = req.body.title
    var description = req.body.description
    
    Ask.create({
        title: titulo,
        description: description
    }).then(() => {
        res.redirect('/')
    })
})
app.get('/asks/:id', (req, res) => {
    const id = req.params.id

    Ask.findOne({
        where: {id: id}
    }).then(ask => {
        if(ask != undefined){
            res.render('asking')
        } else{
            res.redirect('/')
        }
    })
})

app.get('/asking', (req, res) => {
    res.render('asking')
})

//PORTA SERVIDOR
app.listen(8080, () => {
    console.log("I'm Running!")
})