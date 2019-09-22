import React from 'react';
import { APP_NAME } from '../../credentials';

export default () => (
  <div>
    <h6>ВАКАНСИИ</h6>
    <p>
      Проект молод и амбициозен, как и его команда, поэтому нам постоянно
      требуются трудолюбивые, энергичные люди!
    </p>
    <p>
      Впереди нас ждут сложные нетривиальные задачи, требующие элегантных
      решений.
    </p>
    <p>Ваше резюме и предложения присылайте по адресу электронной почты:</p>
    <a href={`mailto:mac.kudryavtsev@gmail.com?subject=${APP_NAME}%20Job`}>
      mac.kudryavtsev@gmail.com
    </a>
  </div>
);
