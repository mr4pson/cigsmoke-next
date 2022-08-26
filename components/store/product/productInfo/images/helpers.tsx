import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';

const getCursor = (img) => {
  const e: any = window.event;
  const bounds = img.getBoundingClientRect();
  const x = e.pageX - bounds.left;
  const y = e.pageY - bounds.top;

  return { x: x - window.pageXOffset, y: y - window.pageYOffset };
};

const moveLens = (img, lens, zoomLevel: number) => () => {
  const pos = getCursor(img);
  let positionLeft = pos.x - lens.offsetWidth / 2;
  let positionTop = pos.y - lens.offsetHeight / 2;

  if (positionLeft < 0) {
    positionLeft = 0;
  }

  if (positionTop < 0) {
    positionTop = 0;
  }

  if (positionLeft > img.width - lens.offsetWidth / 3) {
    positionLeft = img.width - lens.offsetWidth / 3;
  }

  if (positionTop > img.height - lens.offsetHeight / 3) {
    positionTop = img.height - lens.offsetHeight / 3;
  }

  lens.style.left = `${positionLeft}px`;
  lens.style.top = `${positionTop}px`;

  lens.style.backgroundPosition = `-${pos.x * zoomLevel}px -${
    pos.y * zoomLevel
  }px`;
};

const MagnifieHelper = (image: string) => {
  const imgRef = useRef<any>();
  const lensRef = useRef<any>();
  const [magnifiedImage, setMagnifiedImage]: [any, any] = useState(0);

  useEffect(() => {
    const img = imgRef.current;

    if (!img) {
      return;
    }

    const lens = lensRef.current;

    lens.style.backgroundImage = `url(/api/images/${image})`;

    const zoomLevel = 1.5;

    lens.style.backgroundSize = `${img.width * zoomLevel}px ${
      img.height * zoomLevel
    }px`;

    img.addEventListener('mousemove', moveLens(img, lens, zoomLevel));
    lens.addEventListener('mousemove', moveLens(img, lens, zoomLevel));

    return () => {
      img.removeEventListener('mousemove', moveLens(img, lens, zoomLevel));
      lens.removeEventListener('mousemove', moveLens(img, lens, zoomLevel));
    };
  }, [magnifiedImage]);

  return [imgRef, lensRef, setMagnifiedImage];
};

const handlePaginate =
  (
    index: number,
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    paginateImage: Dispatch<SetStateAction<number>>,
  ) =>
  () => {
    setSelectedIndex(index);
    if (index != selectedIndex) {
      paginateImage(selectedIndex > index ? -1 : 1);
    }
  };

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const handleDragEnd =
  (
    paginateTo: any,
    swipeConfidenceThreshold: number,
    dragConstrain: any,
    setSelectedIndex,
    selectedIndex,
  ) =>
  (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginateTo(1);
      setSelectedIndex(
        selectedIndex < dragConstrain ? selectedIndex + 1 : selectedIndex,
      );
    } else if (swipe > swipeConfidenceThreshold) {
      paginateTo(-1);
      setSelectedIndex(selectedIndex >= 1 ? selectedIndex - 1 : selectedIndex);
    }
  };

export { MagnifieHelper, handlePaginate, handleDragEnd };
