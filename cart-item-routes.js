const express = require("express");
const cartItems = express.Router();

let cartItemList = require("./cart-item");

cartItems.use(express.json());

//get

cartItems.get("/", (req, res) => {
  res.json(cartItemList);
});

cartItems.get("/:id", (request, response) => {
  let selectedItem = cartItemList[request.params.id];
  if (selectedItem) {
    response.json(selectedItem);
  } else {
    response.status(404).json("Sorry, we are sold out");
  }
});

//post

cartItems.post("/", (req, res) => {
  cartItemList.push(req.body);
  res.status(201).json({
    id: req.body.id,
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity
  });
});

//put

cartItems.put("/:id", (req, res) => {
  let selectedItem = cartItemList[req.params.id];
  if (selectedItem) {
    cartItemList[req.params.id] = req.body;
    res.json(selectedItem);
  } else {
    res.status(404).json("Sorry, we are sold out");
  }
});

//delete
cartItems.delete("/:id", (req, res) => {
  let selectedItem = cartItemList[req.params.id];
  if (selectedItem) {
    cartItemList.splice(req.params.id, 1);
    res.status(204).send();
  } else {
    res.status(404).json("Sorry, we are sold out");
  }
});

module.exports = cartItems;