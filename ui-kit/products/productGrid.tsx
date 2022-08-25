import { devices } from 'components/store/lib/Devices';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Basket, Product, Wishlist } from 'swagger/services';
import Loading from 'ui-kit/Loading';
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
  loading?: boolean;
  gridStyle?: any;
  emptyProductsTitle?: string;
  children?: JSX.Element;
};

const ProductGrid: React.FC<Props> = ({
  products,
  emptyProductsTitle,
  gridStyle,
  children,
  loading,
}) => {
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const wishlist: Wishlist = useAppSelector((state) => state.global.wishlist);
  const delay = getAnimationDelay(products.length);
  const dispatch = useAppDispatch();

  return (
    <Grid
      laptopGridTemplateAreas={gridStyle?.laptopGridTemplateAreas}
      laptopSGridTemplateAreas={gridStyle?.laptopSGridTemplateAreas}
      laptopGridTemplateColumns={gridStyle?.laptopGridTemplateColumns}
      laptopColumnGap={gridStyle?.laptopColumnGap}
      laptopSColumnGap={gridStyle?.laptopSColumnGap}
      style={gridStyle}
    >
      {!loading ? (
        <>
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
                  onCartBtnClick={handleCartBtnClick(
                    product,
                    dispatch,
                    product.productVariants![0],
                    cart,
                  )}
                  onWishBtnClick={handleWishBtnClick(
                    product,
                    dispatch,
                    wishlist,
                  )}
                />
              );
            })
          ) : (
            <EmptyProductsTitle>
              {emptyProductsTitle ?? 'Список продуктов пуст'}
            </EmptyProductsTitle>
          )}
        </>
      ) : (
        <Loading />
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
    grid-template-columns: ${(props) =>
      props.laptopGridTemplateColumns ?? 'repeat(3, 1fr)'};
    column-gap: ${(props) => props.laptopSColumnGap ?? '34px'};
    grid-template-areas: ${(props) => props.laptopSGridTemplateAreas ?? ''};
  }

  @media ${devices.mobileL} {
    // grid-template-columns: repeat(1, 0fr);
    // grid-template-areas: 'subscribe' !important;
    // justify-content: center;
    display: flex;
    flex-direction: column;
  }
`;

const EmptyProductsTitle = styled.h3`
  white-space: nowrap;
`;

export default ProductGrid;
