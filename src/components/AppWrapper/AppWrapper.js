import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {
  AppConfigContext,
  SortingContext,
  ThemeContext,
  UserContext
} from '../../context';
import Header from '../../components/Header/Header';
import App from '../../App';
import { PostsPage } from '../../containers/PostsPage/PostsPage';
import { allLinks, allPosts, sortingTypes, user } from '../../constants';
import { PostDetailsPage } from '../../containers/PostDetailsPage/PostDetailsPage';
import NotFound from '../../containers/NotFound/NotFound';
import { UsersPage } from '../../containers/UsersPage/UsersPage';

export function AppWrapper(props) {
  const [sortType, setSortType] = useState(sortingTypes.BY_DEFAULT);
  const [userRole, setUserRole] = useState(user.role);
  const [posts, setPosts] = useState(allPosts);

  const toggleUserRole = () => {
    setUserRole(userRole === 'admin' ? 'user' : 'admin');
  };

  const addPost = newPost => {
    setPosts([...posts, newPost]);
  };

  const onSortingChange = value => {
    setSortType(value);
    switch (value) {
      case sortingTypes.BY_DATE:
        sortByDate();
        break;
      case sortingTypes.BY_AUTHOR:
        sortByAuthor();
        break;
      default:
        setPosts([...allPosts]);
    }
  };

  const sortByAuthor = () => {
    const sorted = [...posts].sort(function (a, b) {
      if (a.authorName > b.authorName) {
        return 1;
      }
      if (a.authorName < b.authorName) {
        return -1;
      }
      return 0;
    });
    setPosts([...sorted]); // вызываем хук изменения для posts. это вызывает перерендер
  };

  const sortByDate = () => {
    const sorted = posts.sort((a, b) => new Date(a.data) - new Date(b.data));

    setPosts([...sorted]); // вызываем хук изменения для posts. это вызывает перерендер
  };

  return (
    <AppConfigContext.Provider value={allLinks}>
      <UserContext.Provider
        value={{
          user: {
            ...user,
            role: userRole
          },
          toggleUserRole
        }}
      >
        <ThemeContext.Provider value={'light'}>
          <SortingContext.Provider
            value={{
              sortType,
              onSortingChange,
              posts,
              addPost
            }}
          >
            <Router>
              <Header/>

              <Switch>
                <Route exact path="/">
                  <App/>
                </Route>
                <Route exact path="/home">
                  <App/>
                </Route>

                {/* чтоб иметь доступ к history, match, location PostPage обвернут в withRouter */}
                <Route exact path="/posts" component={PostsPage}/>
                {/* прокидываются history, match, location  автоматом в пропсы*/}
                <Route exact path="/users" component={UsersPage}/>

                {/* в props лежат history, match, location */}
                <Route path="/posts/:id" render={(props) => <PostDetailsPage {...props}/>} />

                <Route path="*" component={NotFound}/>
              </Switch>

            </Router>
          </SortingContext.Provider>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </AppConfigContext.Provider>
  );
}
