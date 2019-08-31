import 'dotenv/config';

import React from 'react';
import fs from 'fs';
import path from 'path';

import express from 'express';

import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../../webpack/webpack.config';

import data from '../../../app/data/contact';

let bodyParser = require('body-parser');

const list = () => (
  <ul className="icons">
    {data.map(s => (
      <li key={s.label}>
        <a href={s.link} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={s.icon} color={s.color} />
        </a>
      </li>
    ))}
  </ul>
);

const htmlList = ReactDOMServer.renderToStaticMarkup(list);

// import sendOne from './mailer';

const env = process.env.NODE_ENV || 'development';

const routes = (app) => {
  if (env === 'development') { // eslint-disable-line eqeqeq
    const compiler = webpack(config);

    compiler.plugin('done', () => {
      console.info('Webpack finished compiling.');
    });

    const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.post('/api/send_email', (req, res) => {
      // console.clear();
      // console.log(req);
      // eslint-disable-next-line global-require
      const mailjet = require('node-mailjet').connect('c5fc907dcda19f8cefb3be106edfc67f', 'c179b4d9b4ee638401c04d18fd60a789');
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'julioharlingen@gmail.com',
              Name: 'Julio Maldonado',
            },
            To: [
              {
                Email: req.body.email,
                // Name: user.userName,
              },
            ],
            Subject: 'Hey New Friend!',
            TextPart: 'JulioMaldonado.com Newsleter Sign Up',
            HTMLPart: `${"<h3>Howdy - thanks for signing up for my newsletter at <a href='https://www.juliomaldonado.com/'>JulioMaldonado.com</a> :)</h3><br />"
            + "I'll share advice, life experiences, lessons, and more as they come!<br/><br/>"
            + 'Ciao! <br /> <br /> <i>Julio Maldonado</i><br /><br /><br />'
            + "<center><i><small>Respond 'REMOVE ME' to this email at any time to be removed.</small></i></center>"}${htmlList}`,
            // CustomID: 'AppGettingStartedTest',
          },
        ],
      });

      request
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.log(err.statusCode);
        });

      res.send({ success: true });
    });

    app.get('/*', (req, res) => {
      const content = middleware.fileSystem.readFileSync(path.join(__dirname, '../../../dist/index.html'));
      res.set('Content-Type', 'text/html');
      res.send(content);
    });
  } else {
    app.post('/api/send_email', (req, res) => {
      // eslint-disable-next-line global-require
      const mailjet = require('node-mailjet').connect('c5fc907dcda19f8cefb3be106edfc67f', 'c179b4d9b4ee638401c04d18fd60a789');
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'julioharlingen@gmail.com',
              Name: 'Julio Maldonado',
            },
            To: [
              {
                Email: req.body.email,
                // Name: user.userName,
              },
            ],
            Subject: 'Hey New Friend!',
            TextPart: 'JulioMaldonado.com Newsleter Sign Up',
            HTMLPart: "<h3>Howdy - thanks for signing up for my newsletter at <a href='https://www.juliomaldonado.com/'>JulioMaldonado.com</a> :)</h3><br />"
            + "I'll share advice, life experiences, lessons, and more as they come!<br/><br/>"
            + 'Ciao! <br /> <br /> <i>Julio Maldonado</i><br /><br /><br />'
            + "<center><i><small>Respond 'REMOVE ME' to this email at any time to be removed.</small></i></center>",
            // CustomID: 'AppGettingStartedTest',
          },
        ],
      });

      request
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.log(err.statusCode);
        });

      res.send({ success: true });
    });

    app.use('/dist', express.static(path.join(__dirname, '../../../dist')));
    const content = fs.readFileSync(path.join(__dirname, '../../../dist/index.html'), 'utf8');

    app.get('/*', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.send(content);
    });
  }
};

export default routes;
