import * as React from 'react';
import * as PropTypes from 'prop-types';

import { container, mainText, childText } from './post-preview.scss';
import {
  previewMain,
  previewImage,
  previewFooter
} from './post-preview-mobile.scss';
import LoadingIndicator from '../assets/loading.svg';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: 'numeric'
});

const formatDate = date => dateFormatter.format(date);

const postDate = timestamp =>
  timestamp && timestamp.toString().length === 10
    ? timestamp * 1000
    : timestamp;

class PhotoPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      postId: props.data.id
    };

    this.toggleLoading = this.toggleLoading.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { postId } = state;

    if (postId !== props.data.id)
      return { postId: props.data.id, loading: true };
    return state;
  }

  toggleLoading() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { data } = this.props;

    return (
      <div className={previewMain} key={data.id}>
        <img
          className={previewImage}
          src={data && data.display_url}
          alt=""
          onLoad={this.toggleLoading}
        />
        {loading ? (
          <div
            style={{
              height: '100px',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <img
              src={LoadingIndicator}
              width="30px"
              height="30px"
              alt="Loading..."
            />
          </div>
        ) : null}

        <div className={previewFooter}>
          <div className={container}>
            <p className={mainText}>Опубликовано</p>
            <p className={childText}>
              {data.taken_at_timestamp &&
                formatDate(new Date(postDate(data.taken_at_timestamp)))}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

PhotoPreview.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    display_url: PropTypes.string,
    preview_url: PropTypes.string,
    owner_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    taken_at_timestamp: PropTypes.number,
    location: {
      lat: PropTypes.number,
      lng: PropTypes.number,
      name: PropTypes.string,
      instagramId: PropTypes.number
    }
  }).isRequired
};

export default PhotoPreview;
