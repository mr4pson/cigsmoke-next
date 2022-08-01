import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearSearchProducts,
  searchProducts,
} from 'redux/slicers/store/globalSlicer';
import styled from 'styled-components';
import { Category, Product } from 'swagger/services';
import SearchSVG from '../../../../../assets/search.svg';
import { PopupDisplay } from '../HeaderCart/constants';
import { FilterBtn } from './FilterBtn';
import FilterModal from './FilterModal';
import SearchItem from './SearchItem';

type StyleProps = {
  padding?: string;
  boxShadow?: string;
};

type Props = {};

const SearchBar: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state) => state.global.products);
  const [selected, setSelected] = useState<Category>();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);

  const handleChange = (e: any) => {
    dispatch(
      searchProducts({ name: e.target.value, categories: [selected?.url!] }),
    );
  };

  const ref = useDetectClickOutside({
    onTriggered: () => {
      dispatch(clearSearchProducts());
    },
  });

  return (
    <>
      <SearchWrapper ref={ref}>
        <SearchField
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onChange={handleChange}
          type="input"
          padding={selected == '' ? '0 80px 0 40px' : '0 80px 0 100px'}
        />
        <SearchBtn onClick={(e) => e.preventDefault()}>
          <span>
            <SearchSVG />
          </span>
        </SearchBtn>
        <Wrapper boxShadow={products.length ? 'rgba(0, 0, 0, 0.16)' : '#fff'}>
          <Content>
            {products.map((product, index: number) => {
              return (
                <SearchItem
                  key={`search-bar-item-${index}`}
                  product={product}
                  index={index}
                />
              );
            })}
          </Content>
        </Wrapper>
        <FilterBtn
          selected={selected}
          setSelected={setSelected}
          setIsOpened={setIsOpened}
          setDisplay={setDisplay}
        />
      </SearchWrapper>
      <FilterModal
        isOpened={isOpened}
        display={display}
        setSelected={setSelected}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
      />
    </>
  );
};

const SearchWrapper = styled.form`
  width: 525px;
  height: 45px;
  position: relative;
  align-self: flex-end;
`;

const SearchField = styled(motion.input)`
  position: relative;
  width: 525px;
  height: 45px;
  border: 1px solid ${color.btnPrimary};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: ${(p: StyleProps) => p.padding};
  z-index: 1;
`;

const SearchBtn = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: ${color.btnPrimary};
  width: 65px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  z-index: 1;

  span {
    width: 22px;
    height: 22px;
  }
`;

const Wrapper = styled.div<StyleProps>`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 541px;
  padding-top: 50px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 8px ${(props) => props.boxShadow};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Content = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flext-start;
  border-radius: 0 0 25px 25px;
  padding: 10px 15px;
  a {
    &:hover {
      color: ${color.hover};
    }
  }
`;

export default SearchBar;
