import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PopupDisplay } from '../HeaderCart/constants';
import { Path } from '../paths';

type Props = {
  isOpen: boolean;
  setOpen: any;
  setDisplay: any;
};

const handleClick = (setOpen, setDisplay) => () => {
  setOpen((prev) => !prev);
  setTimeout(() => {
    setDisplay((prev) =>
      prev == PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
    );
  }, 150);
};

const CategoryBtn: React.FC<Props> = ({ isOpen, setOpen, setDisplay }) => {
  return (
    <BtnSvg
      id="category-btn"
      onClick={handleClick(setOpen, setDisplay)}
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
    >
      <svg width="21" height="15" viewBox="0 0 21 15">
        <Path
          d="M0.903992 1H2.19894M0.903992 7.40294H2.19894M0.903992 13.8059H2.19894"
          stroke="white"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          d="M5.5 1L20.5 1"
          stroke="white"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: isOpen ? 45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: isOpen ? -45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 13.8059L12.75 13.8059"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </svg>
      <span style={{ color: `${color.textPrimary}`, fontSize: '1rem' }}>
        Каталог
      </span>
    </BtnSvg>
  );
};

const BtnSvg = styled(motion.button)`
  width: 130px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: ${color.btnPrimary};
  border: none;
  border-radius: 8px;
  align-items: center;
  align-self: flex-end;
`;

export default CategoryBtn;
