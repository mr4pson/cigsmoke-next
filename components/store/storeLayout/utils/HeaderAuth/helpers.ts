import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from '../HeaderCart/constants';

const handleAfterAuthorized =
  (
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
    setIsOpened: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev === PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    });
  };

export { handleAfterAuthorized };
