/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import url from 'url';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebookF';
import faLinkedinIn from '@fortawesome/fontawesome-free-brands/faLinkedinIn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import aTag from '../CustomaTag';

const Cell = (props) => {
  const { data } = props;
  return (
    <div className="cell-container">
      <article className="mini-post">
        <header>
          <h3><a href={data.link} target="_blank" rel="noopener noreferrer">{data.title}</a></h3>
          <time className="published">{dayjs(data.date).format('MMMM DD, YYYY')}</time>
        </header>
        <a href={data.link} className="image" target="_blank" rel="noopener noreferrer">
          <img src={url.resolve(BASE_PATH, data.image)} alt={data.alt} height="100%" width="100%" />
        </a>
        <div className="description">
          <p>
            <b>{data.type}</b>
            <br />
            <i>{data.desc}</i>
            <br />
            <br />
            <a href={data.fb.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faThumbsUp} color="#3b5998" />
            </a>
            &nbsp;{data.fb.likes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href={data.fb.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faComment} color="#3b5998" />
            </a>
            &nbsp;{data.fb.comments}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href={data.fb.link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faShare} color="#3b5998" />
            </a>
            &nbsp;{data.fb.shares}
          </p>
        </div>

      </article>
    </div>
  );
};

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    alt: PropTypes.string.isRequired,
    fb: PropTypes.object.isRequired,

  }).isRequired,
};

export default Cell;
