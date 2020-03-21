import React, {Component, createRef} from 'react';
import uniqId from 'uniqid';
import {Button} from '../Button/Button';
import './AddUserForm.scss';
import ImgWarning from './../../assets/icon-attention-png-clip-art.png'

const CN = 'user-form';

class AddUserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentError: '',
            inputErrorName: '',
            inputErrorLastName: '',
            errorInputName: '',
            errorInputLastName: ''
        };
    }

    // todo: добавить state, в него добавить пропертю, которая будет отображать есть ли ошибка или нет.
    //  допустим это будет строка currentError
    //  по умолчанию она будет пустой
    //  если произошла ошибка - в эту пропертю запишется строка, какая именно ошибка произошла

    userNameRef = createRef();
    userLastNameRef = createRef();

    onInputChange = (e) => {

        if (e.target.value) {
            this.setState({
                currentError: ''
            })
        }

        if (this.userNameRef.current.value) {
            this.setState({
                inputErrorName: '',
                errorInputName: ''
            })
        }

        if (this.userLastNameRef.current.value) {
            this.setState({
                inputErrorLastName: '',
                errorInputLastName: ''
            })
        }

        // todo: если в стейте была записана какая-то ошибка - зачищаем ее при изменении инпута
        //  поскольку в ситуации если пользователь ничего - не ввел - увидел ошибку - понял, что не так - начал вводить данные
        //  было бы хорошо не пугать его висящим сообщением, что все таки что-то не так
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (this.userNameRef.current.value.trim() === '' && this.userLastNameRef.current.value.trim() === '') {
            this.setState({
                currentError:
                    <div className='warning'>
                        <div>
                            <h2>WARNING!!! WRITE SOMETHING!!!</h2>
                            <img src={ImgWarning} alt="Warning"/>
                        </div>
                    </div>,
            });
        }

        if (!this.userNameRef.current.value.trim()) {

            this.setState({
                inputErrorName: 'second-form-control',
                errorInputName: 'This input is empty! Write something!'

            })
        }

        if (!this.userLastNameRef.current.value.trim()) {

            this.setState({
                inputErrorLastName: 'second-form-control',
                errorInputLastName: 'This input is empty! Write something!'
            })
        }

        // Todo: добавить здесь проверку, если пользователь НЕ ВВЕЛ в инпуты ничего - не создаем пост
        //  и обновляем currentError в стейте, кладем сообщение, что пошло не так
        //  если пользователь ввел данные - создаем постзадачу

        const {addUser} = this.props;

        const user = {
            name: this.userNameRef.current.value,
            lastName: this.userLastNameRef.current.value,
            id: uniqId()
        };

        addUser(user);

        this.userNameRef.current.value = "";
        this.userLastNameRef.current.value = "";
    };

    onReset = () => {

        this.userNameRef.current.value = "";
        this.userLastNameRef.current.value = "";
        // todo: имплементнуть функцию скидывания значений, введеных пользователем
    };

    // onAlternativeSubmit = (event) => {
    //     event.preventDefault();
    //     const {addUser} = this.props;
    //
    //     const formData = new FormData(event.target);
    //     debugger
    //     const user = {
    //         name: formData.get('userName'),
    //         lastName: formData.get('userLastName'),
    //         id: uniqId()
    //     };
    //     addUser(user);
    //
    //     console.log(user)
    // };

    render() {
        return (
            <form className={CN} onSubmit={this.onSubmit}>
                <h2>Create new User</h2>
                <div className="form-group">
                    <label htmlFor="title" className="input-group-text">Enter user name:</label>
                    <input
                        ref={this.userNameRef}
                        className={`form-control ${this.state.inputErrorName}`}
                        type="text"
                        name="userName"
                        onChange={this.onInputChange}
                    />
                    <div className="errorInputs">
                        {this.state.errorInputName}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="input-group-text">Enter user last name:</label>
                    <input
                        ref={this.userLastNameRef}
                        className={`form-control ${this.state.inputErrorLastName}`}
                        type="text"
                        name="userLastName"
                        onChange={this.onInputChange}
                    />
                    <div className="errorInputs">
                        {this.state.errorInputLastName}
                    </div>
                </div>

                {this.state.currentError}

                {/* todo: Добавить здесь <div> сообщение об ошибке, если такая произошла */}
                {/* todo: стилизуйте это сообщение об ошибке, чтоб текст был красным и броским */}
                {/* todo: можете добавить иконку с восклицательным знаком, чтоб привлечь внимание пользователя */}
                {/* todo: под ошибкой имеется ввиду, что пользователь не ввел данные в инпуты и нажал submit */}
                <Button type="submit"
                        className="btn-outline-secondary"
                        label="Add post"
                />

                <Button className="btn-outline-secondary"
                        label="Reset"
                        onClick={this.onReset}
                />
                {/* ToDo: добавить кнопку для скидывания введеных пользователем значений */}
                {/* ToDo: на кнопке должно быть написано Reset */}
                {/* ToDo: в onClick кнопки прокинуть метод класса onReset (объявлен в строке 51) */}

            </form>
        );
    }
}

export default AddUserForm;
