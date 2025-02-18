import React from 'react';
import { APP_NAME } from '../../credentials';

export default () => (
  <div>
    <h6>КОНТАКТЫ</h6>
    {/* <p>
      Мы команда, заинтересованная в постоянном развитии нашего продукта, он
      молод и несовершенен, поэтому мы готовы слышать критику и делать работу
      над ошибками.
    </p> */}
    <p>
      По любым вопросам сотрудничества Вы можете обратиться по адресу
      электронной почты:
    </p>
    <a href={`mailto:mac.kudryavtsev@gmail.com?subject=${APP_NAME}%20Feedback`}>
      mac.kudryavtsev@gmail.com
    </a>
  </div>
);
