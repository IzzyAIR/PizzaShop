import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/empty-cart.png';

const CartEmpty = () => {
	return (
		<div className='container container--cart'>
			<div className='cart cart--empty'>
				<h1>Корзина пустая 😕</h1>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={cartEmptyImg} alt='Empty cart' />
				<Link to='/'>
					<div className='button button--black'>
						<span>Вернуться назад</span>
					</div>
				</Link>
			</div>
		</div>
	);
};
export default CartEmpty;
