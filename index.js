const express = require('express')
const morgan = require('morgan')
const app = express();

//Settings
app.set('appName', 'Mi primer servidor con express')
app.set('port', 5000)
app.set('view engine', 'ejs')

/* const logger = ((req, res, next) =>{
    console.log(`Route Received ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log('Reques received');
    next();
}) Este codigo ejecuta de manera nativa lo que hace morgan
 */
//Middlewares: Manejador de petición antes de que lleguen a su ruta original, a diferencia del 
// "app,all()" que solo funciona para una ruta en especifico, este funciona para TODAS las rutas
//Para que funcionen los middlewares los tienes que poner antes de las rutas


app.use(express.json())
app.use(morgan('dev')); //Todos los middlewares se ejecutan con el "app.use"



//Routes


/* app.get('/', (req, res) => {
    res.send('Hello world')
}) */

app.get('/', (req, res)=>{
    const data =  [{name: 'Jhon'}, {name: 'Joe'}, {name: 'Cameron'}, {name: 'Ryan'}]
    res.render('index.ejs', {people: data})
})

app.get('/user', (req, res) => {
    res.json({
        username: 'Camenron',
        lastname: 'Howe'
    })
})

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('POST request received')
})

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} updated`)
})

app.delete('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} deleted`)
})

app.use(express.static('public'))


app.listen(app.get('port'), () =>{
    console.log(app.get('appName'));
    console.log(`Server on port ${app.get('port')}`)
})



