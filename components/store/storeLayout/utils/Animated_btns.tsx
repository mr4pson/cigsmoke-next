import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Path } from './paths';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Filter from '../../../../assets/filter.svg';

const Category_btn = (props: any) => {
  return (
    <BtnSvg
      id="category-btn"
      onClick={() => {
        props.setOpen(!props.isOpen);
        setTimeout(() => {
          props.setDisplay(props.display == 'none' ? 'flex' : 'none');
        }, 150);
      }}
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
    >
      <svg width="21" height="15" viewBox="0 0 21 15">
        <Path
          d="M0.903992 1H2.19894M0.903992 7.40294H2.19894M0.903992 13.8059H2.19894"
          stroke="white"
          animate={{ opacity: props.isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          d="M5.5 1L20.5 1"
          stroke="white"
          animate={{ opacity: props.isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: props.isOpen ? 45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 7.40295L20.5 7.40295"
          animate={{ rotate: props.isOpen ? -45 : 0 }}
        />
        <Path
          stroke="white"
          d="M5.5 13.8059L12.75 13.8059"
          animate={{ opacity: props.isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </svg>
      <span style={{ color: `${color.textPrimary}`, fontSize: '1rem' }}>
        Каталог
      </span>
    </BtnSvg>
  );
};

const Filter_btn = (props: any) => {
  return (
    <AnimatePresence>
      {props.selected != '' ? (
        <FilterSelected
          id="filter-btn"
          key="filter-selected"
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadeInSlideIn}
          color={props.selected != '' ? color.btnPrimary : ''}
        >
          {props.selected}
          <svg
            style={{ cursor: 'pointer' }}
            width="20"
            height="14"
            viewBox="0 0 21 15"
            stroke="white"
            onClick={() => {
              props.set_selected('');
            }}
          >
            <Path
              d="M5.5 7.40295L20.5 7.40295"
              animate={{ rotate: props.selected ? 45 : 0 }}
              transition={{ delay: 0.1 }}
            />
            <Path
              d="M5.5 7.40295L20.5 7.40295"
              animate={{ rotate: props.selected ? -45 : 0 }}
              transition={{ delay: 0.1 }}
            />
          </svg>
        </FilterSelected>
      ) : (
        <FilterBtn
          id="filter-btn"
          key="filter-icon"
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadeOutSlideOut}
          onClick={() => {
            props.setOpen(true);
            props.setDisplay('flex');
          }}
        >
          <span>
            <Filter />
          </span>
        </FilterBtn>
      )}
    </AnimatePresence>
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

const FilterSelected = styled(motion.button)`
  width: 90px;
  height: 30px;
  position: absolute;
  top: -37px;
  left: 30px;
  z-index: 1;
  font-size: 0.8rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${color.textPrimary};
  background: ${(props) => props.color || 'transparent'};
`;

const FilterBtn = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: -32px;
  left: 15px;
  z-index: 1;
  height: 21px;
  width: 80px;
  span {
    width: 80px;
    height: 21px;
  }
`;

export { Category_btn, Filter_btn };
