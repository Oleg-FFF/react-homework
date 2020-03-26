import cloneDeep from 'lodash/cloneDeep';
import { allPosts, sortingTypes } from '../constants';
import { SORT_BY } from '../action-types';

const initialState = {
  sortType: sortingTypes.BY_DEFAULT,
  posts: allPosts
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY: {
      const { payload: sortType } = action;
      let newArray = [];
      const copy = cloneDeep(state.posts);

      debugger
      switch (sortType) {
        case sortingTypes.BY_DATE:
          newArray = sortByDate(copy);
          break;
        case sortingTypes.BY_AUTHOR:
          newArray = sortByAuthor(copy);
          break;
        default:
          newArray = initialState.posts;
          break;
      }

      return {
        sortType,
        posts: newArray
      };
    }
    default:
      return state;
  }
};

const sortByAuthor = (array) => {
 return array.sort(function (a, b) {
    if (a.authorName > b.authorName) {
      return 1;
    }
    if (a.authorName < b.authorName) {
      return -1;
    }
    return 0;
  });
};

const sortByDate = (array) => {
  return array.sort((a, b) => new Date(a.data) - new Date(b.data));
};