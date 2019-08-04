import React from 'react';
import PropTypes from 'prop-types';

const Degree = ({ data }) => (
  <article className="degree-container">
    <header>
      <h4 className="degree">{data.degree}, {data.honors}</h4>
      <p className="school"><a href={data.link} target="_blank" rel="noopener noreferrer">{data.school}</a>, <a href="https://engineering.tamu.edu/academics/eh/index.html" target="_blank" rel="noopener noreferrer">{data.distinguishments}</a>, Minors in {data.minors}, May {data.year}</p>
      {/* <p className="school"><a href="https://engineering.tamu.edu/academics/eh/index.html">{data.distinguishments}</a></p> */}
    </header>
  </article>
);

Degree.propTypes = {
  data: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    honors: PropTypes.string.isRequired,
    programs: PropTypes.string.isRequired,
    distinguishments: PropTypes.string.isRequired,
    minors: PropTypes.string.isRequired,
  }).isRequired,
};

export default Degree;
