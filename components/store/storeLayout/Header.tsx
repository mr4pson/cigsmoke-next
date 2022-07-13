import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import { Container, Content, Wrapper } from './common';

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

const PathCircle = (props) => <motion.path {...props} />;

const Header = () => {
  const [isOpen, toggleOpen] = useState(false);
  const [isSelect, setSelect] = useState('');
  const [isSignIn, toggleSignIn] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AnimatePresence>
        <Container
          variants={variants.fadInOut}
          key="container1"
          initial="start"
          animate="middle"
          exit="end"
        >
          <LocationBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.grow}
          >
            <Image src="/icons/location-btn.svg" width={18} height={24} />
            <span style={{ whiteSpace: 'nowrap' }}>Выберите ваш город</span>
          </LocationBtn>
        </Container>
        <Wrapper
          variants={variants.fadInOut}
          key="header-Wrapper"
          initial="start"
          animate="middle"
          exit="end"
          style={{ paddingBottom: '28px' }}
        >
          <Container>
            <Content>
              <LogoWrapper>
                <Image src="/icons/cigsmoke-logo.svg" width={150} height={35} />
              </LogoWrapper>
              <CatBtn
                onClick={() => toggleOpen(!isOpen)}
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
              >
                <svg width="21" height="15" viewBox="0 0 21 15">
                  <Path
                    d="M0.903992 1H2.19894M0.903992 7.40294H2.19894M0.903992 13.8059H2.19894"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Path
                    d="M5.5 1L20.5 1"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Path
                    d="M5.5 7.40295L20.5 7.40295"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                  />
                  <Path
                    d="M5.5 7.40295L20.5 7.40295"
                    animate={{ rotate: isOpen ? -45 : 0 }}
                  />
                  <Path
                    d="M5.5 13.8059L12.75 13.8059"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </svg>
                <span
                  style={{ color: `${color.textPrimary}`, fontSize: '18px' }}
                >
                  Каталог
                </span>
              </CatBtn>

              {/* category wrapper goes here */}

              <SearchWrapper>
                <SerachField
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                />
                <AnimatePresence>
                  {isSelect != '' ? (
                    <FilterSelected
                      key="filter-selected"
                      initial="init"
                      animate="animate"
                      exit="exit"
                      variants={variants.fadeInSlideIn}
                      color={isSelect != '' ? color.btnPrimary : ''}
                      onClick={(e) => e.preventDefault()}
                    >
                      {isSelect}
                      <svg
                        style={{ cursor: 'pointer' }}
                        width="20"
                        height="14"
                        viewBox="0 0 21 15"
                        onClick={() => setSelect('')}
                      >
                        <Path
                          d="M5.5 7.40295L20.5 7.40295"
                          animate={{ rotate: isSelect ? 45 : 0 }}
                          transition={{ delay: 0.1 }}
                        />
                        <Path
                          d="M5.5 7.40295L20.5 7.40295"
                          animate={{ rotate: isSelect ? -45 : 0 }}
                          transition={{ delay: 0.1 }}
                        />
                      </svg>
                    </FilterSelected>
                  ) : (
                    <FilterIcon
                      key="filter-icon"
                      initial="init"
                      animate="animate"
                      exit="exit"
                      variants={variants.fadeOutSlideOut}
                      onClick={(e) => {
                        e.preventDefault();
                        return setSelect('Калянь');
                      }}
                    >
                      <Image
                        src="/icons/filter-icon.svg"
                        width="80"
                        height="21"
                      />
                    </FilterIcon>
                  )}
                </AnimatePresence>
                <SearchBtn onClick={(e) => e.preventDefault()}>
                  <AnimatePresence>
                    <SearchIcon
                      key="search-icon"
                      initial="init"
                      animate="animate"
                      exit="exit"
                      variants={variants.fadeOutSlideOut}
                    >
                      <Image
                        src="/icons/search-icon.svg"
                        width="22"
                        height="22"
                      />
                    </SearchIcon>
                  </AnimatePresence>
                </SearchBtn>

                {/* Search form reasult goese here */}
              </SearchWrapper>
              {/* filter category goese here */}
              <NavBtn
                onClick={() => {
                  toggleSignIn(!isSignIn);
                  setTimeout(() => toggleSignIn(false), 200);
                }}
              >
                <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
                  <AnimatePresence>
                    <PathCircle
                      key="sign-in"
                      initial={!isSignIn ? 'init' : ''}
                      animate={isSignIn ? 'animate' : ''}
                      exit={!isSignIn ? 'exit' : ''}
                      variants={variants.slideRight}
                      d="M0.875 13.239H20.875M20.875 13.239L16.875 17.614M20.875 13.239L16.875 8.61401"
                      stroke="black"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                    />
                    <PathCircle
                      key="sign-in-circle"
                      initial={!isSignIn ? 'init' : ''}
                      animate={isSignIn ? 'animate' : ''}
                      exit={!isSignIn ? 'exit' : ''}
                      variants={variants.fadeIn}
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.0169 13.114C28.0169 19.2383 23.0521 24.203 16.9279 24.203C12.2754 24.203 8.29212 21.3379 6.64626 17.2758H5.14905C6.86317 22.1271 11.4896 25.603 16.9279 25.603C23.8253 25.603 29.4169 20.0115 29.4169 13.114C29.4169 6.21652 23.8253 0.625 16.9279 0.625C11.4896 0.625 6.86317 4.10091 5.14905 8.95227H6.64626C8.29212 4.89016 12.2754 2.025 16.9279 2.025C23.0521 2.025 28.0169 6.98972 28.0169 13.114Z"
                      fill="black"
                    />
                  </AnimatePresence>
                </svg>
                <div> Войти</div>
              </NavBtn>
              {/* sign in wrapper and form goes here */}
              <NavBtn>
                <Image src="/icons/order-icon.svg" width="26" height="26" />
                <div> Заказы</div>
              </NavBtn>
              {/* Mini order form goes here */}
              <NavBtn>
                <Image src="/icons/wishlist-icon.svg" width="26" height="26" />
                <div>Избранное</div>
              </NavBtn>
              <NavBtn>
                <Image src="/icons/cart-icon.svg" width="30" height="28" />
                <div>Корзина</div>
              </NavBtn>
            </Content>
          </Container>
        </Wrapper>
      </AnimatePresence>
    </>
  );
};

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

