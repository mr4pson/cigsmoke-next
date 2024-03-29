import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { getFlatVariantImages, ImageTooltip } from './helpers';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Color, ProductVariant } from 'swagger/services';
import { useAppDispatch } from 'redux/hooks';
import { setVariant } from 'redux/slicers/store/cartSlicer';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';

type StyleProps = {
  backgroundColor: string;
};

type Props = {
  variantColor: Color | undefined;
  productVariants: ProductVariant[] | undefined;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const ColorPicker: React.FC<Props> = ({
  variantColor,
  productVariants,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
}) => {
  const dispatch = useAppDispatch();

  const handleImageChange =
    (
      variant: ProductVariant,
      index: number,
      selectedIndex: number,
      setSelectedIndex: (index: number) => void,
      paginateImage: (index: number) => void,
    ) =>
    () => {
      localStorage.setItem('userChoice', JSON.stringify(variant.color?.name));

      dispatch(setVariant(variant));
      setSelectedIndex(index);

      if (index != selectedIndex) {
        paginateImage(selectedIndex > index ? -1 : 1);
      }
    };

  const variantImages = getFlatVariantImages(productVariants);
  useEffect(() => {
    if (variantImages) {
      localStorage.setItem(
        'userChoice',
        JSON.stringify(variantImages[0].color?.name),
      );
    }
  }, []);

  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  useEffect(() => {
    if (variantColor?.url === '_' || variantColor?.name === '_') {
      localStorage.removeItem('userChoice');
    }
  });
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
        {variantColor?.url != '_' ? (
          <ColorWrapper>
            <span>Цвет:</span>
            <ColorItem backgroundColor={variantColor?.code!} />
          </ColorWrapper>
        ) : (
          ''
        )}
      </ColorPickerNameWrapper>
      <ColorPickerList>
        {variantImages?.map((variant, colIndex) => (
          <ImageTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key={`image-item-${colIndex}`}
            title={
              <React.Fragment>
                <img
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                  }}
                  src={`/api/images/${variant.image}`}
                  alt=""
                />
                <hr
                  style={{
                    backgroundColor: color.textTertiary,
                    width: '100%',
                  }}
                />
                {variantColor?.url != '_' ? (
                  <ColorPickerSpan
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <span>Цвет:</span>
                    <ColorItem backgroundColor={variant.color.code!} />
                  </ColorPickerSpan>
                ) : (
                  ''
                )}

                {!variant.available ? (
                  <ColorPickerSpan>{'Нет в наличии'}</ColorPickerSpan>
                ) : (
                  <ColorPickerPriceWrapper>
                    <ColorPickerSpan>{`${
                      user?.role === Role.SuperUser
                        ? variant.wholeSalePrice
                        : variant.price
                    }₽`}</ColorPickerSpan>
                    {!variant.oldPrice ? (
                      ''
                    ) : (
                      <ColorPickerSpan>
                        {`${variant.oldPrice}₽`}
                      </ColorPickerSpan>
                    )}
                  </ColorPickerPriceWrapper>
                )}
              </React.Fragment>
            }
          >
            <ColorPickerItems
              key="prices-product-page"
              custom={0.05 * colIndex}
              initial="init"
              animate="animate"
              exit={{
                y: -20,
                opacity: 0,
                transition: { delay: 0.05 * colIndex },
              }}
              variants={variants.fadInSlideUp}
              onClick={handleImageChange(
                variant,
                colIndex,
                selectedIndex,
                setSelectedIndex,
                paginateImage,
              )}
              style={{
                border: `1px solid ${
                  selectedIndex == colIndex ? color.yellow : color.textPrimary
                }`,
              }}
            >
              <img
                style={{
                  width: selectedIndex == colIndex ? '100%' : '50px',
                  height: selectedIndex == colIndex ? '100%' : '50px',
                }}
                src={`/api/images/${variant.image}`}
                alt=""
              />
              {!variant.available ? <div></div> : ''}
            </ColorPickerItems>
          </ImageTooltip>
        ))}
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
  @media ${devices.laptopS} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(4, 1fr);
  }
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
  overflow: hidden;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
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

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${color.btnPrimary};
`;

const ColorItem = styled.div`
  background-color: ${(props: StyleProps) => props.backgroundColor};
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default ColorPicker;
