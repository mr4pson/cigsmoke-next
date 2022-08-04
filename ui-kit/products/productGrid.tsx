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
  gridStyle?: object;
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
    <Grid style={gridStyle}>
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

const Grid = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: inherit;
  row-gap: 30px;
`;

const EmptyProductsTitle = styled.h3`
  white-space: nowrap;
`;

export default ProductGrid;
