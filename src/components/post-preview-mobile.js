import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-slick';
import { togglePostPreviewVisibility } from '../actions/actions';
import ImageViewer from './image-viewer';
import leftChevron from '../assets/left-chevron.svg';
import {
  slickSliderCustom,
  modalMain,
  modalHeader,
  headerLeftButton,
  headerBackImage,
  headerTitle,
  headerRightButton
} from './post-preview-mobile.scss';
import preventSafariBoundEffect from '../utils/prevent-safari-bound';
import { APP_NAME } from '../credentials';

// TODO: try to remove this file
class PostPreviewMobile extends React.PureComponent {
  componentDidMount() {
    document.ontouchmove = preventSafariBoundEffect;
  }

  render() {
    const { open, actions, postsData, userId } = this.props;

    return (
      <div className={modalMain} style={{ display: open ? 'flex' : 'none' }}>
        <div className={modalHeader}>
          <div
            className={headerLeftButton}
            onClick={actions.togglePostPreviewVisibility}
          >
            <img className={headerBackImage} src={leftChevron} alt="exit" />
          </div>
          <div className={headerTitle}>{APP_NAME}</div>
          <div className={headerRightButton} />
        </div>

        <Slider
          dots
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          className={slickSliderCustom}
        >
          {Array.isArray(postsData) &&
            postsData.map(data => (
              <ImageViewer data={data} key={data.id} userId={userId} />
            ))}
        </Slider>
      </div>
    );
  }
}

PostPreviewMobile.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  open: PropTypes.bool,
  postsData: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  )
};

PostPreviewMobile.defaultProps = {
  userId: undefined,
  open: false,
  postsData: [
    {
      id: 0,
      display_url: '',
      preview_url: '',
      owner_id: 0,
      taken_at_timestamp: 1,
      location: {
        lat: 0,
        lng: 0,
        name: '',
        instagramId: 0
      }
    }
  ]
};

export default connect(
  store => ({
    userId: store.userData && store.userData.identities[0].userId,
    open: store.isPreviewVisible,
    postsData: store.currentPostsData
  }),
  dispatch => ({
    actions: bindActionCreators({ togglePostPreviewVisibility }, dispatch)
  })
)(PostPreviewMobile);
