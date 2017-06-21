import express from 'express';

//////////////////////////////////////////////////
// Dummy data

const basket = {
  orderLines: {
    '0': {
      productId: '123',
      quantity: 1,
    },
    '1': {
      productId: '456',
      quantity: 3
    },
    '2': {
      productId: '789',
      quantity: 1
    }
  }
}

const prices = {
  '123': {
    price: 125.50,
    vat: 20
  },
  '456': {
    price: 19.30,
    vat: 0,
  },
  '789': {
    price: 37.99,
    vat: 20,
  }
}

const products = {
  '123': {
    name: 'Jacket',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu mollis leo, sed faucibus orci.',
  },
  '456': {
    name: 'T-Shirt',
    description: 'Etiam malesuada sapien sapien, ac placerat turpis ullamcorper id. Nullam ornare massa odio, a pellentesque elit gravida sed.',
  },
  '789': {
    name: 'Jeans',
    description: 'Aliquam euismod convallis urna venenatis facilisis. Aenean non tempor dolor, eu finibus arcu.',
  }
}

//////////////////////////////////////////////////
// Initialization

const port = 3002;

express()
  .get('/api/basket', (request, response) => response.json(basket))
  .get('/api/products', (request, response) => response.json(products))
  .get('/api/prices', (request, response) => response.json(prices))
  .listen(port, err => err
    ? console.log(err)
    : console.info(`Started foreign API server: http://localhost:${port}`)
);
