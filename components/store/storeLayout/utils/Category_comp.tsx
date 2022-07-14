import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import axios from 'axios';
import Arrow from '../../../../assets/arrow.svg';

interface props {
  fontSize?: string;
  fontWight?: string;
  padding?: string;
}
const fake_data = [
  { icon: 'hookah', catName: 'Кальяны' },
  { icon: 'glass', catName: 'Стеклянные курительные трубки' },
  { icon: 'vape', catName: 'Электронные сигареты' },
  { icon: 'liquad', catName: 'Солевая жидкость' },
  { icon: 'holder', catName: 'Пепельницы' },
  { icon: 'cigar', catName: 'Табак' },
];
const Category_comp = (props: any) => {
  const [data, setData] = useState([]);
  const [sub_menu, ste_sub_menu] = useState('electronics');
  const [sub_data, set_sub_data] = useState([]);

  useEffect(() => {
    let trimed = sub_menu.trim();
    axios
      .get(`https://fakestoreapi.com/products/category/${trimed}`)
      .then((res) => {
        set_sub_data(res.data);
      });
  }, [sub_menu]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => setData(res.data));
    axios
      .get('https://fakestoreapi.com/products/category/jewelery')
      .then((res) => {
        set_sub_data(res.data);
      });
    const body: any = document.getElementById('__next');
    body.addEventListener('click', (event: any) => {
      const category_wrapper: any = document.getElementById('category-wrapper');
      const category_btn: any = document.getElementById('category-btn');
      if (
        event.target !== category_wrapper &&
        !category_wrapper.contains(event.target) &&
        event.target !== category_btn &&
        !category_btn.contains(event.target)
      ) {
        props.setOpen(false);
        setTimeout(() => props.setDisplay('none'), 150);
      }
    });

    return () => {
      body.removeEventListener('click', () => console.log('removed'));
    };
  }, []);
  return (
    <Wrapper
      id="category-wrapper"
      style={{ display: props.display }}
      animate={props.isOpen ? 'open' : 'close'}
      variants={variants.fadeInReveal}
    >
      <Wrapper_grid>
        <Wrapper_main_menu>
          {data.map((item, index) => {
            return (
              <Link href="">
                <AnimatePresence>
                  <Row_flex
                    onHoverStart={() => ste_sub_menu(item)}
                    key={index}
                    custom={index * 0.2}
                    initial={false}
                    animate={props.isOpen ? 'animate' : 'exit'}
                    variants={variants.fadInSlideUp}
                    fontSize="1rem"
                    fontWight="600"
                    padding="15px 15px 15px 25%"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 1 }}
                  >
                    <li>
                      <Image
                        src={`/static/temp/${fake_data[index].icon}.svg`}
                        width="20"
                        height="20"
                      />
                      <span style={{ padding: '0 0 0 15px' }}>{item}</span>
                    </li>
                    <span>
                      <Arrow />
                    </span>
                  </Row_flex>
                </AnimatePresence>
              </Link>
            );
          })}
        </Wrapper_main_menu>
        <Wrapper_sub_menu>
          {sub_data.map((item: any, index) => {
            return (
              <Link href="">
                <AnimatePresence>
                  <Row_flex
                    key={index}
                    custom={index * 0.4}
                    initial={false}
                    animate={props.isOpen ? 'animate' : 'exit'}
                    variants={variants.fadInSlideUp}
                    fontSize="0.875rem"
                    fontWight="400"
                    padding="10px"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 1 }}
                  >
                    <li>
                      <span>{item.title}</span>
                    </li>
                  </Row_flex>
                </AnimatePresence>
              </Link>
            );
          })}
        </Wrapper_sub_menu>
        <Wrapper_brands>
          {sub_data.map((item: any, index) => {
            return (
              <Link href="">
                <AnimatePresence>
                  <motion.a
                    key={index}
                    custom={index * 0.1}
                    initial={false}
                    animate={props.isOpen ? 'animate' : 'exit'}
                    variants={variants.fadInSlideUp}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 1 }}
                  >
                    <li>
                      <img src={item.image} />
                    </li>
                  </motion.a>
                </AnimatePresence>
              </Link>
            );
          })}
        </Wrapper_brands>
      </Wrapper_grid>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: 350px;
  background-color: ${color.textPrimary};
  box-shadow: 0 0 2px 6px ${color.box_shadow};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Wrapper_grid = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  display: grid;
  grid-template-columns: 1.2fr 1fr 3fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 35px;
`;

const Wrapper_main_menu = styled.ul`
  height: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${color.bg_product};
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
`;

const Row_flex = styled(motion.a)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: ${(p: props) => p.fontSize};
    font-weight: ${(p: props) => p.fontWight};
  }
  padding: ${(p: props) => p.padding};

  &:hover {
    color: ${color.hover};
    background-color: ${color.textPrimary};
  }
`;

const Wrapper_sub_menu = styled.ul`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
`;

const Wrapper_brands = styled.ul`
  width: 100%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  a {
    display: flex;
    flex-directio: row;
    justify-content: center;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 15px;
    }
  }
`;

export default Category_comp;
