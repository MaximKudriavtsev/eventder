import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import {
  image,
  body,
  modalFooter,
  container,
  button,
  mainText,
  childText
} from './post-preview.scss';

import liked from '../assets/liked.svg';
import like from '../assets/like.svg';

const formatDate = date =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);

// TODO: use yandex geolocation to recognize address

const PostPreview = ({ open, toggleVisible, postData }) => {
  const toggleLike = () => console.log('toggle like');

  return (
    <Modal isOpen={open} toggle={toggleVisible}>
      <ModalBody className={body}>
        <img className={image} src={postData && postData.display_url} alt="" />
      </ModalBody>

      <ModalFooter className={modalFooter}>
        <div className={container}>
          <p className={mainText}>Опубликовано</p>
          <p className={childText}>
            {postData.taken_at_timestamp &&
              formatDate(new Date(postData.taken_at_timestamp * 1000))}
          </p>
        </div>

        <img
          className={button}
          src={postData.like ? liked : like}
          alt="like"
          onClick={toggleLike}
        />

        <div className={container} style={{ alignItems: 'flex-end' }}>
          <p className={mainText}>Адрес</p>
          <p className={childText}>123</p>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default PostPreview;

PostPreview.propTypes = {
  open: PropTypes.bool,
  toggleVisible: PropTypes.func,
  postData: PropTypes.objectOf(PropTypes.object)
};

PostPreview.defaultProps = {
  open: false,
  toggleVisible: undefined,
  postData: {}
};
