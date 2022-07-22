import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const paginate =
  (
    newDirection: number,
    slideTo: number,
    width: number,
    flexRef: MutableRefObject<any>,
    setSlideTo: Dispatch<SetStateAction<number>>,
    setWidth: Dispatch<SetStateAction<number>>,
  ) =>
  () => {
    setWidth(flexRef.current.scrollWidth - flexRef.current.offsetWidth);
    if (newDirection > 0) {
      slideTo > -150 ? setSlideTo(0) : setSlideTo(slideTo + 150);
    } else {
      slideTo < -width + 150 ? setSlideTo(-width) : setSlideTo(slideTo - 150);
    }
  };

export { paginate };
