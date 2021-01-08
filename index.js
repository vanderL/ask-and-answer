const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Ask = require('./model/Ask')
const Answer = require('./model/Answer')

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
           
           Answer.findAll({
               where: {askId: ask.id},
               order:[ 
                        ['id', 'DESC'] 
                    ]
           }).then(answers => {
               res.render('asking', {
                    ask: ask,
                    answers: answers
                })
           })          
        } else{
            res.redirect('/')
        }
    })
})

app.post('/saveanswer', (req, res) => {
    const body= req.body.body
    const askId = req.body.ask

    Answer.create({
        body: body,
        askId: askId
    }).then(() => {
        res.redirect('/asks/'+askId)
    })
})

//PORTA SERVIDOR
app.listen(8080, () => {
    console.log("I'm Running!")
})