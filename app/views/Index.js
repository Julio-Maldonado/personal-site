/* eslint-disable no-useless-escape */
/* eslint-disable react/button-has-type */
import React from 'react';
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Cell from '../components/Home/Cell';
import Main from '../layouts/Main';
import data from '../data/media';

import socialData from '../data/contact';

const defaultEmailInputStyles = {
  padding: '10px',
  fontSize: '1em',
  alignItems: 'center',
  marginBottom: '12px',
  width: 350,
};

const sendEmail = async (email) => {
  alert(email);
  return (fetch('/api/send_email', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: { email },
  }).then(response => response.json()));
};

class Index extends React.Component {
  state = {
    email: '',
    emailInputStyles: defaultEmailInputStyles,
    successModal: false,
    failModal: false,
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value,
      emailInputStyles: defaultEmailInputStyles,
    });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  updateStyles = () => {
    this.setState((prevState) => {
      const emailInputStyles = Object.assign({}, prevState.emailInputStyles);
      emailInputStyles.borderColor = 'red';
      return { emailInputStyles };
    });
  }

  onSuccessModalOpen = () => {
    this.setState({ successModal: true });
  }

  onSuccessModalClose = () => {
    this.setState({ successModal: false });
  }

  onFailModalOpen = () => {
    this.setState({ failModal: true });
  };

  onFailModalClose = () => {
    this.setState({ failModal: false });
  };

  render() {
    return (
      <Main>
        <article className="post" id="index">
          <header>
            <div className="title">
              <h2>Howdy!</h2>
              {/* <h2><Link to="/">Thanks for Visiting</Link></h2> */}
              {/* <p>A beautiful, responsive, react app written with modern Javascript.</p> */}
            </div>
          </header>
          <p>
            {/* Welcome to my personal website.
            <br />
            <br />
            You can find out more{' '}
            <Link to="/about">about me</Link>,
            {' '}check out my{' '}
            <Link to="/resume">resume</Link>,
            {' '}some{' '}
            <Link to="/projects">projects</Link>
            {' '}I&apos;ve worked on,{' '}
            or <Link to="/contact">contact me</Link>.
            <br />
            <br /> */}
            Here are some important things I&apos;ve been a part of over the years.
          </p>
          {data.map(project => (
            <Cell
              data={project}
              key={project.title}
            />
          ))}
          <header>
            <div className="title">
              <h1 style={{ position: 'relative' }}>Sign up for my newsletter to keep in touch</h1>
              <input
                placeholder="example@domain.com"
                onChange={this.updateEmail}
                style={this.state.emailInputStyles}
              />
              <br />
              <button
                onClick={() => {
                  const { email } = this.state;
                  if (this.validateEmail(email)) {
                    alert(email);
                    sendEmail(email).then(({ success }) => {
                      if (success) {
                        this.onSuccessModalOpen();
                      }
                    });
                  } else {
                    this.onFailModalOpen();
                    this.updateStyles();
                  }
                }}
              >
                Sign me up!
              </button>
            </div>
          </header>
          {/* <p> Source available <a href="https://github.com/mldangelo/personal-site">here</a>.</p> */}
        </article>
        <Modal open={this.state.successModal} onClose={this.onSuccessModalClose} center>
          <br />
          <br />
          <h2>Thanks for signing up, friend</h2>
          <h1>Let&apos;s connect on social media :)</h1>
          <br />
          <br />
          <br />
          <ul
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 'auto',
              bottom: '10%',
            }}
            className="icons"
          >
            {socialData.map(s => (
              <li key={s.label}>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={s.icon} color={s.color} />
                </a>
              </li>
            ))}
          </ul>
        </Modal>
        <Modal open={this.state.failModal} onClose={this.onFailModalClose} center>
          <br />
          <br />
          <h2>Use a valid email address :)</h2>
          <br />
          <br />
          <br />
          <ul
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 'auto',
              bottom: '10%',
            }}
            className="icons"
          >
            {socialData.map(s => (
              <li key={s.label}>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={s.icon} color={s.color} />
                </a>
              </li>
            ))}
          </ul>
        </Modal>
      </Main>
    );
  }
}

export default Index;
