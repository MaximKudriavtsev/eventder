import React from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../credentials';

export default () => (
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-140052799-1"
    />
    <script>
      {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-140052799-1');`}
    </script>

    <title>{`${APP_NAME} - Присоединяйся к событиям вокруг тебя!`}</title>

    <meta
      name="description"
      content="Интересные акции и мероприятия, отвязные вечеринки и уютные посиделки. Будь в курсе самых актуальных событий и самых популярных мест в два клика!"
    />

    <meta property="og:title" content="Всё самое классное совсем рядом 😋" />
    <meta property="og:site_name" content={APP_NAME} />
    <meta
      property="og:description"
      content="Интересные акции и мероприятия, отвязные вечеринки и уютные посиделки. Будь в курсе самых актуальных событий и самых популярных мест в два клика!"
    />
    <meta
      property="og:image"
      content="https://i.ibb.co/VjPKp9q/eventder-preview-min.png"
    />
  </Helmet>
);
