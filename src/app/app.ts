import express from 'express'
// import routes from '../../prisma/routes'
// import errorMiddleware from "../../prisma/error.middleware";

const app = express()

app.use(express.json())
// app.use('/api', routes)

// app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
