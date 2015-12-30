import React from 'react';
import ReactDOM from 'react-dom';

import BucketListContainer from './detail-components.jsx';

const SPLIT_PATH = window.location.pathname.split('/');
const BUCKET_LIST_ID = SPLIT_PATH[SPLIT_PATH.length-2];

ReactDOM.render(
  <BucketListContainer source={'/api/bucketlists/' + BUCKET_LIST_ID + '/'} />,
  document.getElementById('bucketlist-container')
);