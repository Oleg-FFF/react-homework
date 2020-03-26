import cloneDeep from 'lodash/cloneDeep';
import { allPosts, sortingTypes } from '../constants';
import { SORT_BY } from '../action-types';

const initialState = {
  sortType: sortingTypes.BY_DEFAULT,
  posts: allPosts
};

export const postsReducer = (state = initialState, action) => {
  const { currentCounter } = state;

  switch (action.type) {
    case SORT_BY: {
      const { payload: sortType } = action;

      let newArray = cloneDeep(state.posts);
      debugger
      switch (sortType) {
        case sortingTypes.BY_DATE:
          newArray = sortByDate(newArray);
          break;
        case sortingTypes.BY_AUTHOR:
          newArray = sortByAuthor(newArray);
          break;
        default: break;
      }
      return {
        sortType,
        posts: newArray
      };
    }
    default:
      return state
  }
};

const sortByAuthor = (array) => {
  const result = [...array].sort(function (a, b) {
    if (a.authorName > b.authorName) {
      return 1;
    }
    if (a.authorName < b.authorName) {
      return -1;
    }
    return 0;
  });
  return result;
};

const sortByDate = (array) => {
  const result = [...array].sort((a, b) => new Date(a.data) - new Date(b.data));
  return result;
};