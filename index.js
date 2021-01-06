const express = require('express');
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/perguntar', (req,res) => {
    res.render("perguntar")
})
app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo
    var description = req.body.description
    res.send("Formulario recebido com sucesso!!!!!!!!!" + titulo + " - " + description)
})

app.listen(8080, ()=> {
    console.log("I'm Running!")
})