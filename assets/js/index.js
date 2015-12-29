import React from 'react';
import ReactDOM from 'react-dom';

import Widget from './widget.jsx';

ReactDOM.render(
  <Widget text={'Hello friend'} />,
  document.getElementById('container')
);