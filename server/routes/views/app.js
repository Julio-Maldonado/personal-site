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

import contactData from '../../../app/data/contact';

const list = () => (
  <ul className="icons">
    {contactData.map(s => (
      <li key={s.label}>
        <a href={s.link} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={s.icon} color={s.color} />
        </a>
      </li>
    ))}
  </ul>
);

const htmlList = ReactDOMServer.renderToStaticMarkup(list);


const DEFAULT_MESSAGE = '<h3>Howdy!</h3> <br/> <br/>'
+ "Thanks for signing up for my newsletter through <a href='https://www.juliomaldonado.com/'>JulioMaldonado.com</a> :)<br/><br/>"
+ '<img src="https://scontent-sea1-1.cdninstagram.com/vp/c04ec4e6cf1f88bd6e195569af4990a9/5DEFAB3F/t51.2885-15/e35/36940224_205770806781401_4820515398602457088_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com" alt="Image of overview of Provo, Utah" height="100%" width="100%" /><br/><br/>'
+ "I'll share life experiences, lessons, big news, and more as they come.<br/><br/>"
+ 'Ciao!<br/><br/>'
+ '<i>Julio Maldonado</i><br/><br/><br/>'
+ "<center><i><small>Respond 'REMOVE ME' to this email at any time to be removed.</small></i></center>"
+ `${htmlList}`;

const DEFAULT_SUBJECT = 'Hey New Friend!';

const mailjet = require('node-mailjet').connect('c5fc907dcda19f8cefb3be106edfc67f', 'c179b4d9b4ee638401c04d18fd60a789');

const request = (email, message, subject) => (
  mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'julioharlingen@gmail.com',
          Name: 'Julio Maldonado',
        },
        To: [
          {
            Email: email,
            // Name: user.userName,
          },
        ],
        Subject: subject,
        TextPart: 'JulioMaldonado.com Newsleter Sign Up',
        HTMLPart: message,
      },
    ],
  })
);

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
      let body = '';

      req.on('data', (data) => {
        body = String(data);
      });

      req.on('end', () => {
        const allData = body.replace(/(\r\n|\n|\r)/gm, '');

        request('juliom72@tamu.edu', allData, 'New user Sign Up')
          .then(() => {
            console.log('email sent to juliom72@tamu.edu');
          })
          .catch((err) => {
            console.log(err.statusCode);
          });

        const bodyArray = body.split('\n');

        const email = bodyArray[3].replace(/(\r\n|\n|\r)/gm, '');

        request(email, DEFAULT_MESSAGE, DEFAULT_SUBJECT)
          .then((result) => {
            res.send({ success: true, result });
          })
          .catch((err) => {
            res.send({ succes: false, statusCode: err.statusCode });
          });
      });
    });

    app.get('/*', (req, res) => {
      const content = middleware.fileSystem.readFileSync(path.join(__dirname, '../../../dist/index.html'));
      res.set('Content-Type', 'text/html');
      res.send(content);
    });
  } else {
    app.post('/api/send_email', (req, res) => {
      let body = '';

      req.on('data', (data) => {
        body = String(data);
      });

      req.on('end', () => {
        const allData = body.replace(/(\r\n|\n|\r)/gm, '');

        request('juliom72@tamu.edu', allData, 'New user Sign Up')
          .then(() => {
            console.log('email sent to juliom72@tamu.edu');
          })
          .catch((err) => {
            console.log(err.statusCode);
          });

        const bodyArray = body.split('\n');

        const email = bodyArray[3].replace(/(\r\n|\n|\r)/gm, '');

        request(email, DEFAULT_MESSAGE, DEFAULT_SUBJECT)
          .then((result) => {
            res.send({ success: true, result });
          })
          .catch((err) => {
            res.send({ succes: false, statusCode: err.statusCode });
          });
      });
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
