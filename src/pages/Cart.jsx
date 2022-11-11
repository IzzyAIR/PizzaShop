import React from 'react';
import CartBlock from '../ReactComponets/Cart/CartBlock';
import CartEmpty from '../ReactComponets/Cart/CartEmpty';
import { useSelector } from 'react-redux';
import { selectCartData } from '../Redux/Slice/cartSlice';

const Cart = () => {
	const { items } = useSelector(selectCartData);

	return <>{items.length > 0 ? <CartBlock /> : <CartEmpty />}</>;
};
export default Cart;
