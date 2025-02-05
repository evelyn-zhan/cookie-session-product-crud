import express from 'express'
import Product from './models/product.js'
import user_controller from './controllers/user.js'
import session from 'express-session'

const app = express()
const hostname = '127.0.0.1'
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'Ini adalah kode rahasia###',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}))

app.set('view engine', 'ejs')

app.get('/login', user_controller.login)
app.get('/logout', user_controller.logout)
app.post('/login', user_controller.auth)

app.get('/', (req, res) => {
    Product.findAll()
        .then((products) => {
            res.render('index', { products, user: req.session.user || '' })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('Internal Server Error')
        })
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/edit/:id', (req, res) => {
    Product.findOne({ where: { id: req.params.id } })
        .then((product) => {
            res.render('edit', { product })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('Internal Server Error')
        })
})

app.post('/api/product', (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price
    })
        .then((result) => {
            res.status(201).json({
                status: 201,
                error: null,
                response: result
            })
        })
        .catch((error) => {
            res.status(502).json({
                status: 502,
                error
            })
        })
})

app.put('/api/product/:id', (req, res) => {
    Product.update(
        {
            name: req.body.name,
            price: req.body.price
        },
        {
            where: { id: req.params.id }
        }
    )
        .then((result) => {
            res.status(200).json({
                status: 200,
                error: null,
                response: result
            })
        })
        .catch((error) => {
            res.status(502).json({
                status: 502,
                error
            })
        })
})

app.delete('/api/product/:id', (req, res) => {
    Product.destroy({ where: { id: req.params.id } })
        .then((result) => {
            res.status(200).json({
                status: 200,
                error: null,
                response: result
            })
        })
        .catch((error) => {
            res.status(500).json({
                status: 500,
                error
            })
        })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})