import { useState } from 'react';
import CatalogBtn from './CatalogBtn';
import CatalogModal from './CatalogModal';

const HeaderCatalog = () => {
  const [open_categories, set_open_categorie] = useState(false);
  const [display_categories, set_display_categories] = useState('none');

  return (
    <>
      <CatalogModal
        isOpen={open_categories}
        setOpen={set_open_categorie}
        display={display_categories}
        setDisplay={set_display_categories}
      />
      <CatalogBtn
        isOpen={open_categories}
        setOpen={set_open_categorie}
        setDisplay={set_display_categories}
      />
    </>
  );
};

export default HeaderCatalog;
