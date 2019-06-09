import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import Slider from 'react-slick';
import PhotoPreview from './photo-preview';
import { body, modalMain, exitButton, exitIcon } from './post-preview.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
import whiteCross from '../assets/white-cross.svg';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const PostPreview = ({ open, toggleVisible, postsData }) => {
  return (
    <Modal isOpen={open} toggle={toggleVisible} className={modalMain}>
      <Slider {...settings}>
        {Array.isArray(postsData) &&
          postsData.map(postData => (
            <React.Fragment key={postData.id}>
              <ModalBody className={body}>
                <PhotoPreview data={postData} key={postData.id} />
                <div className={exitButton} onClick={toggleVisible}>
                  <img className={exitIcon} src={whiteCross} alt="exit" />
                </div>
              </ModalBody>
            </React.Fragment>
          ))}
      </Slider>
    </Modal>
  );
};

export default PostPreview;

PostPreview.propTypes = {
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

PostPreview.defaultProps = {
  open: false,
  toggleVisible: undefined,
  postsData: {
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
};
