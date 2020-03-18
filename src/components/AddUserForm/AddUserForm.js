import React, { Component, createRef } from 'react';
import uniqId from 'uniqid';
import { Button } from '../Button/Button';
import './AddUserForm.scss';

const CN = 'user-form';
class AddUserForm extends Component {
  constructor(props) {
    super(props);
    // this.userNameRef = createRef();
    // this.userLastNameRef = createRef();
  }

  userNameRef = createRef();
  userLastNameRef = createRef();

  onInputChange = (e) => {
    console.log(e.target.value)
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { addUser } = this.props;

    debugger
    const user = {
      name: this.userNameRef.current.value,
      lastName: this.userLastNameRef.current.value,
      id: uniqId()
    };

    addUser(user);

    this.userNameRef.current.value = "";
    this.userLastNameRef.current.value = "";
  };

  onAlternativeSubmit = (event) => {
    event.preventDefault();
    const { addUser } = this.props;

    const formData = new FormData(event.target);
    debugger
    const user = {
      name: formData.get('userName'),
      lastName: formData.get('userLastName'),
      id: uniqId()
    };
    addUser(user);

    console.log(user)
  };

  render() {
    return (
      <form className={CN} onSubmit={this.onAlternativeSubmit}>
        <h2>Create new User</h2>
        <div className="form-group">
          <label htmlFor="title" className="input-group-text">Enter post title:</label>
          <input
            ref={this.userNameRef}
            className="form-control"
            type="text"
            name="userName"
            onChange={this.onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="input-group-text">Enter post text:</label>
          <input
            ref={this.userLastNameRef}
            className="form-control"
            type="text"
            name="userLastName"
            onChange={this.onInputChange}
          />
        </div>
        <Button type="submit" className="btn-outline-secondary" label="Add post"/>

      </form>
    );
  }
}

export default AddUserForm;
