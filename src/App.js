import React from 'react';
import './scss/app.scss';

import Header from './ReactComponets/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Home />
			</div>
		</div>
	);
}

export default App;
