import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId: 0 ,
    currentPage: 1,
    sort: {
		name: 'популярности (б ~ м)',
		sortProperty: 'rating',
	},
}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action){
            state.searchValue = action.payload;
        },
        setCategoryId(state, action){
            state.categoryId = action.payload;
        },
        setSortType(state, action){
            state.sort = action.payload;
        },
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
    }
});
export const selectFilter = (state) => state.filterS;
export const selectFilterById = (id) =>  (state) => state.cartSlice.items.find((obj) => obj.id === id);


export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;