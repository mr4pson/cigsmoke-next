import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Product } from "swagger/services";

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const getAnimationDelay = (length: number) => {
  let delay = 0.8;
  const passDelay: number[] = [];

  for (let i = 0; i < length; i++) {
    switch (delay) {
      case 0.2:
        delay = 0.4;
        break;
      case 0.4:
        delay = 0.6;
        break;
      case 0.6:
        delay = 0.8;
        break;
      default:
        delay = 0.2;
        break;
    }
    passDelay.push(delay);
  }

  return passDelay;
};

const paginateForward =
  (page: number, setPage: Dispatch<SetStateAction<[number, number]>>) => () => {
    setPage([page + 1, 1]);
  };

const paginateBack =
  (page: number, setPage: Dispatch<SetStateAction<[number, number]>>) => () => {
    setPage([page - 1, -1]);
  };

const handleDragEnd =
  (page: number, swipeConfidenceThreshold: number, setSlideTo: Dispatch<SetStateAction<[number, number]>>) =>
    (e, { offset, velocity }) => {
      const swipe = swipePower(offset.x, velocity.x);
      if (swipe < -swipeConfidenceThreshold) {
        paginateForward(page, setSlideTo)
      } else if (swipe > swipeConfidenceThreshold) {
        paginateBack(page, setSlideTo)
      }
    };

const handleWishBtnClick = (product: Product, setWish: Dispatch<SetStateAction<boolean>>, onWishBtnClick: (product: Product) => void) => () => {
  setWish(prev => !prev);
  onWishBtnClick(product);
}

export { paginateForward, paginateBack, handleDragEnd, getAnimationDelay, handleWishBtnClick };