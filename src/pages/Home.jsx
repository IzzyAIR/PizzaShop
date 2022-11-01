import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../Redux/Slice/filterSlice';

//Компоненты
import Categories from '../ReactComponets/Categories';
import Sort from '../ReactComponets/Sort';
import Pagination from '../ReactComponets/Pagination';
import { sortType } from '../ReactComponets/Sort';

//Компоненты для пицца блоков
import PizzaItem from '../ReactComponets/PizzaBlock/PizzaItem';
import PizzaLoader from '../ReactComponets/PizzaBlock/PizzaLoader';
import { AppContext } from '../App';

function Home() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Сортировка, категори логика на Redux
	const { categoryId, sort, currentPage } = useSelector((state) => state.filterS);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	//Поиск, пицца блоки и состояние загрузки
	const { searchVal } = React.useContext(AppContext);
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const isSearch = React.useRef(false);

	const fetchPizzas = () => {
		setIsLoading(true);
		//Сортировка, категори для отправки в бэк
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `&category=${categoryId}` : '';

		axios
			.get(
				`https://633af5e2e02b9b64c61bef81.mockapi.io/PizzaBlock?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`,
			)
			.then((response) => {
				setPizzaItems(response.data);
				setIsLoading(false);
			});
	};

	//Сохранение параметров фильтрации в URL
	const isMouted = React.useRef(false);

	React.useEffect(() => {
		if (isMouted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMouted.current = true;
	}, [categoryId, sort.sortProperty, sort.sortProperty]);

	// Отправления параметров URL в Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sortType.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	//Отправка и получение параметров URL с Бэка
	React.useEffect(() => {
		window.scroll(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchVal, currentPage]);

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
	console.log('от бэка', pizzaItems);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skelleton : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}
export default Home;
