import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Basket from './Basket'
import Chat from './Chat'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem',
  },
  menu: {
    marginBottom: '1rem',
  },
  link: {
    paddingRight: '1rem',
  },
  routeContainer: {
    position: 'relative',
    flexGrow: 1,
  }
};

const App = () => (
  <div style={styles.root}>
    <nav style={styles.menu}>
      <Link to="/basket" style={styles.link}>Basket</Link>
      <Link to="/chat">Chat</Link>
    </nav>
    <div style={styles.routeContainer}>
      <Route path="/basket" component={Basket} />
      <Route path="/chat" component={Chat} />
    </div>
  </div>
);

export default App;
