import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import Routes from './route';
import {Provider} from 'react-redux';
import store from './store/configureStore';
ReactDOM.render(
  <Provider store={store}>
    <Routes>
      <App />
    </Routes>
    </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
