import { SORT_BY, CREATE_POST } from '../action-types';


export const sortBy = (sortType) => ({ type: SORT_BY, payload: sortType });

export const createPost = (post) => ({type: CREATE_POST, payload: post});

// todo создать экшн createPost
//  который пример как аргумент post и вернет его в payload
//  тип должен быть CREATE_POST