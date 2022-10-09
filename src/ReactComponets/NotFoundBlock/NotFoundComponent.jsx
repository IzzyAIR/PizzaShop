import React from 'react';
import styles from './NotFoundCom.module.scss';

const NotFoundComponent = () => {
	return (
		<div className={styles.root}>
			<span>😕</span>
			<br />
			<h1>Ничего не найдено...</h1>
			<p>К сожалению такой страницы не существует в нашем интернет магазине~</p>
		</div>
	);
};
export default NotFoundComponent;
{
	/* <img src='./img/notFound.png' alt='' /> */
}
