import * as React from 'react';
import * as PropTypes from 'prop-types';
import Slider from 'react-slick';
import PhotoPreview from './photo-preview';
import leftChevron from '../assets/left-chevron.svg';

// import { container, mainText, childText } from './post-preview.scss';

import {
  slickSliderCustom,
  modalMain,
  modalHeader,
  headerLeftButton,
  headerBackImage,
  headerTitle,
  headerRightButton
  // previewMain,
  // previewImage,
  // previewFooter
} from './post-preview-mobile.scss';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

// const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
//   day: 'numeric',
//   month: 'short',
//   hour: 'numeric',
//   minute: 'numeric'
// });

// const formatDate = date => dateFormatter.format(date);

// const postDate = timestamp =>
//   timestamp && timestamp.toString().length === 10
//     ? timestamp * 1000
//     : timestamp;

const preventSafariBoundEffect = event => {
  event.preventDefault();
};

class PostPreviewMobile extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loading: true
    };

    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    const { loading: stateLoading } = this.state;
    this.setState({ loading: !stateLoading });
  }

  render() {
    const { open, toggleVisible, postsData } = this.props;

    document.ontouchmove = preventSafariBoundEffect;
    return (
      <div className={modalMain} style={{ display: open ? 'flex' : 'none' }}>
        <div className={modalHeader}>
          <div className={headerLeftButton} onClick={toggleVisible}>
            <img className={headerBackImage} src={leftChevron} alt="exit" />
          </div>
          <div className={headerTitle}>Eventder</div>
          <div className={headerRightButton} />
        </div>

        <Slider {...settings} className={slickSliderCustom}>
          {Array.isArray(postsData) &&
            postsData.map(data => <PhotoPreview data={data} key={data.id} />)}
        </Slider>
      </div>
    );
  }
}

PostPreviewMobile.propTypes = {
  open: PropTypes.bool,
  toggleVisible: PropTypes.func,
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
  open: false,
  toggleVisible: undefined,
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

export default PostPreviewMobile;
