import React from 'react';
import './dist/css/main.css';
import {BrowserRouter as Router} from 'react-router-dom';
import ApplicationRouter from './router/Router'; 
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/store';
import Nav from './components/Nav/Nav';
import Token from './views/Token/Token';

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <Token />
        <Router>
          <Nav />
          <ApplicationRouter />
        </Router>
      </div>
    </StoreProvider>
  );
}

export default App;
