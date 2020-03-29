import React from "react";
import "./Button.scss";

const CN = "my-btn";
export const Button = props => {
  const {
    id,
    data_tip,
    type = "button", // дефолтное значение = 'button'
    onClick,
    label = "Click me", // дефолтное значение = "Click me"
    className = "btn-primary",
    isDisabled = false,
  } = props;


  const onClickHandler = e => {
    onClick && onClick(e); // такая конструкция нужна, чтоб, если onClick в пропсах не прийдет, тут не выпала ошибка
  };

  return (

      <button
          className={isDisabled ? `${CN} btn add-margin ${className} disabled`: `${CN} btn add-margin ${className}`}
          id={id}
          onClick={onClickHandler}
          type={type}
          disabled={isDisabled}
          data-tip={data_tip}
      >
        {label}
      </button>
  );
};
