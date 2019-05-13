import * as React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        className="display-4"
        style={{ marginTop: '10vh', fontSize: 'calc(1.425rem + 2.1vw)' }}
      >
        Страница не найдена
      </div>
      <Link
        to="/"
        style={{ marginTop: '4vh', fontSize: 'calc(1.425rem + 2.1vw)' }}
      >
        Вернуться на главную
      </Link>
    </div>
  </div>
);
