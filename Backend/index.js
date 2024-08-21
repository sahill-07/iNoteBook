const express = require('express');
const connectToMongo = require('./DB/ConnectDB')
const app = express();


app.use(express.json());

// Rouotes :

app.use('/api/auth' , require('./routes/auth.route.js'))
app.use('/api/notes' , require('./routes/notes.route.js'))

connectToMongo()
.then(() => {
    app.listen(8000 , () => {
        console.log(`Express App starting at localhost/3000`)
    })
})