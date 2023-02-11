import { useState } from 'react';

export function useCheckboxSet() {
  const [selected, setSelected] = useState<number[]>(() => []);

  const saveToLocalStorage = (selectionSet: number[]) =>
    window.localStorage.setItem('userSettings', JSON.stringify(selectionSet));

  const addItem = (item: number) =>
    setSelected((previousSelected: number[]) => {
      const next = [...previousSelected, item];
      saveToLocalStorage(next);
      return next;
    });

  const removeItem = (item: number) => {
    // setSelected(selected.filter((i) => i !== item));
    setSelected((previousSelected): number[] => {
      const next = previousSelected.filter((i) => i !== item);
      saveToLocalStorage(next);
      return next;
    });
    saveToLocalStorage(selected);
  };

  const updateSelected = (newSelectionSet: number[]) => {
    setSelected(() => {
      saveToLocalStorage(newSelectionSet);
      return newSelectionSet;
    });
  };

  return { selected, addItem, removeItem, updateSelected };
}
