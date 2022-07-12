import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Btns } from './common';
import Auth_comp from './utils/Auth_comp';
import Cart_comp from './utils/Cart_comp';
import Filter_comp from './utils/Filter_comp';
import Search_comp from './utils/Search_comp';
import Category_comp from './utils/Category_comp';
import { Category_btn, Filter_btn } from './utils/Animated_btns';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import Pointer from '../../../assets/pointer.svg';
import Logo from '../../../assets/logo.svg';
import Search from '../../../assets/search.svg';
import Order from '../../../assets/order.svg';
import WishList from '../../../assets/wishlist.svg';

const fake_data = [
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
  {
    name: 'darkside',
    image_minified: 'tabak.png',
    url: '',
    category: 'Кальяны',
    subCategory: 'Табак',
  },
];

const Header = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  // __________ Filter hooks______________
  const [open_filter, set_open_filter] = useState(false);
  const [display_filter, set_display_filter] = useState('none');
  const [selected_filter, set_selected_filter] = useState('');
  // ____________________________________

  // ______________Categories hooks______________
  const [open_categories, set_open_categorie] = useState(false);
  const [display_categories, set_display_categories] = useState('none');
  // ___________________________________________

  const [result, setResult]: [any, any] = useState([]);
  const handleChange = (event: any) => {
    event.preventDefault();
    if (event.target.value === '') return setResult([]);
    for (let i = 0; i < fake_data.length; i++) {
      if (fake_data[i].name.match(event.target.value)) {
        setResult([...fake_data]);
      }
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AnimatePresence>
        <Container
          variants={variants.fadInOut}
          key="header"
          initial="start"
          animate="middle"
          exit="end"
        >
          <Category_comp
            isOpen={open_categories}
            setOpen={set_open_categorie}
            display={display_categories}
            setDisplay={set_display_categories}
          />
          <Wrapper>
            <Content>
              <LogoWrapper>
                <LocationBtn
                  whileHover="hover"
                  whileTap="tap"
                  custom={1.05}
                  variants={variants.grow}
                >
                  <span>
                    <Pointer />
                  </span>
                  <span style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                    Выберите ваш город
                  </span>
                </LocationBtn>
                <Link href="/">
                  <a>
                    <Logo />
                  </a>
                </Link>
              </LogoWrapper>
              <Category_btn
                isOpen={open_categories}
                setOpen={set_open_categorie}
                display={display_categories}
                setDisplay={set_display_categories}
              />
              <Relitive_container>
                <Filter_btn
                  selected={selected_filter}
                  set_selected={set_selected_filter}
                  setOpen={set_open_filter}
                  isOpen={open_filter}
                  display={display_filter}
                  setDisplay={set_display_filter}
                />
              </Relitive_container>
              <SearchWrapper>
                <SerachField
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  onChange={handleChange}
                  type="input"
                />
                <SearchBtn onClick={(e) => e.preventDefault()}>
                  <span>
                    <Search />
                  </span>
                </SearchBtn>
                <Relitive_container>
                  <Search_comp result={result} />
                </Relitive_container>
              </SearchWrapper>
              <Relitive_container id="auth-container">
                {isSignedIn ? 'profile component' : <Auth_comp />}
              </Relitive_container>
              <Btns>
                <span>
                  <Order />
                </span>
                <span> Заказы</span>
              </Btns>
              <Btns>
                <span>
                  <WishList />
                </span>
                <span>Избранное</span>
              </Btns>
              <Relitive_container>
                <Cart_comp />
              </Relitive_container>
            </Content>
          </Wrapper>
          <Filter_comp
            set_selected={set_selected_filter}
            isOpen={open_filter}
            setOpen={set_open_filter}
            display={display_filter}
            setDisplay={set_display_filter}
          />
        </Container>
      </AnimatePresence>
    </>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px 0;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: ${color.textPrimary};
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 15px;
  justify-self: flex-start;
`;

const LocationBtn = styled(motion.button)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  padding: 5px 5px 5px 0;
  gap: 5px;
`;

const SearchWrapper = styled.form`
  width: 525px;
  height: 45px;
  position: relative;
  align-self: flex-end;
`;

const SerachField = styled(motion.input)`
  width: 525px;
  height: 45px;
  border: 1px solid ${color.btnPrimary};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 110px;
`;

const SearchBtn = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: ${color.btnPrimary};
  width: 80px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  span {
    width: 22;
    height: 22;
  }
`;

const Relitive_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  position: relative;
`;

export default Header;
