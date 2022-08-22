import { useState, useCallback, useEffect } from 'react';
import { PopupDisplay } from '../../constants';
import CatalogBtn from './CatalogBtn';
import CatalogModal from './CatalogModal';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
const HeaderCatalog = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );
  return (
    <>
      <CatalogModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        display={display}
        setDisplay={setDisplay}
        menuNode={menuNode}
      />
      <CatalogBtn
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
        btnNode={btnNode}
      />
    </>
  );
};

export default HeaderCatalog;