const CatBtn = styled(motion.button)`
  width: 130px;
  padding: 0 15px;
  box-sizing: border-box;
  height: 43px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: ${color.btnPrimary};
  border: none;
  border-radius: 4px;
  align-items: center;
  align-self: flex-end;
  span {
    margin-left: 15px;
  }
`;

const SearchWrapper = styled.form`
  width: 525px;
  height: 43px;
  position: relative;
  align-self: flex-end;
`;

const SerachField = styled(motion.input)`
  width: 525px;
  height: 43px;
  border: 1px solid ${color.btnPrimary};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 110px;
`;

const FilterSelected = styled(motion.button)`
  width: 90px;
  height: 30px;
  position: absolute;
  top: 7px;
  left: 10px;
  font-size: 14px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${color.textPrimary};
  background: ${(props) => props.color || 'transparent'};
`;

const FilterIcon = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 12px;
  left: -18px;
`;

const SearchBtn = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: ${color.btnPrimary};
  width: 65px;
  height: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0px 4px 4px 0px;
`;

const SearchIcon = styled(motion.div)`
  width: 22px;
  height: 22px;
`;

const NavBtn = styled(motion.button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  gap: 4px;
  width: 40px;
  cursor: pointer;
  transition: all 0.2s;

  div {
    font-size: 14px;
    line-height: 1;
  }
  &:hover {
    color: ${color.hover};
  }
`;

export default Header;
