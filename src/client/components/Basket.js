import React from 'react';
import { connect } from 'react-redux';

import { fetchBasketRequest } from '../redux/basket';
import Chat from './Chat'

const styles = {
  rawOutput: {
    fontFamily: "Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace",
    marginTop: '1rem',
  }
}

const Basket = ({ basket, fetchBasket }) => {
  return (
    <div>
      <button onClick={fetchBasket}>Load Basket</button>
      <pre style={styles.rawOutput}>{JSON.stringify(basket, null, 2) }</pre>
    </div>
  );
}

const mapStateToProps = (state) => ({
  basket: state.basket,
})

const mapDispatchToProps = (dispatch) => ({
  fetchBasket: () => dispatch(fetchBasketRequest({
    origin: 'EUS',
    destination: 'MAN'
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
