import React from 'react';
import qs from 'qs';

//Redux компоненты
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../Redux/Slice/filterSlice';
import { fetchPizza, selectPizzaData } from '../Redux/Slice/pizzaSlice';

//Компоненты
import NotFoundPizzas from '../ReactComponets/NotFoundBlock/NotFoundPizzas';
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
	const { items, status } = useSelector(selectPizzaData);

	//Сортировка, категори логика из Redux
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	//Поиск

	const isSearch = React.useRef(false);

	//Сортировка и категори для отправки в бэк
	const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
	const sortBy = sort.sortProperty.replace('-', '');
	const category = categoryId > 0 ? `&category=${categoryId}` : '';

	const getPizzas = async () => {
		dispatch(
			fetchPizza({
				order,
				sortBy,
				category,
				currentPage,
			}),
		);
	};

	//Получение обработанных данных с Redux pizzaSlice
	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

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

	// Получение обработанных данных с Redux filterSlice
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

	//Список пицц и загрузка
	const skelleton = [...new Array(6)].map((_, i) => <PizzaLoader key={i} />);
	const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((obj) => <PizzaItem key={obj.id} {...obj} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<NotFoundPizzas />
			) : (
				<div className='content__items'>{status === 'loading' ? skelleton : pizzas}</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}
export default Home;
