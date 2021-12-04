import React, { Component } from 'react';
import './App.css';
import ProductList from "./components/product-list";
import Cart from "./components/cart";
import 'h8k-components';

const title = "HackerShop";

class App extends Component {
	constructor() {
		super();
		const products = [...PRODUCTS].map((product, index) => {
			product.id = index + 1;
			product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
			product.cartQuantity = 0;
			product.added = false;
			return product;
		});
		this.state = {
			cart: {
				items: [],
				subTotal: 0,
				totalPrice: 0,
				discount: 0,
				selectedCoupon: '0'
			},
			products
		}
		this.addToCart = this.addToCart.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.onSelectDiscount = this.onSelectDiscount.bind(this);
	}

	addToCart(index) {
		const products = this.state.products;
		products[index].cartQuantity = 1;
		products[index].added = true;
		let cart = { ...this.state.cart };
		cart.items.push({
			id: products[index].id,
			price: products[index].price,
			item: products[index].heading,
			quantity: 1
		});

		const priceList = cart.items.map(item => item.price)
		cart.subTotal = priceList.reduce((a, b) => a + b, 0)
		cart.discount = cart.subTotal * (cart.selectedCoupon / 100)
		cart.totalPrice = cart.subTotal - cart.subTotal * (parseInt(cart.selectedCoupon) / 100)

		this.setState({
			products,
			cart
		})
	}

	removeFromCart(index) {
		const products = this.state.products;
		products[index].cartQuantity = 0;
		products[index].added = false;
		let cart = { ...this.state.cart };
		let cartIndex = this.state.cart.items.findIndex(item => item.id === products[index].id);
		cart.items.splice(cartIndex, 1);

		const priceList = cart.items.map(item => item.price)
		cart.subTotal = priceList.reduce((a, b) => a + b, 0)
		cart.discount = cart.subTotal * (cart.selectedCoupon / 100)
		cart.totalPrice = cart.subTotal - cart.subTotal * (parseInt(cart.selectedCoupon) / 100)

		this.setState({
			cart,
			products
		})
	}

	onSelectDiscount(e) {
		this.setState({
			cart: {
				...this.state.cart,
				selectedCoupon: e.target.value,
				discount: this.state.cart.subTotal * (parseInt(e.target.value) / 100),
				totalPrice: this.state.cart.subTotal - this.state.cart.subTotal * (parseInt(e.target.value) / 100)
			}
		}, function() {

			console.log(this.state.cart)
		})
	}

	render() {

		return (
			<div>
				<h8k-navbar header={title}></h8k-navbar>
				<div className="layout-row shop-component">
					<ProductList addToCart={this.addToCart} removeFromCart={this.removeFromCart} products={this.state.products} />
					<Cart onSelectDiscount={this.onSelectDiscount} cart={this.state.cart} />
				</div>
			</div>
		);
	}
}

export const PRODUCTS = [
	{
		heading: "Cap - $10",
		name: "Cap",
		price: 10
	},
	{
		heading: "Hand Bag - $30",
		name: "HandBag",
		price: 30
	},
	{
		heading: "Shirt - $30",
		name: "Shirt",
		price: 30
	},
	{
		heading: "Shoes - $50",
		name: "Shoe",
		price: 50
	},
	{
		heading: "Pant - $40",
		name: "Pant",
		price: 40
	},
	{
		heading: "Slipper - $20",
		name: "Slipper",
		price: 20
	}
];
export default App;
