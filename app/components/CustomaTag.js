import React from 'react';
import PropTypes from 'prop-types';

const aTag = ({ data }) => (
  <a href={data.link} target="_blank" rel="noopener noreferrer">
    {data.title}
  </a>
);

aTag.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default aTag;
