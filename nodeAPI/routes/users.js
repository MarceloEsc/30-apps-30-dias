const errors = require('restify-errors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const rjwt = require('restify-jwt-community');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
    //REGISTER user
    server.post('/api/user', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { email, password } = req.body;

        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;

                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                }
                catch (err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    });

    // AUTH user
    server.post('/api/auth', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { email, password } = req.body;

        try {
            const user = await auth.authenticate(email, password);

            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '10m'
            });
            const { iat, exp } = jwt.decode(token);

            res.send({ iat, exp, token, email });

            next();
        }
        catch (err) {
            return next(new errors.UnauthorizedError(err));
        }
    });

    // UPDATE user
    server.put('/api/user/:id',
        rjwt({ secret: config.JWT_SECRET }),
        async (req, res, next) => {

            if (!req.is('application/json')) {
                return next(new errors.InvalidContentError("Expects 'application/json'"));
            }

            try {
                const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
                res.send(200);
                next();
            }
            catch (err) {
                return next(
                    new errors.ResourceNotFoundError(`User ${req.params.id} does not exist`)
                );
            }
        });

    // DELETE user
    server.del('/api/user/:id',
        rjwt({ secret: config.JWT_SECRET }),
        async (req, res, next) => {

            try {
                const user = await User.findOneAndDelete({ _id: req.params.id });
                res.send(204);
                next();
            }
            catch (err) {
                return next(
                    new errors.ResourceNotFoundError(`User ${req.params.id} does not exist`)
                );
            }
        });

}
