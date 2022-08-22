import CartFooter from 'components/store/cart/CartFooter';
import CartItem from 'components/store/cart/cartItem';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateCart } from 'redux/slicers/store/cartSlicer';
import { TCartState } from 'redux/types';
import styled from 'styled-components';
import { OrderProduct, Product } from 'swagger/services';
import FilterCheckbox from 'ui-kit/FilterCheckbox';
import { FilterCheckboxSize } from 'ui-kit/FilterCheckbox/types';
import Loading from 'ui-kit/Loading';

const CatalogPage = () => {
  const { cart, loading } = useAppSelector<TCartState>((state) => state.cart);
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleItemRemove = async (product: Product) => {
    await dispatch(
      updateCart({
        orderProducts: cart?.orderProducts
          ?.filter((orderProduct) => orderProduct.product?.id != product.id)
          .map((orderProduct) => ({
            productId: orderProduct.product?.id?.toString(),
            qty: orderProduct.qty,
          })),
      }),
    );
  };

  const handleItemCountChange = (counter: number, product: Product) => {
    dispatch(
      updateCart({
        orderProducts: cart?.orderProducts
          ?.filter((orderProduct) => orderProduct.product?.id != product.id)
          ?.concat({ product: { id: product.id }, qty: counter })
          .map((orderProduct) => ({
            productId: orderProduct.product?.id,
            qty: orderProduct.qty,
          })),
      }),
    );
  };

  const handleItemSelect = (item: OrderProduct) => {
    setSelected((prev) => {
      if (prev.find((id) => item.id === id)) {
        return prev.filter((id) => item.id !== id);
      }

      return prev.concat(item.id!);
    });
  };

  const checkIfSelected = (item: OrderProduct) => {
    return !!selected.find((id) => id === item.id);
  };

  const handleSelecteAll = (checked: boolean) => {
    if (checked) {
      setSelected(cart?.orderProducts!?.map((item) => item.id!));

      return;
    }

    setSelected([]);
  };

  const handleRemoveClick = () => () => {
    selected.forEach(async (id) => {
      const orderProduct = cart?.orderProducts?.find((item) => item.id === id);
      await handleItemRemove(orderProduct?.product!);
    });
  };

  return (
    <Container
      variants={variants.fadInOut}
      key="header"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="column"
      justify_content="center"
      style={{ backgroundColor: '#F6F6F6', padding: '35px 15px 50px' }}
    >
      <Wrapper>
        <Content
          style={{ minHeight: 'calc(90vh + 124px)', paddingTop: '110px' }}
          flex_direction="column"
        >
          <PageTitle>Корзина</PageTitle>
          {!loading ? (
            <>
              <CartBody>
                <Actions>
                  <FilterCheckbox
                    label={'Выбрать все'}
                    onChange={handleSelecteAll}
                    size={FilterCheckboxSize.Big}
                  />
                  {!!selected.length && (
                    <DeleteBtn onClick={handleRemoveClick()}>Удалить</DeleteBtn>
                  )}
                </Actions>
                <CartItems>
                  {cart?.orderProducts?.map((item, index) => {
                    return (
                      <CartItem
                        key={`cart-item-page-${index}`}
                        item={item}
                        selected={checkIfSelected(item)}
                        onSelect={handleItemSelect}
                        onRemove={handleItemRemove}
                        onCountChange={handleItemCountChange}
                      />
                    );
                  })}
                </CartItems>
              </CartBody>
              <CartFooter cart={cart} />
            </>
          ) : (
            <Loading />
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

CatalogPage.PageLayout = StoreLayout;

const PageTitle = styled.h3`
  font-size: 28px;

  @media ${devices.mobileL} {
    padding-top: 15px;
  }
`;

const CartBody = styled.div`
  background: #f3f3f3;
  border-radius: 24px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Actions = styled.div`
  display: flex;
  border-bottom: 2px solid #dedede;
  padding: 15px;
`;

const CartItems = styled.div``;

const DeleteBtn = styled.button`
  color: #ff0000;
  cursor: pointer;
  margin-left: 30px;
`;

export default CatalogPage;
