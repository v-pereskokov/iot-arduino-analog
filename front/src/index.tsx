import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './containers/Main/Main';

import './statics/scss/main.scss';

ReactDOM.render(
  <div className='app'>
    <Main />
  </div>,
  document.getElementById('root'),
);
