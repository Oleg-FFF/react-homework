import React, { Component, useState } from 'react';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { Post } from '../../components/Post/Post';
import { SortingContext } from '../../context';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import './PostDetailsPage.scss';

const CN = 'post-page';
export const PostPageComponent = (props) => {
  const { match: { id }, history } = props;

  // чтоб доступится к id и history, если не использовать withRouter то можно юзнуть хуки, поскольку это функциональная компонента
  // let { id } = useParams();
  // let history = useHistory();

  // пример использования объекта history
  const goBack = () => {
    history.goBack();
  };

  return (
    <SortingContext.Consumer>
      {sortConfig => {
        const { posts } = sortConfig;

        const post = posts.find(item => item.id === id);

        return (
          <div className={CN}>
            <div className='back-btn' onClick={goBack}>{'<'} Back</div>

            <Post post={post}/>

            {post && <Post post={post}/>}
            {!post && <div> No post found For current id {id}</div>}
          </div>
        );
      }
      }
    </SortingContext.Consumer>
  );
};


export const PostDetailsPage = withRouter(PostPageComponent);