/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import data from '../../data/contact';

const Nav = () => (
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

    <section id="footer">
      <ul className="icons">
        {data.map(s => (
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
);

export default Nav;
