import React from 'react';
import styles from './index.module.scss';
import { AppContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
	const [value, setValue] = React.useState('');
	const { setSearchVal } = React.useContext(AppContext);

	const inputRef = React.useRef();
	const onClickClear = () => {
		setSearchVal('');
		setValue('');
		inputRef.current.focus();
	};

	const updateSearchVal = React.useCallback(
		debounce((str) => {
			setSearchVal(str);
		}, 500),
		[],
	);
	const onChangeSearch = (event) => {
		setValue(event.target.value);
		updateSearchVal(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground='new 0 0 32 32'
				id='Glyph'
				version='1.1'
				viewBox='0 0 32 32'
			>
				<path
					d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
					id='XMLID_223_'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				className={styles.input}
				placeholder='Найди свою пиццу...'
				onChange={onChangeSearch}
			/>
			{value && (
				<svg
					className={styles.clear}
					onClick={onClickClear}
					fill='none'
					height='20'
					viewBox='0 0 20 20'
					width='20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						clipRule='evenodd'
						d='M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z'
						fill='#4A5568'
						fillRule='evenodd'
					/>
				</svg>
			)}
		</div>
	);
};
export default Search;
