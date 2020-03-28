import React from 'react';
  // Task 1
//    todo: создать здесь функциональную компоненту SortingOptionsPanel
//     она должна возвращать JSX из файла App.js строки 74-92
//     сделать импорт константы sortingTypes
//     сделать импорт компоненты BtnMenu
//     сделать импорт SortingContext
//     обвернуть возвращаемый JSX в SortingContext.Consumer таким образом что будут доступны данные из контекста
//     const { sortType, onSortingChange, posts, addPost } = sortConfig; по аналогии с App.js строка 59
//     перенести функцию renderButton в эту компоненту

// Task 3
//   todo: достать из SortingContext переменную sortType и передать ее как props под названием selectedSortType в компоненту BtnMenu

export const SortingOptionsPanel = () => {
  return (
    <div>
      Sorting panel must be here
    </div>
  );
};