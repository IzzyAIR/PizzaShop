import React from 'react';
import './scss/app.scss';
import PizzaContext from './PizzaContext';

import Header from './ReactComponets/Header';
import Categories from './ReactComponets/Categories';
import Sort from './ReactComponets/Sort';
import PizzaBlock from './ReactComponets/PizzaBlock';



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
							<PizzaBlock title='Чизбургер-пицца' price='35000' imgUrl='' />
							<PizzaBlock title='Сырная' price='35000' imgUrl='' />
							<PizzaBlock title='Креветки по-азиатски' price='35000' imgUrl='' />
							<PizzaBlock title='123' price='35000' imgUrl='' />
							<PizzaBlock title='123' price='35000' imgUrl='' />
							<PizzaBlock title='123' price='35000' imgUrl='' />
							<PizzaBlock title='123' price='35000' imgUrl='' />
							<PizzaBlock title='123' price='35000' imgUrl='' />
						</div>
					</div>
				</div>
			</div>
		</PizzaContext.Provider>
	);
}

export default App;
