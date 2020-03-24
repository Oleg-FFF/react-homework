import React, { Component } from 'react';
import { SortingContext } from '../../context';
import { BtnMenu } from '../../components/BtnMenu/BtnMenu';
import { sortingTypes } from '../../constants';
import { Button } from '../../components/Button/Button';
import { Post } from '../../components/Post/Post';

const CN = 'posts-page';

export class PostsPage extends Component {

  onSelectPost = (id) => {
    const { history, match: {url} } = this.props;

    history.push(`${url}/${id}`)
  };

  renderButton = (label, sortType, onClick, sortCondition) => {
    return (
      <Button
        className={`btn-outline-primary ${sortType === sortCondition ? 'btn-styled' : ''}`}
        label={label}
        onClick={() => {
          onClick(sortCondition);
        }}
      />
    );
  };

  renderSortingPanel = (onSortingChange, sortType) => {
    return (
      <div className="sorting-options d-flex justify-items-center align-items-center">
        <label className="custom-label">Sorting options:</label>
        <BtnMenu
          options={Object.keys(sortingTypes)}
          onSortingChange={onSortingChange}
        />
        {this.renderButton(
          'Sort by author',
          sortType,
          onSortingChange,
          sortingTypes.BY_AUTHOR
        )}
        {this.renderButton(
          'Sort by date',
          sortType,
          onSortingChange,
          sortingTypes.BY_DATE
        )}
      </div>
    );
  };

  render() {
    console.log('Posts props', this.props)
    return (
      <SortingContext.Consumer>
        {sortConfig => {
          const { sortType, onSortingChange, posts, addPost } = sortConfig;

          return (
            <div className={CN}>
              {this.renderSortingPanel(onSortingChange, sortType)}

              <div className="all-posts">
                {
                  posts.map((post) => {
                    return (
                      <Post post={post} key={post.id} onSelect={this.onSelectPost}/>
                    );
                  })
                }
              </div>
            </div>
          );
        }
        }
      </SortingContext.Consumer>
    );
  }
}
