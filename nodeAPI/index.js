const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

// server.use(rjwt({ secret: config.JWT_SECRET })
//     .unless({ path: ['/auth', '/register'] }));

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
});

const db = mongoose.connection;

db.on('error', (err) => console.error(err));

db.once('open', () => {
    require('./routes/customers')(server);
    require('./routes/users')(server);
    console.log(`Server port: ${config.PORT}`);

});