import styled from '@emotion/styled';
import Link from 'next/link';
import variants from 'components/store/lib/variants';
import { Btns } from '../../common';
import { PathCircle } from '../paths';
import { useState } from 'react';
import { devices } from 'components/store/lib/Devices';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';

const AuthBtnMobile = () => {
  const [isAnimate, setAnimate] = useState(false);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  return (
    <Link href="/profile">
      <BtnWrapper>
        <Btns
          onClick={(e) => {
            setAnimate(!isAnimate);
            setTimeout(() => setAnimate(false), 200);
          }}
          variants={variants.fadeInSlideIn}
          style={{ gap: '5px' }}
        >
          {user ? (
            <>
              <span style={{ borderRadius: '50%' }}>
                <img
                  style={{ width: '28px' }}
                  src={`https://avatars.dicebear.com/api/micah/${user.id}.svg?facialHairProbability=0&mouth[]=smile&scale=100&hair[]=fonze,full,pixie`}
                />
              </span>

              <span>{user?.firstName}</span>
            </>
          ) : (
            <>
              <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
                <PathCircle
                  animate={isAnimate ? 'animate' : 'init'}
                  variants={variants.slideRight}
                  d="M0.875 13.239H20.875M20.875 13.239L16.875 17.614M20.875 13.239L16.875 8.61401"
                  stroke="black"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                />
                <PathCircle
                  animate={isAnimate ? 'animate' : 'init'}
                  variants={variants.fadeOut}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.0169 13.114C28.0169 19.2383 23.0521 24.203 16.9279 24.203C12.2754 24.203 8.29212 21.3379 6.64626 17.2758H5.14905C6.86317 22.1271 11.4896 25.603 16.9279 25.603C23.8253 25.603 29.4169 20.0115 29.4169 13.114C29.4169 6.21652 23.8253 0.625 16.9279 0.625C11.4896 0.625 6.86317 4.10091 5.14905 8.95227H6.64626C8.29212 4.89016 12.2754 2.025 16.9279 2.025C23.0521 2.025 28.0169 6.98972 28.0169 13.114Z"
                  fill="black"
                />
              </svg>
              <span>Войти</span>
            </>
          )}
        </Btns>
      </BtnWrapper>
    </Link>
  );
};

const BtnWrapper = styled.a`
  height: 100%;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    width: 100%;
    img {
      width: 100%;
    }
  }
  @media ${devices.mobileL} {
    display: flex;
  }
`;

export default AuthBtnMobile;
