import { useEffect, useState, useRef } from 'react';

const MagnifieHelper = () => {
  const imgRef = useRef<any>();
  const lensRef = useRef<any>();
  const [magnifiedImage, setMagnifiedImage]: [any, any] = useState(0);
  useEffect(() => {
    const img = imgRef.current;
    const lens = lensRef.current;
    lens.style.backgroundImage = `url(/static/backpack.jpg)`; //TODO add magnified image state here for dynamic variables
    let zoomLevel = 2;

    lens.style.backgroundSize = `${img.width * zoomLevel}px ${
      img.height * zoomLevel
    }px`;

    const moveLens = () => {
      let pos = getCursor();

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

    const getCursor = () => {
      let e: any = window.event;
      let bounds = img.getBoundingClientRect();

      let x = e.pageX - bounds.left;
      let y = e.pageY - bounds.top;

      return { x: x - window.pageXOffset, y: y - window.pageYOffset };
    };

    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);
    return () => {
      img.removeEventListener('mousemove', moveLens);
      lens.removeEventListener('mousemove', moveLens);
    };
  }, [magnifiedImage]);

  return [imgRef, lensRef, setMagnifiedImage];
};

export { MagnifieHelper };
