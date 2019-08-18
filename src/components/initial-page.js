import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAlertMessage } from '../actions/actions';
import { verticalAlignment, title, footerButton } from './initial-page.scss';
import SignUp from './utils/sign-up';
import SignOut from './utils/sign-out';

import AboutUs from './information/about-us';
import Contacts from './information/contacts';
import AboutApp from './information/about-app';
import Jobs from './information/jobs';

/* eslint-disable react/prop-types */
const InitialPage = ({ userData, actions }) => (
  <div className="container">
    <div className="row">
      <div className="col-2 col-xl-4" />
      <div className="col-8 col-xl-4">
        <div className={verticalAlignment}>
          <h1 className={`display-4 text-center ${title}`}>Eventder</h1>
          <br />
          {userData ? (
            <div>
              <h6 className="text-center">{`Привет, ${userData.name}!`}</h6>
              <br />
              <Link to="/main">
                <button type="button" className="btn btn-info w-100">
                  Открыть карту
                </button>
              </Link>
              <br />
              <br />
              <SignOut>
                <button type="button" className="btn btn-light w-100">
                  Выйти
                </button>
              </SignOut>
            </div>
          ) : (
            <React.Fragment>
              <h6 className="text-center">
                Зарегистрируйтесь, чтобы увидеть события поблизости.
              </h6>
              <br />
              <SignUp>
                <button type="button" className="btn btn-info w-100">
                  Регистрация
                </button>
              </SignUp>
              <br />
              <br />
              <Link to="/main/">
                <button type="button" className="btn btn-light w-100">
                  Войти как гость
                </button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="col-2 col-xl-4" />
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />

    <div className="row">
      <div className="col-2 col-xl-4" />
      <div className="col-8 col-xl-4 text-center">
        <div
          className={footerButton}
          onClick={() => actions.setAlertMessage({ message: AboutUs() })}
        >
          О НАС
        </div>
        <div
          className={footerButton}
          onClick={() => actions.setAlertMessage({ message: Contacts() })}
        >
          КОНТАКТЫ
        </div>
        <div
          className={footerButton}
          onClick={() => actions.setAlertMessage({ message: Jobs() })}
        >
          ВАКАНСИИ
        </div>
        <div
          className={footerButton}
          onClick={() => actions.setAlertMessage({ message: AboutApp() })}
        >
          ПРИЛОЖЕНИЕ
        </div>
      </div>
      <div className="col-2 col-xl-4" />
    </div>
  </div>
);

export default connect(
  store => ({
    userData: store.userData
  }),
  dispatch => ({
    actions: bindActionCreators({ setAlertMessage }, dispatch)
  })
)(InitialPage);
