import React, { Component } from 'react';
import uniqId from 'uniqid';
import './Form.scss';
import { Button } from '../Button/Button';
import ReactTooltip from 'react-tooltip';

const CN = 'custom-form';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      id: uniqId(),
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.post.id !== prevState.id) {
  //     return {
  //       id: nextProps.post.id,
  //       text: nextProps.post.text,
  //       title: nextProps.post.title
  //     };
  //   }
  //   return null;
  // }

  onReset = () => {
    this.setState({
      title: '',
      text: ''
    })
  };

  onLabelChange = e => {
    const { id } = e.target;
    this.setState({
      [id]: e.target.value
    });
  };

  onSubmit = () => {
    const { user, createPost } = this.props;
    const newPost = {
      ...this.state,
      data: new Date(),
      mood: 'happy',
      id: uniqId(),
      authorName: `${user.name} ${user.lastName}`
    };

    createPost(newPost); // создаем новый пост

    this.setState({ // зануляем значения в стейте, чтоб сбросить формочку
      id: uniqId(),
      title: '',
      text: ''
    });
  };

  render() {
    const attention = this.state.title.trim() === "" || this.state.text.trim() === "";
    console.log(attention);
    return (
        <div className={CN}>
          <h2>Create new Post</h2>
          <div className="form-group">
            <label for="title" className="input-group-text">Enter post title:</label>
            <input
                className="form-control"
                type="text"
                id="title"
                onChange={this.onLabelChange}
                value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label for="text" className="input-group-text">Enter post text:</label>
            <input
                className="form-control"
                name="text-input"
                type="text"
                id="text"
                onChange={this.onLabelChange}
                value={this.state.text}
            />
          </div>
          {attention && <ReactTooltip/>}
          <Button className="btn-outline-secondary" data_tip="Enter all inputs!" isDisabled={attention} onClick={this.onSubmit} label="Add post"/>
          <Button className="btn-outline-secondary" isDisabled={false} onClick={this.onReset} label="Reset"/>
        </div>
    );
  }
}

