import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeSearchQuery } from 'redux/slicers/store/globalSlicer';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { CategoryInTree } from 'swagger/services';
import SearchSVG from '../../../../../assets/search.svg';
import { PopupDisplay } from '../../constants';
import { FilterBtn } from './FilterBtn';
import FilterModal from './FilterModal';
import { handleSearchQueryChange, handleSearchFormSubmit } from './helpers';
import SearchItem from './SearchItem';
import { useRouter } from 'next/router';
import Loading from 'ui-kit/Loading';
import { devices } from 'components/store/lib/Devices';

type StyleProps = {
  padding?: string;
  boxShadow?: string;
};

type Props = {};

const SearchBar: React.FC<Props> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchQuery, products, productsLoading } =
    useAppSelector<TGlobalState>((state) => state.global);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInTree>();
  const [focused, setFocused] = useState(false);
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

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setFocused(false);
    },
  });

  useEffect(() => {
    dispatch(changeSearchQuery(router.query.name as string));
  }, [router.query.name]);

  return (
    <>
      <SearchForm
        ref={ref}
        onSubmit={handleSearchFormSubmit(
          selectedCategory,
          searchQuery,
          router,
          setFocused,
        )}
      >
        <SearchField
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onChange={handleSearchQueryChange(
            selectedCategory,
            setFocused,
            dispatch,
          )}
          placeholder="Искать на wuluxe"
          type="input"
          padding={!selectedCategory ? '0 80px 0 40px' : '0 80px 0 100px'}
          value={searchQuery}
        />
        <SearchBtn type={'submit'}>
          <span>
            <SearchSVG />
          </span>
        </SearchBtn>
        <Wrapper
          boxShadow={searchQuery && focused ? 'rgba(0, 0, 0, 0.16)' : '#fff'}
        >
          <>
            {!!products.length && focused && !productsLoading ? (
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
            ) : !products.length &&
              focused &&
              searchQuery &&
              !productsLoading ? (
              <EmptyResult>По вашему запросу ничего не найдено.</EmptyResult>
            ) : productsLoading ? (
              <Content>
                <Loading />
              </Content>
            ) : (
              <></>
            )}
          </>
        </Wrapper>
        <FilterBtn
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setIsOpened={setIsOpened}
          setDisplay={setDisplay}
          btnNode={btnNode}
        />
      </SearchForm>
      <FilterModal
        isOpened={isOpened}
        display={display}
        setSelectedCategory={setSelectedCategory}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
        menuNode={menuNode}
      />
    </>
  );
};

const SearchForm = styled.form`
  height: 45px;
  position: relative;
  align-self: flex-end;

  @media ${devices.laptopS} {
    position: absolute;
    top: 10px;
    margin-left: 261px;
  }

  @media ${devices.mobileL} {
    position: absolute;
    top: 52px;
    width: calc(100% - 155px);
  }
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
  z-index: 200;

  @media ${devices.laptopM} {
    max-width: 325px;
  }

  @media ${devices.laptopS} {
    max-width: 325px;
  }

  @media ${devices.mobileL} {
    width: 100%;
    height: 40px;
  }
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
  z-index: 200;

  span {
    width: 22px;
    height: 22px;
  }

  @media ${devices.mobileL} {
    height: 40px;
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
  z-index: 100;

  @media ${devices.laptopM} {
    max-width: 341px;
  }

  @media ${devices.laptopS} {
    max-width: 341px;
  }

  @media ${devices.mobileL} {
    width: calc(100% + 16px);
  }
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

const EmptyResult = styled.div`
  padding: 10px 0;
`;

export default SearchBar;
