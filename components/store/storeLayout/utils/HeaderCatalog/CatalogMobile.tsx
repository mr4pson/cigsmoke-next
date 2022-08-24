import styled from 'styled-components';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import CatalogDropDown from './DropDownsParrent';
import { TGlobalState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CategoryInTree } from 'swagger/services';
import { fetchBrands } from 'redux/slicers/store/globalSlicer';
import {
  handleBrandClick,
  handleCategoryHover,
  handleSubCategoryHover,
} from './helpers';
import Link from 'next/link';

const CatalogMobile = () => {
  const dispatch = useAppDispatch();
  const [curCategory, setCurCategory] = useState<CategoryInTree>();
  const [curSubCategory, setCurSubCategory] = useState<CategoryInTree>();
  const { categories, brands } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );

  useEffect(() => {
    dispatch(fetchBrands({ parent: curCategory?.url }));
  }, [curCategory]);
  return (
    <Container>
      <Wrapper>
        <h2>Каталог</h2>
        <Grid>
          <CatalogItemWrapper>
            <Link href="">
              <a>
                <img src="/ghg" />

                <span>title</span>
              </a>
            </Link>
          </CatalogItemWrapper>
          <CatalogItemWrapper>
            <Link href="">
              <a>
                <img src="/fgfd" />

                <span>title</span>
              </a>
            </Link>
          </CatalogItemWrapper>
        </Grid>
        <h2>Подкаталог</h2>
        <Grid>
          <CatalogItemWrapper>
            <Link href="">
              <a>
                <span>title</span>
              </a>
            </Link>
          </CatalogItemWrapper>
          <CatalogItemWrapper>
            <Link href="">
              <a>
                <span>title</span>
              </a>
            </Link>
          </CatalogItemWrapper>
        </Grid>
        <h2>Бренд</h2>
        <Grid>
          <CatalogItemWrapper>
            <Link href="">
              <a>
                <img src="/ghg" />

                <span>title</span>
              </a>
            </Link>
          </CatalogItemWrapper>
          <CatalogItemWrapper>
            <Link href="">
              <a>
                <img src="/ghg" />

                <span>title</span>
              </a>
            </Link>
          </CatalogItemWrapper>
        </Grid>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  h2 {
    font-family: 'intro';
  }
`;

const Grid = styled.ul`
  width: 100%;
  display: grid;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 10px;
`;

const CatalogItemWrapper = styled.li`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  padding: 10px;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    span {
      font-family: 'intro';
    }
    img {
      width: 80%;
    }
  }
`;

export default CatalogMobile;
