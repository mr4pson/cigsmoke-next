import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const getFakeImageUrls = () => {
  return generateArrayOfNumbers(10).reduce(
    (accum: string[], number) => accum.concat(`brand-${number}.png`),
    [],
  );
};

const paginateBrandForward =
  (
    slideTo: number,
    brandsRef: MutableRefObject<any>,
    setWidth: Dispatch<SetStateAction<number>>,
    setSlideTo: Dispatch<SetStateAction<number>>,
  ) =>
    () => {
      setWidth(brandsRef.current.scrollWidth - brandsRef.current.offsetWidth);
      slideTo > -200 ? setSlideTo(0) : setSlideTo(slideTo + 200);
    };

const paginateBrandBack =
  (
    slideTo: number,
    width: number,
    brandsRef: MutableRefObject<any>,
    setWidth: Dispatch<SetStateAction<number>>,
    setSlideTo: Dispatch<SetStateAction<number>>,
  ) =>
    () => {
      setWidth(brandsRef.current.scrollWidth - brandsRef.current.offsetWidth);
      slideTo < -width + 200 ? setSlideTo(-width) : setSlideTo(slideTo - 200);
    };

export {
  getFakeImageUrls,
  paginateBrandForward,
  paginateBrandBack,
};
