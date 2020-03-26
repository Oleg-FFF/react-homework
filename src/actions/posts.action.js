import { SORT_BY } from '../action-types';


export const sortBy = (sortType) => ({ type: SORT_BY, payload: sortType });