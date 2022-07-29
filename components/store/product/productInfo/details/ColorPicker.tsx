import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { ImageTooltip } from './helpers';
import React from 'react';

const fakeData = [
  { available: true, price: '450', prevPrice: '' },
  { available: true, price: '480', prevPrice: '600' },
  { available: false, price: '850', prevPrice: '' },
  { available: true, price: '490', prevPrice: '600' },
  { available: true, price: '450', prevPrice: '' },
  { available: false, price: '550', prevPrice: '' },
  { available: true, price: '440', prevPrice: '600' },
];

const ColorPicker = (props: any) => {
  return (
    <ColorPickerContainer>
      <ColorPickerNameWrapper
        key="prices-product-page"
        custom={0.38}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
        variants={variants.fadInSlideUp}
      >
        <span>Цвет:</span>
        <span style={{ color: color.btnPrimary }}>
          vector navy / ftwr white / quartz met
        </span>
      </ColorPickerNameWrapper>
      <ColorPickerList>
        {fakeData.map((item, index) => {
          return (
            <ImageTooltip
              key={index}
              title={
                <React.Fragment>
                  <img
                    style={{ width: '100px', height: '100px' }}
                    src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                    alt=""
                  />
                  <hr
                    style={{
                      backgroundColor: color.textTertiary,
                      width: '100%',
                    }}
                  />
                  {!item.available ? (
                    <ColorPickerSpan>{'Нет в наличии'}</ColorPickerSpan>
                  ) : (
                    <ColorPickerPriceWrapper>
                      <ColorPickerSpan>{`${item.price}₽`}</ColorPickerSpan>
                      {item.prevPrice == '' ? (
                        ''
                      ) : (
                        <ColorPickerSpan>
                          {`${item.prevPrice}₽`}
                        </ColorPickerSpan>
                      )}
                    </ColorPickerPriceWrapper>
                  )}
                </React.Fragment>
              }
            >
              <ColorPickerItems
                key="prices-product-page"
                custom={0.05 * index}
                initial="init"
                animate="animate"
                exit={{
                  y: -20,
                  opacity: 0,
                  transition: { delay: 0.05 * index },
                }}
                variants={variants.fadInSlideUp}
                onClick={() => {
                  props.setSelectedIndex(index);
                  if (index != props.selectedIndex) {
                    props.paginateImage(props.selectedIndex > index ? -1 : 1);
                  }
                }}
                style={{
                  border: `1px solid ${
                    props.selectedIndex == index
                      ? color.hover
                      : color.textPrimary
                  }`,
                }}
              >
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                  alt=""
                />
                {!item.available ? <div></div> : ''}
              </ColorPickerItems>
            </ImageTooltip>
          );
        })}
      </ColorPickerList>
    </ColorPickerContainer>
  );
};

const ColorPickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  jusitfy-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const ColorPickerNameWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  span {
    font-size: 0.8rem;
    color: ${color.textTertiary};
  }
`;

const ColorPickerList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const ColorPickerItems = styled(motion.li)`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
  background-color: #e5f2ff;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
  div {
    width: 100%;
    height: 100%;
    background-color: #ffffff96;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
  }
`;

const ColorPickerPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ColorPickerSpan = styled.span`
  font-size: 1rem;
  font-family: 'intro';
  &:nth-child(2) {
    font-size: 1rem;
    text-decoration: line-through;
    text-decoration-color: ${color.hover};
    color: ${color.textSecondary};
  }
`;

export default ColorPicker;
