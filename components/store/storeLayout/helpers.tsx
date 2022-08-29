import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from './constants';
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
  });

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
  setIsOpened: Dispatch<SetStateAction<boolean>>,
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
) => {
  return () => {
    if (listening) return;
    if (!menuRef || !btnRef) return;

    setListening(true);

    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const node = evt.target;
        if (menuRef.contains(node) || btnRef.contains(node)) return;
        setIsOpened(false);
        setTimeout(() => setDisplay(PopupDisplay.None), 150);
      });
    });
  };
};

const handleMenuState =
  (
    setIsOpened: Dispatch<SetStateAction<boolean>>,
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
  ) =>
  () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev == PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    }, 150);
  };

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const handleDragEnd =
  (paginateTo: any, swipeConfidenceThreshold: number) =>
  (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginateTo(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginateTo(-1);
    }
  };

const overrideDefaultIOSZoom = () => {
  const addMaximumScaleToMetaViewport = () => {
    const el = document.querySelector('meta[name=viewport]');

    if (el !== null) {
      let content: any = el.getAttribute('content');
      let re = /maximum\-scale=[0-9\.]+/g;

      if (re.test(content)) {
        content = content.replace(re, 'maximum-scale=1.0');
      } else {
        content = [content, 'maximum-scale=1.0'].join(', ');
      }

      el.setAttribute('content', content);
    }
  };

  const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

  const checkIsIOS = () => {
    var iosQuirkPresent = function () {
      var audio = new Audio();

      audio.volume = 0.5;
      return audio.volume === 1; // volume cannot be changed from "1" on iOS 12 and below
    };

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var isAppleDevice = navigator.userAgent.includes('Macintosh');
    var isTouchScreen = navigator.maxTouchPoints >= 1; // true for iOS 13 (and hopefully beyond)

    return isIOS || (isAppleDevice && (isTouchScreen || iosQuirkPresent()));
  };

  if (checkIsIOS()) {
    disableIosTextFieldZoom();
  }
};

export {
  paginateHandler,
  UseImagePaginat,
  outsideClickListner,
  handleDragEnd,
  handleMenuState,
  overrideDefaultIOSZoom,
};
