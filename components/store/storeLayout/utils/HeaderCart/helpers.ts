import { Dispatch, SetStateAction } from 'react';
import { Product } from 'swagger/services';
import { PopupDisplay } from './constants';

const decreaseCounter =
  (
    product: Product,
    setItemCounter: Dispatch<SetStateAction<number>>,
    onDecrease: (counter: number, product: Product) => void,
  ) =>
  () => {
    setItemCounter((prev) => {
      const itemCounter = prev < 2 ? 1 : prev - 1;
      onDecrease(itemCounter, product);

      return itemCounter;
    });
  };

const increaseCounter =
  (
    product: Product,
    setItemCounter: Dispatch<SetStateAction<number>>,
    onIncrease: (counter: number, product: Product) => void,
  ) =>
  () => {
    setItemCounter((prev) => {
      const itemCounter = prev + 1;
      onIncrease(itemCounter, product);

      return itemCounter;
    });
  };

const handleClickOutside =
  (
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        setDisplay(PopupDisplay.None);
      }, 100);
    }
  };

const handleCartBtnClick =
  (
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  (e) => {
    e.stopPropagation();
    setIsOpen((prev) => {
      setTimeout(() => {
        setDisplay(prev ? PopupDisplay.None : PopupDisplay.Flex);
      }, 100);
      return !prev;
    });
  };

export {
  decreaseCounter,
  increaseCounter,
  handleCartBtnClick,
  handleClickOutside,
};
