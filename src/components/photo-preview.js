import * as React from 'react';
import * as PropTypes from 'prop-types';
import { container, mainText, childText } from './post-preview.scss';
import {
  previewMain,
  previewImage,
  previewFooter
} from './post-preview-mobile.scss';
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

class PhotoPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: isLikedMyself(props.data.liked_users, props.userId),
      loading: true,
      postId: props.data.id,
      likeCount: props.data.liked || 0
    };

    this.toggleLoading = this.toggleLoading.bind(this);
    this.setLike = this.setLike.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { postId } = state;

    if (postId !== props.data.id)
      return {
        postId: props.data.id,
        loading: true,
        isLiked: isLikedMyself(props.liked_users, props.userId),
        likeCount: props.data.liked
      };
    return state;
  }

  setLike(value) {
    const { likeCount: prevLikeCount } = this.state;
    const { data, userId } = this.props;
    const method = value ? 'addLike' : 'removeLike';

    fetch(
      `https://pgu80wwqs6.execute-api.eu-central-1.amazonaws.com/dev/${method}`,
      {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({ id: data.id, userId })
      }
    );

    this.setState({
      isLiked: value,
      likeCount: value ? prevLikeCount + 1 : prevLikeCount - 1
    });

    if (value) {
      // TODO: pass the next actions into this component
      // addLocalLike({ id: data.id, userId });
    } else {
      // removeLocalLike({ id: data.id, userId });
    }
  }

  toggleLoading() {
    this.setState({ loading: false });
  }

  render() {
    const { loading, likeCount, isLiked } = this.state;
    const { data } = this.props;

    console.log(data); // data.liked_users: []

    const toggleLike = () => this.setLike(!isLiked);

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
          <div className={container}>
            <div className={mainText} onClick={toggleLike}>
              {isLiked ? (
                <img
                  src={HeartFull}
                  style={{ margin: '0 auto', height: '35px' }}
                  alt="liked"
                />
              ) : (
                <img
                  src={Heart}
                  style={{ margin: '0 auto', height: '35px' }}
                  alt="like"
                />
              )}
            </div>
            <div className={childText} style={{ textAlign: 'center' }}>
              {likeCount}
            </div>
          </div>
          <div className={container} />
        </div>
      </div>
    );
  }
}

PhotoPreview.propTypes = {
  // addLocalLike: PropTypes.func.isRequired,
  // removeLocalLike: PropTypes.func.isRequired,
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

export default PhotoPreview;
