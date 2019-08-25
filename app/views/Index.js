import React from 'react';
import { Link } from 'react-router-dom';

import Cell from '../components/Home/Cell';

import Main from '../layouts/Main';

import data from '../data/media';

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>Howdy!</h2>
          {/* <h2><Link to="/">Thanks for Visiting</Link></h2> */}
          {/* <p>A beautiful, responsive, react app written with modern Javascript.</p> */}
        </div>
      </header>
      <p>Welcome to my personal website.
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
        <br />
        Here are some cool things I&apos;ve been a part of over the years.
      </p>
      {data.map(project => (
        <Cell
          data={project}
          key={project.title}
        />
      ))}
      {/* <p> Source available <a href="https://github.com/mldangelo/personal-site">here</a>.</p> */}
    </article>
  </Main>
);

export default Index;
