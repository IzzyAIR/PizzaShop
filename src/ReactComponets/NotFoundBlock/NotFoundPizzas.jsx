import React from 'react';
import styles from './NotFoundCom.module.scss';

const NotFoundPizzas = () => {
	return (
		<div className={styles.root}>
			<span>😕</span>
			<br />
			<h1>Ничего не найдено...</h1>
			<p>К сожалению неудалось получить пиццы~</p>
			<p>Пиццы обиделись на нас</p>
		</div>
	);
};
export default NotFoundPizzas;
