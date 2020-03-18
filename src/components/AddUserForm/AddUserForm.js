import React, { Component, createRef } from 'react';
import uniqId from 'uniqid';
import { Button } from '../Button/Button';
import './AddUserForm.scss';

const CN = 'user-form';
class AddUserForm extends Component {
  constructor(props) {
    super(props);
    // this.userNameRef = createRef(); // аналогично записи в строке 19
    // this.userLastNameRef = createRef();
  }

  // todo: добавить state, в него добавить пропертю, которая будет отображать есть ли ошибка или нет.
  //  допустим это будет строка currentError
  //  по умолчанию она будет пустой
  //  если произошла ошибка - в эту пропертю запишется строка, какая именно ошибка произошла

  userNameRef = createRef();
  userLastNameRef = createRef();

  onInputChange = (e) => {
    console.log(e.target.value)
      // todo: если в стейте была записана какая-то ошибка - зачищаем ее при изменении инпута
      //  поскольку в ситуации если пользователь ничего - не ввел - увидел ошибку - понял, что не так - начал вводить данные
      //  было бы хорошо не пугать его висящим сообщением, что все таки что-то не так
  };

  onSubmit = (e) => {
    e.preventDefault();

    // Todo: добавить здесь проверку, если пользователь НЕ ВВЕЛ в инпуты ничего - не создаем пост
    //  и обновляем currentError в стейте, кладем сообщение, что пошло не так
    //  если пользователь ввел данные - создаем пост

    const { addUser } = this.props;

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
      <form className={CN} onSubmit={this.onSubmit}>
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
        {/* todo: Добавить здесь <div> сообщение об ошибке, если такая произошла */}
        {/* todo: стилизуйте это сообщение об ошибке, чтоб текст был красным и броским */}
        {/* todo: можете добавить иконку с восклицательным знаком, чтоб привлечь внимание пользователя */}
        {/* todo: под ошибкой имеется ввиду, что пользователь не ввел данные в инпуты и нажал submit */}
        <Button type="submit" className="btn-outline-secondary" label="Add post" />
      </form>
    );
  }
}

export default AddUserForm;
