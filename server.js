const express = require('express');
const app = express();
const slotsRouter = require('./router/slots-router');
const eventsRouter = require('./router/event-router');

app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');
app.use(express.json());

app.use('/slots/', slotsRouter.routes);
app.use('/events/', eventsRouter.routes);

app.use('/', (req, res) => {
    res.render('index');
})

app.listen(3000, console.log("server running"));