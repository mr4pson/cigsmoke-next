import { Spin } from 'antd';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { Category, Product } from 'swagger/services';
import SearchSVG from '../../../../../assets/search.svg';
import { PopupDisplay } from '../HeaderCart/constants';
import { FilterBtn } from './FilterBtn';
import FilterModal from './FilterModal';
import { handleSearchQueryChange } from './helpers';
import SearchItem from './SearchItem';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

type StyleProps = {
  padding?: string;
  boxShadow?: string;
};

type Props = {};

const SearchBar: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, products, productsLoading } =
    useAppSelector<TGlobalState>((state) => state.global);
  const [selected, setSelected] = useState<Category>();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      dispatch(clearSearchProducts());
      dispatch(clearSearchQuery());
    },
  });

  return (
    <>
      <SearchWrapper ref={ref}>
        <SearchField
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onChange={handleSearchQueryChange(selected, dispatch)}
          type="input"
          padding={!selected ? '0 80px 0 40px' : '0 80px 0 100px'}
          value={searchQuery}
        />
        <SearchBtn onClick={(e) => e.preventDefault()}>
          <span>
            <SearchSVG />
          </span>
        </SearchBtn>
        <Wrapper boxShadow={searchQuery ? 'rgba(0, 0, 0, 0.16)' : '#fff'}>
          <Content>
            {!!products.length && !productsLoading ? (
              <>
                {products.map((product, index: number) => {
                  return (
                    <SearchItem
                      key={`search-bar-item-${index}`}
                      product={product}
                      index={index}
                    />
                  );
                })}
              </>
            ) : !products.length && searchQuery && !productsLoading ? (
              <div>По вашему запросу ничего не найдено.</div>
            ) : productsLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              <></>
            )}
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
