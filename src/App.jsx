import React from 'react';
import './dist/css/main.css';
import {BrowserRouter as Router} from 'react-router-dom';
import ApplicationRouter from './router/Router'; 
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/store';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <Router>
          <Nav />
          <ApplicationRouter />
        </Router>
      </div>
    </StoreProvider>
  );
}

export default App;
