import React from 'react';
import CartBlock from '../ReactComponets/Cart/CartBlock';
import CartEmpty from '../ReactComponets/Cart/CartEmpty';
import { useSelector } from 'react-redux';

const Cart = () => {
	const { items } = useSelector((state) => state.cartSlice);

	return <>{items.length > 0 ? <CartBlock /> : <CartEmpty />}</>;
};
export default Cart;
