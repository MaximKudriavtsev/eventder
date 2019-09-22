import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGuideVisibility } from '../actions/actions';
import preventSafariBoundEffect from '../utils/prevent-safari-bound';
import { APP_NAME } from '../credentials';

import Guide0 from '../assets/guide-0-4.jpg';
import Guide1 from '../assets/guide-1.jpg';
import Guide2 from '../assets/guide-2-1.jpg';
import Guide3 from '../assets/guide-3.jpg';

/* eslint-disable react/prop-types */

const items = [
  {
    src: Guide0,
    caption: `Добро пожаловать в ${APP_NAME}!`,
    // eslint-disable-next-line react/jsx-one-expression-per-line
    text: (
      <React.Fragment>
        <br />
        <br />
      </React.Fragment>
    )
  },
  {
    src: Guide1,
    caption: 'Все под рукой!',
    text: `${APP_NAME} показывает события, которые происходят сейчас вокруг тебя.`
  },
  {
    src: Guide2,
    caption: 'Тебя увидят окружающие!',
    text:
      'Публикуй фотографии текущего мероприятия, чтобы привлечь на них больше людей.'
  },
  {
    src: Guide3,
    caption: 'Найди самое интересное!',
    text: 'Находи интересные события и присоединяйся к ним!'
  }
];

class Guide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    document.ontouchmove = preventSafariBoundEffect;
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const { actions } = this.props;
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    if (nextIndex === 0) {
      Cookie.set('guide', true, { path: '/' });
      actions.setGuideVisibility(false);
    } else {
      this.setState({ activeIndex: nextIndex });
    }
  }

  previous() {
    if (this.animating) return;
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    if (nextIndex === items.length - 1) {
      document.location.href = document.location.href.slice(0, -6);
    } else {
      this.setState({ activeIndex: nextIndex });
    }
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
          interval={8000}
        >
          <h4 style={{ textAlign: 'center', color: '#00b9cb' }}>
            {item.caption}
          </h4>
          <h6 style={{ textAlign: 'center', color: '#00b9cb' }}>{item.text}</h6>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                height: '100%',
                maxHeight: '440px'
              }}
              src={item.src}
              alt={item.altText}
            />
          </div>
        </CarouselItem>
      );
    });

    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          paddingTop: '20px',
          zIndex: 4000,
          backgroundColor: '#ccfafe'
        }}
      >
        <div
          style={{
            width: '100%',
            margin: '0 auto',
            bottom: 0,
            position: 'absolute'
          }}
        >
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    actions: bindActionCreators({ setGuideVisibility }, dispatch)
  })
)(Guide);
