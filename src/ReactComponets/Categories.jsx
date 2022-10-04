import React from 'react';

function Categories() {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const [activeIndex, setActiveIndex] = React.useState(0);
	const selectCategory = (indexCat) => {
		setActiveIndex(indexCat);
	};

	return (
		<div className='categories'>
			<ul>
				{categories.map((item, index) => {
					return (
						<li
							onClick={() => selectCategory(index)}
							className={activeIndex === index ? 'active' : ''}
						>
							{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
export default Categories;
