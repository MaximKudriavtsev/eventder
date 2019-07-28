import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLike, removeLike } from '../actions/actions';
import { container, mainText, childText } from './post-preview.scss';
import {
  previewMain,
  previewImage,
  previewFooter
} from './post-preview-mobile.scss';
import {
  photoContainer,
  likeImage,
  loadingIndicator
} from './image-viewer.scss';
import LoadingIndicator from '../assets/loading.svg';
import Heart from '../assets/heart.svg';
import HeartFull from '../assets/heart-full.svg';

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

const isLikedMyself = (likedIds, userId) => {
  if (Array.isArray(likedIds)) {
    return likedIds.some(id => userId === id);
  }
  return false;
};

class ImageViewer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.toggleLoading = this.toggleLoading.bind(this);
    this.setLike = this.setLike.bind(this);
  }

  setLike(value) {
    const { data, userId, actions } = this.props;

    if (value) {
      actions.addLike({ id: data.id, userId });
    } else {
      actions.removeLike({ id: data.id, userId });
    }
  }

  static getDeliveredStateFromProps() {
    return { isLoading: true };
  }

  toggleLoading() {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    const { data, userId } = this.props;

    const isLiked = isLikedMyself(data.liked_users, userId);
    const likeCount = data.liked;
    const toggleLike = () => this.setLike(!isLiked);

    return (
      <div className={previewMain} key={data.id}>
        <img
          className={previewImage}
          src={data && data.display_url}
          onLoad={this.toggleLoading}
          alt="user post"
        />
        {isLoading && (
          <div className={photoContainer}>
            <img
              src={LoadingIndicator}
              className={loadingIndicator}
              alt="Loading..."
            />
          </div>
        )}

        <div className={previewFooter}>
          <div className={container}>
            <p className={mainText}>Опубликовано</p>
            <p className={childText}>
              {formatDate(new Date(postDate(data.taken_at_timestamp)))}
            </p>
          </div>
          <div className={container}>
            <div className={mainText} onClick={toggleLike}>
              {isLiked ? (
                <img src={HeartFull} className={likeImage} alt="liked" />
              ) : (
                <img src={Heart} className={likeImage} alt="like" />
              )}
            </div>
            <div className={childText} style={{ textAlign: 'center' }}>
              {likeCount && likeCount}
            </div>
          </div>
          <div className={container} />
        </div>
      </div>
    );
  }
}

ImageViewer.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
    },
    liked: PropTypes.number,
    liked_users: PropTypes.arrayOf(PropTypes.number)
  }).isRequired
};

export default connect(
  () => ({}),
  dispatch => ({
    actions: bindActionCreators({ addLike, removeLike }, dispatch)
  })
)(ImageViewer);
