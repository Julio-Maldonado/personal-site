/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import aTag from '../CustomaTag';

class Cell extends React.Component {
  state = {
    height: 0,
    width: 0,
  }

  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  }

  componentDidUpdate() {
    this.updateHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  updateHeight() { // check for width to make phone heights smaller, on web should be bigger
    if (this.state.height !== this.descriptionDiv.clientHeight) {
      this.setState({ height: this.descriptionDiv.clientHeight, width: window.innerWidth });
    }
  }

  render() {
    const { data } = this.props;
    const isMobile = this.state.width <= 500;
    // const [WIDTH, HEIGHT] = [230, 313];
    const HEIGHT = isMobile ? 275 : 450;
    const iframeStyle = {
      marginLeft: isMobile ? -12 : 0, // this seems to be a decent proper margin
      // marginRight: 'auto',
      // display: 'block',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <div className="cell-container">
        <article className="mini-post">
          <header>
            <h3><a href={data.link} target="_blank" rel="noopener noreferrer">{data.title}</a></h3>
            <time className="published">{dayjs(data.date).format('MMMM, YYYY')}</time>
          </header>
          <a href={data.link} className="image" target="_blank" rel="noopener noreferrer">
            {/* <img src={url.resolve(BASE_PATH, data.image)} alt="" /> */}
            {
              data.videos.map(video => (
                (data.type === 'web') ? <iframe
                  src={video}
                  style={iframeStyle}
                  height={HEIGHT}
                  frameBorder="0"
                  allowFullScreen=""
                  title="Embedded post"
                /> : <video controls="true" style={iframeStyle} height={HEIGHT}>
                  <source src={video} type="video/mp4" />
                </video>
              ))
            }
          </a>
          <div className={`description${data.title}`} ref={(div) => { this.descriptionDiv = div; }}>
            <p>{data.desc}</p>
          </div>
        </article>
      </div>
    );
  }
}

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
  }).isRequired,
};

export default Cell;
