 const express = require('express'),
    cors = require('cors'),
    helmet = require('helmet'),
    chalk = require('chalk'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    mongoStore = require('connect-mongo'),
    http = require('http'),
    morganMiddleware = require('./morgan'),
    winston = require('./winston');
    // redis = require('redis'),
    // RedisStore = require('connect-redis')(session);

const app = express();

// Setup Request Info Logging in Console with Morgan 
app.use(morganMiddleware.morganChalk);

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./config')((err) => {
    if (err) {
        winston.error(err);
    } else {
        // Create HTTP server.
        global.server = http.createServer(app);

        let expressPort = require('./expressPort');

        /**
         * Get port from environment and store in Express.
         */

        global.port = expressPort.normalizePort(config.PORT || '3000');

        global.server.listen(global.port, '0.0.0.0');
        // global.server.on('error', expressPort.onError);
        // global.server.on('listening', expressPort.onListening);
        var origin = '*';

        // CORS middleware
        let corsOptionsDelegate = (req, callback) => {
            let corsOptions;
            let allowedOrigins = [
                'http://localhost:3210',
                'http://localhost:4200',
            ];
            if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
                corsOptions = {
                    credentials: true,
                    origin: true
                };
            } else {
                corsOptions = {
                    origin: false
                };
            }
            callback(null, corsOptions);
        };
        app.use(cors(corsOptionsDelegate));
        app.use(helmet());
        app.use(cookieParser());

        // global.redisClient = redis.createClient({
        //     port: config.redis.port, // Your Redis Port
        //     host: config.redis.host, // Your hostanme or IP address,
        // });

        // global.redisClient.on('error', (err) => {
        //     winston.error(err);
        // });

        // global.redisClient.on('connect', function() {
        //     winston.info(chalk.bold.green('Connection build successfully with Redis Server...'));
        // });
        app.use(session({
            secret: 'SECRET KEY',
            resave: false,
            saveUninitialized: true,
            store:  mongoStore.create({
                mongoUrl: config.mongodb.host + config.mongodb.db_name, //YOUR MONGODB URL
                // ttl: 14 * 24 * 60 * 60,
                autoRemove: 'native' 
            })
         } ))

        // app.use(session({
        //     secret: config.session.secret,
        //     store: new RedisStore({
        //         host: config.redis.host,
        //         port: config.redis.port,
        //         client: global.redisClient,
        //         ttl: 14 * 24 * 60 * 60,
        //         clear_interval: 3600
        //     }),
        //     resave: true,
        //     saveUninitialized: true,
        //     clearExpired: true,
        //     checkExpirationInterval: 900000,
        //     cookie: {
        //         maxAge: 60 * 24 * 3600 * 1000,
        //     }
        // }));
        
        app.use(flash());

        var passport = require('./passport');
        app.use(passport.initialize());
        app.use(passport.session());

        global.errors = require('./errors');
        require('./routes')(app);

        app.get('/', (req, res, next) => {
            res.json({
                status: 1,
                message: 'API server is running.  60a75be05b90242c1c92f8fd',
                data: {}
            });
        });

        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        let errorHandler = require('./errorHandler');
        app.use(errorHandler.allErrorHandler);

        // const socketManager = require('./socketIo/socket_connection_handler');
        // socketManager.socketConnectInitialization(global.server);

        require('./scheduler');
    }
});

module.exports = app;