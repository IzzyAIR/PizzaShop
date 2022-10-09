import React from 'react';
import Categories from '../ReactComponets/Categories';
import Sort from '../ReactComponets/Sort';

import PizzaItem from '../ReactComponets/PizzaBlock/PizzaItem';
import PizzaLoader from '../ReactComponets/PizzaBlock/PizzaLoader';

function Home() {
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch('https://633af5e2e02b9b64c61bef81.mockapi.io/PizzaBlock')
			.then((resp) => resp.json())
			.then((jsonItems) => {
				setPizzaItems(jsonItems);
				setIsLoading(false);
			});
		window.scroll(0, 0);
	}, []);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, i) => <PizzaLoader key={i} />)
					: pizzaItems.map((obj) => <PizzaItem key={obj.id} {...obj} />)}
			</div>
		</div>
	);
}
export default Home;
