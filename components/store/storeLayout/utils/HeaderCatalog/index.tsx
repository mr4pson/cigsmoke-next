import { useState } from 'react';
import { PopupDisplay } from '../HeaderCart/constants';
import CatalogBtn from './CatalogBtn';
import CatalogModal from './CatalogModal';

const HeaderCatalog = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);

  return (
    <>
      <CatalogModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        display={display}
        setDisplay={setDisplay}
      />
      <CatalogBtn
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
      />
    </>
  );
};

export default HeaderCatalog;
