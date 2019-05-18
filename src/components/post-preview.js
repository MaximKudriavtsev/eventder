import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import {
  image,
  body,
  modalFooter,
  container,
  // button,
  mainText,
  childText,
  modalMain,
  exitButton,
  exitIcon
} from './post-preview.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */

// import liked from '../assets/liked.svg';
// import like from '../assets/like.svg';
import whiteCross from '../assets/white-cross.svg';

const formatDate = date =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);

// TODO: use yandex geolocation to recognize address

const PostPreview = ({ open, toggleVisible, postData }) => {
  // const toggleLike = () => console.log('toggle like');

  const postDate =
    postData.taken_at_timestamp &&
    postData.taken_at_timestamp.toString().length === 10
      ? postData.taken_at_timestamp * 1000
      : postData.taken_at_timestamp;

  return (
    <Modal isOpen={open} toggle={toggleVisible} className={modalMain}>
      <ModalBody className={body}>
        <img className={image} src={postData && postData.display_url} alt="" />
      </ModalBody>

      <ModalFooter className={modalFooter}>
        <div className={container}>
          <p className={mainText}>Опубликовано</p>
          <p className={childText}>
            {postData.taken_at_timestamp && formatDate(new Date(postDate))}
          </p>
        </div>

        {/* <img
          className={button}
          src={postData.like ? liked : like}
          alt="like"
          onClick={toggleLike}
        /> */}

        <div className={container} style={{ alignItems: 'flex-end' }}>
          <p className={mainText}>Адрес</p>
          <p className={childText}>Тула</p>
        </div>

        <div className={exitButton} onClick={toggleVisible}>
          <img className={exitIcon} src={whiteCross} alt="exit" />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default PostPreview;

PostPreview.propTypes = {
  open: PropTypes.bool,
  toggleVisible: PropTypes.func,
  postData: PropTypes.shape({
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
};

PostPreview.defaultProps = {
  open: false,
  toggleVisible: undefined,
  postData: {
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
