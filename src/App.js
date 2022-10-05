import React from 'react';
import './scss/app.scss';
import PizzaContext from './assets/PizzaContext';

import Header from './ReactComponets/Header';
import Categories from './ReactComponets/Categories';
import Sort from './ReactComponets/Sort';
import PizzaBlock from './ReactComponets/PizzaBlock';
import pizzas from './assets/Pizza.json';

function App() {
	return (
		<PizzaContext.Provider>
			<div className='wrapper'>
				<Header />
				<div className='content'>
					<div className='container'>
						<div className='content__top'>
							<Categories />
							<Sort />
						</div>
						<h2 className='content__title'>Все пиццы</h2>
						<div className='content__items'>
							{pizzas.map((obj) => (
								<PizzaBlock key={obj.id} {...obj} />
							))}
						</div>
					</div>
				</div>
			</div>
		</PizzaContext.Provider>
	);
}

export default App;
