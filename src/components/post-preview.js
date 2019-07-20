import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, ModalBody } from 'reactstrap';
import Slider from 'react-slick';
import { togglePostPreviewVisibility } from '../actions/actions';
import PhotoPreview from './photo-preview';
import { body, modalMain, exitButton, exitIcon } from './post-preview.scss';
import whiteCross from '../assets/white-cross.svg';

const PostPreview = React.memo(({ open, actions, postsData, userId }) => {
  return (
    <Modal
      isOpen={open}
      toggle={actions.togglePostPreviewVisibility}
      className={modalMain}
    >
      <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
        {Array.isArray(postsData) &&
          postsData.map(postData => (
            <React.Fragment key={postData.id}>
              <ModalBody className={body}>
                <PhotoPreview
                  data={postData}
                  key={postData.id}
                  userId={userId}
                />
                <div
                  className={exitButton}
                  onClick={actions.togglePostPreviewVisibility}
                >
                  <img className={exitIcon} src={whiteCross} alt="exit" />
                </div>
              </ModalBody>
            </React.Fragment>
          ))}
      </Slider>
    </Modal>
  );
});

PostPreview.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  open: PropTypes.bool,
  actions: PropTypes.shape({}).isRequired,
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
  userId: undefined,
  open: false,
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

export default connect(
  store => ({
    userId: store.userData && store.userData.identities[0].userId,
    open: store.isPreviewVisible,
    postsData: store.currentPostsData
  }),
  dispatch => ({
    actions: bindActionCreators({ togglePostPreviewVisibility }, dispatch)
  })
)(PostPreview);
