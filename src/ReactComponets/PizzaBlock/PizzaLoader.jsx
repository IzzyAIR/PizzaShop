import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaLoader = () => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={460}
		viewBox='0 0 280 460'
		backgroundColor='#f5f5f5'
		foregroundColor='#eaebec'
	>
		<rect x='15' y='270' rx='7' ry='7' width='250' height='27' />
		<circle cx='140' cy='125' r='125' />
		<rect x='0' y='312' rx='7' ry='7' width='280' height='88' />
		<rect x='0' y='425' rx='7' ry='7' width='115' height='27' />
		<rect x='128' y='415' rx='20' ry='20' width='152' height='45' />
	</ContentLoader>
);

export default PizzaLoader;
