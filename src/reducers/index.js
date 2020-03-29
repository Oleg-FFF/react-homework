import { combineReducers } from 'redux';
import { counterReducer } from './counter.reducer';
import { postsReducer } from './posts.reducer';

export default () => {
  return combineReducers({
    counter: counterReducer,
    posts: postsReducer,
  });
}