import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../../../assets/arrow.svg';
import Image from 'next/image';

interface props {
  padding?: string;
  box_shadow?: string;
}

const Search_comp = (props: any) => {
  return (
    <Wrapper>
      <Content
        box_shadow={props.result.length != 0 ? color.box_shadow : '#fff'}
        padding={props.result.length != 0 ? '15' : '0'}
      >
        {props.result.map((item: any, index: any) => {
          return (
            <Link href="">
              <motion.a
                custom={1.05}
                whileHover="hover"
                whileTap="tap"
                variants={variants.grow}
              >
                <AnimatePresence>
                  <Item
                    custom={index * 0.2}
                    initial="init"
                    animate="animate"
                    exit="exit"
                    variants={variants.fadInSlideUp}
                  >
                    <Item_divider_y>
                      <Item_Wrapper_y>
                        <Image
                          src={`/static/temp/${item.image_minified}`}
                          width="60"
                          height="60"
                        />
                        <Item_divider_x>
                          <span>{item.name}</span>
                          <span>
                            {item.category}/{item.subCategory}
                          </span>
                        </Item_divider_x>
                      </Item_Wrapper_y>
                      <span>
                        <Arrow />
                      </span>
                    </Item_divider_y>
                  </Item>
                </AnimatePresence>
              </motion.a>
            </Link>
          );
        })}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 525px;
  top: 75px;
  left: 0;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${(P: props) => P.box_shadow};
  border-radius: 25px;
  position: absolute;
  display: flex;
  flex-directio: row;
  justify-content: center;
  align-items: center;
`;

const Content = styled.ul`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flext-start;
  border-radius: 0 0 25px 25px;
  padding: ${(p: props) => p.padding}px 0;
  a {
    &:hover {
      color: ${color.hover};
    }
  }
`;

const Item = styled(motion.li)`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Item_Wrapper_y = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Item_divider_y = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Item_divider_x = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default Search_comp;
