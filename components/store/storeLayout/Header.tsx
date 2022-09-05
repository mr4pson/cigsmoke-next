import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Btns, Container, Content, Wrapper } from './common';
import { overrideDefaultIOSZoom } from './helpers';
import AuthComp from './utils/HeaderAuth/index';
import HeaderCart from './utils/HeaderCart';
import SearchBar from './utils/SearchBar/SearchBar';
import LocationFinder from './utils/LocationFinder';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import LogoSVG from '../../../assets/wuluxe.svg';
import Order from '../../../assets/order.svg';
import WishList from '../../../assets/wishlist.svg';
import HeaderCatalog from './utils/HeaderCatalog/index';
import { devices } from '../lib/Devices';
import { useEffect, useState } from 'react';
import NavWrapMobile from './NavWrapMobile';
import AuthBtnMobile from './utils/HeaderAuth/AuthBtnMobile';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

const Header = () => {
  const [boxShadow, setBoxShadow] = useState('');
  ReactGA.initialize('G-LGRKY05W0C');
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      // REACTGA
      // Send pageview with a custom path
      ReactGA.send({ hitType: 'pageview', page: url });

      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`,
      );
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', function () {
      let scroll = this.scrollY;

      if (scroll) {
        setBoxShadow('0px 2px 6px #00000017');

        return;
      }
      setBoxShadow('');
    });
  }, []);
  useEffect(() => overrideDefaultIOSZoom());
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        padding="10px 0 20px 0"
        position="fixed"
        top="0"
        z_index="20"
        bg_color={color.textPrimary}
        box_shadow={boxShadow}
      >
        <Wrapper>
          <Content
            flex_direction="row"
            justify_content="space-between"
            align_items="center"
            style={{ alignItems: 'end' }}
          >
            <LogoWrapper>
              <LocationFinder />
              <Link href="/">
                <a>
                  <LogoSVG id="header-logo" />
                </a>
              </Link>
            </LogoWrapper>
            <HeaderCatalog />
            <SearchBar />
            <AuthBtnMobile />
            <NavWrap>
              <RelativeContainer id="auth-container">
                <AuthComp />
              </RelativeContainer>
              <Link href="/orders">
                <a style={{ alignSelf: 'flex-end' }}>
                  <Btns>
                    <span>
                      <Order />
                    </span>
                    <span> Заказы</span>
                  </Btns>
                </a>
              </Link>
              <Link href="/wishlist">
                <a style={{ alignSelf: 'flex-end' }}>
                  <Btns>
                    <span>
                      <WishList />
                    </span>
                    <span>Избранное</span>
                  </Btns>
                </a>
              </Link>
              <RelativeContainer>
                <HeaderCart />
              </RelativeContainer>
            </NavWrap>
          </Content>
        </Wrapper>
      </Container>
      <NavWrapMobile />
    </>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 29px;
  justify-self: flex-start;
  #header-logo {
    width: 125px;
  }
  @media ${devices.laptopS} {
    gap: 47px;
  }

  @media ${devices.mobileL} {
    gap: 55px;
    flex-direction: column-reverse;
    margin-top: 15px;
    margin-bottom: -15px;
    #header-logo {
      margin-top: -10px;
    }
  }
`;

const RelativeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  position: relative;
`;

const NavWrap = styled.div`
  display: flex;
  width: 294px;
  justify-content: space-between;

  @media ${devices.mobileL} {
    display: none;
  }
`;

export default Header;
