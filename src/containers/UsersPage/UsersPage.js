import React, { Component } from 'react';
import queryString from 'query-string';
import './UsersPage.scss';

// константы, как правило, пишут большими буквами с нижним подчеркиванием
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PER_PAGE = 6;
const BIGGER_PER_PAGE = 12;

const CN = 'users-page';

export class UsersPage extends Component {
  state = {
    usersList: [],
    isLoading: false,
    perPage: 6,
    pageNum: 1,
    totalPagesNum: 1,
    totalResults: 0
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    // parse search query here
    // todo эту логику по парсингу квери можно делать в конструкторе. попробуйте вынести ее
    const params = queryString.parse(search);
    const { page, per_page } = params;

    // смотрим, если в квере из урлы есть параметры, то используем их, если нет - дефолтные
    this.setState({
      pageNum: page ? page : DEFAULT_PAGE_NUM,
      perPage: per_page ? per_page : DEFAULT_PER_PAGE
    }, this.loadUsers);
    // или
    // this.loadUsers(); // тут при загрузке возьмутся параметры из стейта
  }

  loadUsers = () => {
    this.setState({
      isLoading: true
    });
    const { perPage, pageNum } = this.state;

    fetch(`https://reqres.in/api/users?page=${pageNum}&per_page=${perPage}`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(({ data, total_pages, page, total }) => {
        this.setState({
          usersList: data,
          isLoading: false,
          totalPagesNum: total_pages,
          pageNum: page,
          totalResults: total
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error
        });
      });
  };

  setLowerPerPage = () => {
    const { history } = this.props;
    const { pageNum } = this.state;

    this.setState({
      perPage: DEFAULT_PER_PAGE
    }, this.loadUsers);

    this.updateUrl(pageNum, DEFAULT_PER_PAGE);
  };

  setHigherPerPage = () => {
    const { history } = this.props;

    this.setState({
      perPage: BIGGER_PER_PAGE,
      pageNum: DEFAULT_PAGE_NUM
    }, this.loadUsers);

    this.updateUrl(DEFAULT_PAGE_NUM, BIGGER_PER_PAGE);
  };

  updateUrl = (page, per_page) => {
    // апдейт урлы в адресной строке, меняем query search
    const { history } = this.props;
    const newParams = {
      page,
      per_page
    };
    history.replace({ search: queryString.stringify(newParams) });
  };

  setPage = (pageNum) => {
    const { perPage } = this.state;

    return () => {
      this.setState({
        pageNum
      }, this.loadUsers);
      this.updateUrl(pageNum, perPage);
    };
  };

  render() {
    const { isLoading, usersList, totalPagesNum, pageNum } = this.state;
    return (
      <div className={`${CN}  m-4`}>

        <div className={`pagination ${isLoading ? 'disabled' : '' }`}>
          <div className="d-flex justify-items-center align-items-center">
            <div>Total pages: {totalPagesNum}</div>
            <div className="d-flex pages">
              {
                (new Array(totalPagesNum)).fill(1).map((item, index) => (
                  <div key={index} className={`pagination-item ${index + 1 === pageNum ? 'active' : ''}`}
                       onClick={this.setPage(index + 1)}>{index + 1}</div>
                ))
              }
            </div>
            <button onClick={this.setLowerPerPage} className="btn-outline-info m-1">by 6</button>
            <button onClick={this.setHigherPerPage}  className="btn-outline-info m-1">by 12</button>
          </div>
        </div>

        {isLoading && <div>Loading...</div>}

        {
          !isLoading && !usersList.length && (
            <div>No user founds</div>
          )
        }

        {
          !isLoading && !!usersList.length && (
            <div className="content">
              {
                usersList.map(user => (
                  <div key={user.id}>{user.first_name} {user.last_name}</div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}
