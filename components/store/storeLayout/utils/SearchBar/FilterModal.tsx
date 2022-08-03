import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Category } from 'swagger/services';
import CloseSVG from '../../../../../assets/close_black.svg';
import { handleClickOutside } from '../HeaderCart/helpers';

type Props = {
  isOpened: boolean;
  display: string;
  setSelected: any;
  setIsOpened: any;
  setDisplay: any;
};

const FilterModal: React.FC<Props> = ({
  isOpened,
  display,
  setSelected,
  setIsOpened,
  setDisplay,
}) => {
  const categories: Category[] = useAppSelector(
    (state) => state.global.categories,
  );

  const ref = useDetectClickOutside({
    onTriggered: handleClickOutside(isOpened, setIsOpened, setDisplay),
  });

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpened(false);
    setTimeout(() => setDisplay('none'), 150);
  };

  const handleSelect = (category: Category) => () => {
    // setSelected(`${category.name?.slice(0, 5)}..`);
    setSelected(category);
    setIsOpened(false);
    setTimeout(() => setDisplay('none'), 150);
  };

  return (
    <AnimatePresence>
      <PopupWrapper style={{ display: display }}>
        <Content
          initial="init"
          ref={ref}
          animate={isOpened ? 'animate' : 'exit'}
          custom={0.2}
          variants={variants.fadInSlideUp}
          id="filter-content"
        >
          <motion.button
            custom={1.1}
            whileTap="tap"
            whileHover="hover"
            variants={variants.grow}
            onClick={handleClose}
          >
            <CloseSVG />
          </motion.button>
          <ContentInner>
            {categories.map((category, index: any) => {
              return (
                <motion.li
                  initial="init"
                  animate={isOpened ? 'animate' : 'exit'}
                  custom={index * 0.15}
                  variants={variants.fadInSlideUp}
                  key={index}
                  onClick={handleSelect(category)}
                >
                  <Image
                    src={`/api/images/${category.image}`}
                    width="20"
                    height="20"
                  />
                  <span>{category.name}</span>
                </motion.li>
              );
            })}
          </ContentInner>
        </Content>
      </PopupWrapper>
    </AnimatePresence>
  );
};

const PopupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${color.boxShadowBtn};
  position: absolute;
  display: flex;
  flex-directio: row;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Content = styled(motion.div)`
  width: 485px;
  min-height: 340px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  button {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }
`;

const ContentInner = styled.ul`
  width: 85%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    padding: 5px 5px 5px 0;
    &:hover {
      color: ${color.hover};
    }
  }
`;

export default FilterModal;