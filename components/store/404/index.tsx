import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { Path, PathCircle } from './helpers';
import { useState } from 'react';
import Link from 'next/link';

const NotFoundSvg = () => {
  const [animate, setAnimate] = useState(false);
  return (
    <Container>
      <SVG
        viewBox="0 0 2207 1321"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseOver={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
        onMouseDown={() => setAnimate(false)}
        onMouseUp={() => setAnimate(true)}
      >
        <rect
          x="885"
          y="768.064"
          width="436"
          height="502"
          rx="86"
          stroke="#000"
          stroke-width="100"
        ></rect>
        <>
          <motion.rect
            drag
            y="884.632"
            width="591.12"
            height="83.978"
            rx="38.5"
            fill="#000"
          ></motion.rect>
          <motion.rect
            drag
            x="12.689"
            y="1026.02"
            width="737.258"
            height="83.978"
            rx="38.5"
            style={{
              rotate: '-45deg',
              translateX: '-100px',
              translateY: '-300px',
            }}
            fill="#000"
          ></motion.rect>
          <motion.rect
            drag
            x="378.448"
            y="1319.79"
            width="803.792"
            height="83.978"
            rx="38.5"
            style={{
              rotate: '-90deg',
              translateX: '-350px',
              translateY: '-450px',
            }}
            fill="#000"
          ></motion.rect>
          <motion.rect
            drag
            x="1615"
            y="884.632"
            width="591.12"
            height="83.978"
            rx="38.5"
            fill="#000"
          ></motion.rect>
          <motion.rect
            drag
            x="1627.69"
            y="1026.02"
            width="737.258"
            height="83.978"
            rx="38.5"
            style={{
              rotate: '-45deg',
              translateX: '-100px',
              translateY: '-300px',
            }}
            fill="#000"
          ></motion.rect>
          <motion.rect
            drag
            x="1993.45"
            y="1319.79"
            width="803.792"
            height="83.978"
            rx="38.5"
            style={{
              rotate: '-90deg',
              translateX: '-350px',
              translateY: '-450px',
            }}
            fill="#000"
          ></motion.rect>
        </>
        <path
          d="M777.352 646.472c17.103 17.715 63.608 14.763 84.723 11.072L908 701.042c-14.569 12.654-86.307 17.4-120.355 18.191-43.074-.633-84.459-27.681-99.767-41.126-41.174-22.778-69.943-86.47-79.181-115.469-26.605-67.066-17.42-103.341-9.502-113.095 6.968-32.901 43.022-49.035 60.178-52.989 26.604-6.327 50.148 11.599 58.593 21.354 20.904 23.41 18.74 58.261 15.045 72.76-11.402 31.636-7.39 71.707-3.959 87.788 3.8 34.799 33.783 59.843 48.3 68.016Z"
          fill="#000"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1311.77 632.471c5.84-19.503 8.08-42.589 6.22-69.668 18.85-135.077-74.1-243.079-204.94-233.424-119.305 0-272.199 154.476-272.199 273.779-12.73 121.104 120.934 119.947 244.289 118.878 9.38-.081 18.71-.162 27.91-.188 20.15 1.537 39.31 1.88 57.25.839l.51 1.535h108.4c21.37.527 64.1-5.698 64.1-34.816.52-9.495-5.54-28.802-34.03-30.068l2.49-26.867Z"
          fill="#000"
        ></path>
        <path
          d="M1371 327.006c0 128.916-144.86 161.418-273.78 161.418-164.582 7.913-227.883-74.439-227.883-203.356 0-128.916 122.706-171.705 251.623-171.705 140.85 0 250.04 84.726 250.04 213.643Z"
          fill="#000"
        ></path>
        <Path
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          d="M1082.98 152.136c0 47.196-50.92 24.529-98.118 24.529-47.197 0-77.544 52.735-77.544 5.539 0-47.197 3.444-176.453 50.641-176.453 47.201 0 125.021 99.188 125.021 146.385Z"
          fill="#000"
        />
        <path
          d="M1034.71 122.067c0 26.221-5.43 16.696-31.65 16.696-26.219 0-59.344 26.221-59.344 0 0-26.22-3.615-84.665 22.606-84.665 26.22 0 68.388 41.75 68.388 67.969Z"
          fill="#FF7259"
        ></path>
        <Path
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          d="M1289.5 182.995c-19.63 31.324-33.56-9.651-64.88-29.277-31.33-19.626-84.51 13.125-64.89-18.199 19.63-31.324 63.63-143.855 94.95-124.229 31.33 19.626 54.45 140.381 34.82 171.705Z"
          fill="#000"
        />
        <path
          d="M1278.42 138.474c0 26.22-30.75 0-56.97 0s3.17-46.475 3.17-46.475 11.86-27.694 26.9-42.938c26.22 0 26.9 63.193 26.9 89.413Z"
          fill="#FF7259"
        ></path>
        <path
          d="M1174.77 391.889c0 16.607-13.47 3.165-30.07 3.165-16.61 0-30.07 13.442-30.07-3.165 0-16.606 13.46-30.068 30.07-30.068 16.6 0 30.07 13.462 30.07 30.068ZM1157.36 337.292c0 5.681-6.19 8.704-11.87 8.704-5.68 0-11.08-3.023-11.08-8.704 0-5.681 5.4-3.956 11.08-3.956s11.87-1.725 11.87 3.956Z"
          fill="#ED3969"
        ></path>
        <PathCircle
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          cx="1048.95"
          cy="281.903"
          r="84.666"
          fill="#FFA318"
        />
        <PathCircle
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          cx="1048.95"
          cy="281.903"
          r="64.093"
          fill="#000"
        />
        <PathCircle
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          cx="1060.82"
          cy="243.131"
          r="12.66"
          fill="#fff"
        />
        <PathCircle
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          cx="1248.35"
          cy="281.903"
          r="84.666"
          fill="#FFA318"
        />
        <PathCircle
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          cx="1248.35"
          cy="281.903"
          r="64.093"
          fill="#000"
        />
        <PathCircle
          custom={1.1}
          animate={animate ? 'hover' : 'tap'}
          variants={variants.grow}
          cx="1268.14"
          cy="243.131"
          r="12.66"
          fill="#fff"
        />
      </SVG>
      <h1>Страница, которую вы ищете, не найдена</h1>
      <h2>
        <Link href="/">
          <a style={{ color: color.ok }}>
            Нажмите здесь, чтобы вернуться на главную страницу
          </a>
        </Link>
      </h2>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 30px;
  h1 {
    font-family: 'intro';
    font-size: 2rem;
  }
`;

const SVG = styled.svg`
  width: 90%;
  height: 100%;
`;

export default NotFoundSvg;
