import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortBy } from '../../actions/posts.action';
import AppComponent from './App';

const mapStateToProps = (state) => {
  debugger
  const { counter, posts } = state;
  return {
    counter,
    postsConfig: posts
  };
};

const mapDispatchToProps = (dispatch) => {
  debugger
  return {
    actions: {
      sortBy: (sortType) => dispatch(sortBy(sortType)),
    }
  };
};

export const App = connect(mapStateToProps)(AppComponent);