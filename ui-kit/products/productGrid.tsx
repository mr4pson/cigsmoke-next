import { devices } from 'components/store/lib/Devices';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Basket, Product, Wishlist } from 'swagger/services';
import {
  checkIfItemInCart,
  checkIfItemInWishlist,
  getAnimationDelay,
  handleCartBtnClick,
  handleWishBtnClick,
} from './helpers';
import ProductItem from './productItem';

type Props = {
  products: Product[];
  gridStyle?: any;
  emptyProductsTitle?: string;
  children?: JSX.Element;
};

const ProductGrid: React.FC<Props> = ({
  products,
  emptyProductsTitle,
  gridStyle,
  children,
}) => {
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const wishlist: Wishlist = useAppSelector((state) => state.global.wishlist);
  const delay = getAnimationDelay(products.length);
  const dispatch = useAppDispatch();

  return (
    <Grid
      laptopGridTemplateAreas={gridStyle?.laptopGridTemplateAreas}
      laptopGridTemplateColumns={gridStyle?.laptopGridTemplateColumns}
      laptopColumnGap={gridStyle?.laptopColumnGap}
      style={gridStyle}
    >
      {children}
      {!!products.length ? (
        products.map((product, index) => {
          return (
            <ProductItem
              key={`product-item-${index}`}
              product={product}
              custom={delay[index]}
              isInCart={checkIfItemInCart(product, cart)}
              isInWishlist={checkIfItemInWishlist(product, wishlist)}
              onCartBtnClick={handleCartBtnClick(product, dispatch, cart)}
              onWishBtnClick={handleWishBtnClick(product, dispatch, wishlist)}
            />
          );
        })
      ) : (
        <EmptyProductsTitle>
          {emptyProductsTitle ?? 'Список продуктов пуст'}
        </EmptyProductsTitle>
      )}
    </Grid>
  );
};

const Grid = styled.ul<any>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 50px;
  row-gap: 30px;

  @media ${devices.laptopM} {
    column-gap: ${(props) => props.laptopColumnGap ?? '90px'};
    grid-template-areas: ${(props) => props.laptopGridTemplateAreas ?? ''};
    grid-template-columns: ${(props) =>
      props.laptopGridTemplateColumns ?? 'repeat(3, 1fr)'};
  }

  @media ${devices.laptopS} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: ${(props) => props.laptopColumnGap ?? '90px'};
  }
`;

const EmptyProductsTitle = styled.h3`
  white-space: nowrap;
`;

export default ProductGrid;
