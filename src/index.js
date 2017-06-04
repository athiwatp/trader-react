import React from 'react';
import ReactDOM from 'react-dom';
import TraderApp from './trader-app';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<TraderApp />, document.getElementById('root'));
registerServiceWorker();
