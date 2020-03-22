import React, {Component} from 'react';
import uniqId from 'uniqid';
import './Form.scss';
import {Button} from '../Button/Button';

const CN = 'custom-form';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleInput: '',
            text: '',
            id: uniqId()
        };

    }

    onLabelChange = (event) => {
        const {id} = event.target;

        console.log(event.target.value);

        this.setState({
            [id]: event.target.value
        });
    };

    onReset = () => {
        // todo: имплементнуть функцию скидывания значений, введеных пользователем
        this.setState({ // зануляем значения в стейте, чтоб сбросить формочку
            id: uniqId(),
            titleInput: '',
            text: ''
        });
    };

    onSubmit = () => {
        const {user, addPost} = this.props;

        const newPost = {
            ...this.state,
            data: new Date(),
            mood: 'happy',
            authorName: `${user.name} ${user.lastName}`
        };

        addPost(newPost); // создаем новый пост

        this.setState({ // зануляем значения в стейте, чтоб сбросить формочку
            id: uniqId(),
            titleInput: '',
            text: ''
        });
    };

    render() {
        return (
            <div className={CN}>
                <h2>Create new Post</h2>
                <div className="form-group">
                    <label for="titleInput" className="input-group-text">Enter post title:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="titleInput"
                        onChange={this.onLabelChange}
                        value={this.state.titleInput}
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

                <Button
                    className={`btn-outline-secondary ${!this.state.titleInput.trim() && !this.state.text.trim() && 'myTooltip'}`}
                    onClick={this.onSubmit}
                    label="Add post"
                    isDisable={!this.state.text.trim() && !this.state.titleInput.trim()}
                />

                <Button
                    className={`btn-outline-secondary ${!this.state.titleInput.trim() && !this.state.text.trim() && 'myTooltip'}`}
                    onClick={this.onReset}
                    label="Reset"
                    isDisable={!this.state.text.trim() && !this.state.titleInput.trim()}
                />

                {/* ToDo: добавить кнопку для скидывания введеных пользователем значений */}
                {/* ToDo: на кнопке должно бы'true'ть написано Reset */}
                {/* ToDo: в onClick кнопки прокинуть метод класса onReset (объявлен в строке 29) */}
                {/* ToDo: прокинуть в строке 86 пропсу isDisabled которая равна true если в стейте пустые строки для title и text */}

            </div>
        );
    }
}
