/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Loader from 'react-loader-spinner';
// import { Shake, ShakeLittle } from 'reshake';
// import { Motion, spring } from 'react-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import signedUpUsers from '../../data/signedUpUsers';
import socialData from '../../data/contact';
// import { noAuto } from '@fortawesome/fontawesome-svg-core';

const inputPalette = [
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
];

const defaultEmailInputStyles = {
  padding: '10px',
  fontSize: '1em',
  alignItems: 'center',
  marginBottom: '12px',
  width: 350,
};

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

const sendEmail = async (email) => {
  try {
    console.log('bout to make api request');
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
    console.log(e);
    return { success: false };
  }
};

class Nav extends React.Component {
  state = {
    email: '',
    emailInputStyles: defaultEmailInputStyles,
    successModal: false,
    invalidEmailModal: false,
    failModal: false,
    alreadySignedUpModal: false,
    loading: false,
    // shake: true,
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

  alreadySignedUpModalOpen = () => {
    this.setState({ alreadySignedUpModal: true });
  }

  alreadySignedUpModalClose = () => {
    this.setState({ alreadySignedUpModal: false });
  }

  render() {
    console.log(signedUpUsers);
    return (
      <div>
        <section id="sidebar">
          <section id="intro">
            <Link to="/" className="logo">
              <img src={`${BASE_PATH}/images/me_icon.jpg`} alt="" />
            </Link>
            <header>
              <h2>Julio Maldonado</h2>
              <p><a href="mailto:julio.maldonado.guzman@gmail.com">julio.maldonado.guzman@gmail.com</a></p>
            </header>
          </section>

          <section className="blurb">
            {/* <div className="title"> */}
            <h2 style={{ position: 'relative' }}>
              Sign up for my newsletter to keep in touch
              {!signedUpUsers.includes(this.state.email) ? ` (Be the ${signedUpUsers.length + 1}th sign up!)` : ' (Thanks for signing up friend!)'}
            </h2>
            {/* <Shake
              h={100}
              dur={1000}
              int={50}
              max={100}
              fixed
              fixedStop
              freez={false}
              active={this.state.shake}
            >
              <input
                placeholder="example@domain.com"
                onChange={this.updateEmail}
                style={this.state.emailInputStyles}
              />
            </Shake> */}
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
                    // console.log({ success });
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
            {/* </div> */}
          </section>
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

          <section className="blurb">
            <h2>About</h2>
            <p>Hey, I&apos;m Julio. I like helping people.
                  I am a <a href="https://www.ilrc.org/daca" target="_blank" rel="noopener noreferrer">DACA</a> recipient, <a href="https://tamu.edu/" target="_blank" rel="noopener noreferrer">Texas A&amp;M University</a> alumna, and
                  software engineer at <a href="http://qualtrics.com" target="_blank" rel="noopener noreferrer">Qualtrics</a>. A few things I&#39;m proud of include making it possible for&nbsp;
              <a href="https://www.statesman.com/opinion/20190708/commentary-inland-border-patrol-checkpoints-shouldnt-hurt-those-who-live-here?fbclid=IwAR3e0ZCDroG-70UK0fQwzONK2rOb7-epPzj5mvzbtw53fjKgVsFftKGjkUM" target="_blank" rel="noopener noreferrer">my parents see me graduate</a>,&nbsp;
              <a href="https://oaktrust.library.tamu.edu/handle/1969.1/175413" target="_blank" rel="noopener noreferrer">my research</a> with <a href="http://faculty.cse.tamu.edu/davis/welcome.html" target="_blank" rel="noopener noreferrer">Dr. Timothy Davis</a>, and my work on <Link to="/resume">various projects</Link>.
            </p>
            <ul className="actions">
              <li>
                {window.location.pathname === `${BASE_PATH}` || window.location.pathname === `${BASE_PATH}/`
                  ? <Link to="/about" className="button">Learn More</Link>
                  : window.location.pathname !== `${BASE_PATH}/resume`
                    ? <Link to="/resume" className="button">Learn More</Link>
                    : <Link to="/about" className="button">About Me</Link>}
              </li>
            </ul>
          </section>
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
          <section id="footer">
            <ul className="icons">
              {socialData.map(s => (
                <li key={s.label}>
                  <a href={s.link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={s.icon} color={s.color} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="copyright">&copy; Julio Maldonado <Link to="/">juliomaldonado.com</Link>.</p>
          </section>
        </section>
      </div>
    );
  }
}

export default Nav;
