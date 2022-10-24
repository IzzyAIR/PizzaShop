import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../Redux/Slice/filterSlice';
//Компоненты
import Categories from '../ReactComponets/Categories';
import Sort from '../ReactComponets/Sort';
import Pagination from '../ReactComponets/Pagination';
//Компоненты для пицца блоков
import PizzaItem from '../ReactComponets/PizzaBlock/PizzaItem';
import PizzaLoader from '../ReactComponets/PizzaBlock/PizzaLoader';
import { AppContext } from '../App';

function Home() {
	//Сортировка, категори логика на Redux
	const { categoryId, sort, currentPage } = useSelector((state) => state.filterS);

	const dispatch = useDispatch();
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	//Сортировка, категори для отправки в бэк
	const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
	const sortBy = sort.sortProperty.replace('-', '');
	const category = categoryId > 0 ? `&category=${categoryId}` : '';
	//Поиск, пицца блоки и состояние загрузки
	const { searchVal } = React.useContext(AppContext);
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setIsLoading(true);
		axios
			.get(
				`https://633af5e2e02b9b64c61bef81.mockapi.io/PizzaBlock?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}`,
			)
			.then((response) => {
				setPizzaItems(response.data);
				setIsLoading(false);
			});

		window.scroll(0, 0);
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
