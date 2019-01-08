import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class NotFound extends React.Component {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Helmet>
          <title>[Заголовок] Страница не найдена</title>
        </Helmet>
        
        <span>Страница не найдена</span>
      </React.Fragment>
    );
  }
}
