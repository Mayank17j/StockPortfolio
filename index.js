const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

/*
Endpoint 1: Calculate the Returns of the Stocks added
API Call: <http://localhost:3000/calculate-returns?boughtAt=300&marketPrice=400&quantity=2>
Expected Output: 200
*/
function calculateReturns(boughtAt, marketPrice, quantity) {
  return (marketPrice - boughtAt) * quantity;
}
app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);
  let result = calculateReturns(boughtAt, marketPrice, quantity);

  res.send(result.toString());
});

/*
Endpoint 2: Calculate the Total Returns
API Call: <http://localhost:3000/total-returns?stock1=100&stock2=200&stock3=200&stock4=400>
Expected Output: 900
*/
function totalReturns(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let result = totalReturns(stock1, stock2, stock3, stock4);

  res.send(result.toString());
});

/*
Endpoint 3: Calculate the Return Percentage
API Call: <http://localhost:3000/calculate-return-percentage?boughtAt=400&returns=200>
Expected Output: 50
*/
function calculateReturnPercentage(boughtAt, returns) {
  return (returns * 100) / boughtAt;
}
app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  let result = calculateReturnPercentage(boughtAt, returns);

  res.send(result.toString());
});

/*
Endpoint 4: Calculate the Total Return Percentage for the given stocks return %
API Call: <http://localhost:3000/total-return-percentage?stock1=10&stock2=20&stock3=20&stock4=40>
Expected Output: 90
*/
function totalReturnPercentage(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  let result = totalReturnPercentage(stock1, stock2, stock3, stock4);
  res.send(result.toString());
});

/*
Endpoint 5: Identify the Status of Stocks based on their Return Value
API Call: <http://localhost:3000/status?returnPercentage=90>
Expected Output: profit
*/
function status(returnPercentage) {
  if (returnPercentage === 0) return 'no profit, no loss';
  else return returnPercentage < 0 ? 'loss' : 'profit';
}
app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);
  let result = status(returnPercentage);

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
