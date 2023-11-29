const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
        secret: 'Super secret secret',
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
                db: sequelize,
        }),
    };

    app.use(session(sess));

    //logout timer middleware
    app.use((req, res, next) => {
        const inactivityTimeout = 10 * 60 * 1000;
        if (req.session.loggedIn && req.session.lastActivity && Date.now() - req.session.lastActivity > inactivityTimeout) {
          req.session.destroy(() => {
            res.redirect('/login');
          });
        } else {
          req.session.lastActivity = Date.now();
          next();
        }
      });

    const hbs = exphbs.create({ helpers });

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(routes);

    sequelize.sync({ force: false }).then(() => {
        app.listen(PORT, () => console.log('Now listening on port ' + PORT + '!'));
    });