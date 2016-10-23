import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import store from './redux/store';
import './index.css';
import '../node_modules/react-flexgrid/lib/flexgrid.css';
import '../node_modules/toastr/build/toastr.css';

/*
 <Provider> is a react-redux convenience that helps
 pass the Redux state to every container.  This avoids
 the need to pass store={this.props.store} down the
 React tree.

 This convenience only works for the store property.
 Adding additional properties to the <Provider> has no effect.
 */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
