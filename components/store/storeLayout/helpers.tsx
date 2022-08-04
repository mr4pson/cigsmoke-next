import { useState, useRef, useEffect } from 'react';

const paginateHandler = () => {
  const widthOrHeightRef = useRef<any>();

  const [refType, setRefType]: [any, any] = useState('width');
  const [widthOrHeight, setWidthOrHeight] = useState(0);
  const [slideTo, setSlideTo] = useState(0);
  const [slideAmount, setSlideAmount] = useState(0);
  useEffect(() => {
    refType == 'width'
      ? setWidthOrHeight(
          widthOrHeightRef.current.scrollWidth -
            widthOrHeightRef.current.offsetWidth,
        )
      : setWidthOrHeight(
          widthOrHeightRef.current.scrollHeight -
            widthOrHeightRef.current.offsetHeight,
        );
  }, [refType]);

  const paginate = (direction: number) => {
    if (direction > 0) {
      slideTo > -slideAmount
        ? setSlideTo(0)
        : setSlideTo(slideTo + slideAmount);
    } else {
      slideTo < -widthOrHeight + slideAmount
        ? setSlideTo(-widthOrHeight)
        : setSlideTo(slideTo - slideAmount);
    }
  };

  return [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ];
};

const UseImagePaginat = () => {
  const [[page, direction], setPage]: [[number, number], any] = useState([
    0, 0,
  ]);

  const paginateImage = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return [page, direction, setPage, paginateImage];
};

const outsideClickListner = (
  listening: any,
  setListening: any,
  menuRef: any,
  btnRef: any,
  setIsOpen: any,
  setDisplay: any,
) => {
  return () => {
    if (listening) return;
    if (!menuRef || !btnRef) return;

    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (menuRef.contains(node) || btnRef.contains(node)) return;
        setIsOpen(false);
        setTimeout(() => setDisplay('none'), 150);
      });
    });
  };
};

export { paginateHandler, UseImagePaginat, outsideClickListner };