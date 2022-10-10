import React from 'react';
import Categories from '../ReactComponets/Categories';
import Sort from '../ReactComponets/Sort';
import Pagination from '../ReactComponets/Pagination';

import PizzaItem from '../ReactComponets/PizzaBlock/PizzaItem';
import PizzaLoader from '../ReactComponets/PizzaBlock/PizzaLoader';
import { AppContext } from '../App';

function Home() {
	const { searchVal } = React.useContext(AppContext);

	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'популярности (б ~ м)',
		sortProperty: 'rating',
	});

	//Сортировка, категори для отправки в бэк
	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
	const sortBy = sortType.sortProperty.replace('-', '');
	const category = categoryId > 0 ? `&category=${categoryId}` : '';

	React.useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://633af5e2e02b9b64c61bef81.mockapi.io/PizzaBlock?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`,
		)
			.then((resp) => resp.json())
			.then((jsonItems) => {
				setPizzaItems(jsonItems);
				setIsLoading(false);
			});
		window.scroll(0, 0);
	}, [categoryId, sortType, searchVal, currentPage]);

	//Список пицц и загрузка
	const skelleton = [...new Array(6)].map((_, i) => <PizzaLoader key={i} />);
	const pizzas = pizzaItems
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchVal.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((obj) => <PizzaItem key={obj.id} {...obj} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
				<Sort value={sortType} onChangeSortType={(i) => setSortType(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skelleton : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
}
export default Home;
