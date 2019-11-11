/* eslint-disable react/jsx-indent */
/* eslint-disable no-useless-escape */
/* eslint-disable react/button-has-type */
import React from 'react';
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'react-loader-spinner';

import Cell from '../components/Home/Cell';
import Main from '../layouts/Main';
import data from '../data/media';

import socialData from '../data/contact';

const inputPalette = [
  '#f4fef4',
  '#eafeea',
  '#e0fde0',
  '#d5fdd5',
  '#cbfdcb',
  '#c1fcc1',
  '#b6fcb6',
  '#acfbac',
  '#a2fba2',
  '#98fb98',
  '#88e188',
  '#79c879',
  '#6aaf6a',
  '#5b965b',
  '#4c7d4c',
  '#3c643c',
  '#2d4b2d',
  '#1e321e',
  '#0f190f',
  '#000000',
  '#0f190f',
  '#1e321e',
  '#2d4b2d',
  '#3c643c',
  '#4c7d4c',
  '#5b965b',
  '#6aaf6a',
  '#79c879',
  '#88e188',
  '#98fb98',
  '#a2fba2',
  '#acfbac',
  '#b6fcb6',
  '#c1fcc1',
  '#cbfdcb',
  '#d5fdd5',
  '#e0fde0',
  '#eafeea',
  '#f4fef4',
  '#ffffff',
];

let signedUpUsers = [
  'julioharlingen@gmail.com',
  'julio.maldonado.guzman@gmail.com',
  'juliom@qualtrics.com',
  'juliom72@tamu.edu',
  'harlingenjulio@gmail.com',
  'mannymaldonado10@gmail.com',
  'alexandrayanez1998@gmail.com',
  'klarissa.espino@gmail.com',
  'idaniacrespo@hotmail.com',
  'delaney.gill3@yahoo.com',
  'paolajeje5@gmail.com',
  'avillarreal218@outlook.com',
  'mitch.nigro@gmail.com',
  'camophlagek@gmail.com',
];

const defaultEmailInputStyles = {
  padding: '10px',
  fontSize: '1em',
  alignItems: 'center',
  marginBottom: '12px',
  width: 350,
  borderColor: 'white',
};

const sendEmail = async (email) => {
  try {
    // console.log('bout to make api request');
    const resp = await fetch('https://blooming-beyond-72124.herokuapp.com/api/send_email', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return resp.json();
  } catch (e) {
    console.error(e);
    // console.log(e);
    return { success: false };
  }
}

class Index extends React.Component {
  state = {
    email: '',
    emailInputStyles: defaultEmailInputStyles,
    successModal: false,
    failModal: false,
    invalidEmailModal: false,
    loading: false,
  }

  componentDidMount() {
    this.counter = 0;
    this.interval = setInterval(this.updateAttractiveInput, 250);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateAttractiveInput = () => {
    this.setState((prevState) => {
      if (prevState.email !== '' || prevState.failModal === true) {
        return { emailInputStyles: prevState.emailInputStyles, shake: false };
      }
      const emailInputStyles = Object.assign({}, prevState.emailInputStyles);
      emailInputStyles.borderColor = inputPalette[this.counter];
      return { emailInputStyles, shake: this.counter % 2 === 1 };
    });
    this.counter = (this.counter + 1) % inputPalette.length;
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

  onInvalidEmailModalOpen = () => {
    this.setState({ invalidEmailModal: true });
  };

  onInvalidEmailModalClose = () => {
    this.setState({ invalidEmailModal: false });
  };

  onFailModalOpen = () => {
    this.setState({ failModal: true });
  }

  onFailModalClose = () => {
    this.setState({ failModal: false });
  }

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
              <h1 style={{ position: 'relative' }}>
                Sign up for my newsletter to stay updated
                {!signedUpUsers.includes(this.state.email) ? ` (Be the ${signedUpUsers.length + 1}th sign up!)` : ' (Thanks for signing up friend!)'}
              </h1>
              <input
                placeholder="example@domain.com"
                onChange={this.updateEmail}
                style={this.state.emailInputStyles}
              />
              <br />
              <button
                onClick={() => {
                  this.setState({ loading: true });
                  let { email } = this.state;
                  email = email.toLowerCase();
                  if (signedUpUsers.includes(email)) {
                    this.alreadySignedUpModalOpen();
                    this.setState({ loading: false });
                  } else if (this.validateEmail(email)) {
                    sendEmail(email).then(({ success }) => {
                      // console.log({ success })
                      if (success) {
                        this.setState({ loading: false });
                        this.onSuccessModalOpen();
                        signedUpUsers.push(this.state.emeail);
                      } else {
                        this.setState({ loading: false });
                        this.onFailModalOpen();
                      }
                    });
                  } else {
                    this.setState({ loading: false });
                    this.onInvalidEmailModalOpen();
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
          <center><h2>Thanks for signing up, friend</h2></center>
          <center><h1>Let&apos;s make some change</h1></center>
          <br />
          <center><h1>Connect on social media :)</h1></center>
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
          <center><h2>Something went wrong, friend.</h2></center>
          <center><p>It&apos;s not your fault, it&apos;s mine.</p></center>
          <br />
          <center><b>Connect on social media for now</b></center>
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
        <Modal open={this.state.invalidEmailModal} onClose={this.onInvalidEmailModalClose} center>
          <br />
          <br />
          <center><h2>Can&apos;t trick me :)</h2></center>
          <center><h1>Try a valid email address</h1></center>
          <br />
          <center><b>Connect on social media</b></center>
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
        <Modal open={this.state.alreadySignedUpModal} onClose={this.alreadySignedUpModalClose} center>
          <br />
          <br />
          <center><h2>You've already signed up friend :)</h2></center>
          <br />
          <center><b>Connect on social media</b></center>
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
        {this.state.loading
          ? <div>
              <div style={{
                position: 'fixed',
                left: '0vw',
                top: '0vh',
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                backgroundColor: '#FFFFFF',
                opacity: 0.5,
              }}
              />
              <div style={{
                position: 'fixed',
                translate: "translate('-50%', '-50%')",
                left: '45vw',
                top: '15vh',
                zIndex: 9999,
              }}
              >
                <Loader
                  type="ThreeDots"
                  color="black"
                  height="10vh"
                  width="10vw"
                />
              </div>
            </div>
          : null
        }
      </Main>
    );
  }
}

export default Index;

