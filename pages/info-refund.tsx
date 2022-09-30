import styled from 'styled-components';
import StoreLayout from 'components/store/storeLayout/layouts';
import color from 'components/store/lib/ui.colors';
import { styleProps } from 'components/store/lib/types';
import DeleveryBox from '../assets/deleveryBox.svg';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import variants from 'components/store/lib/variants';
const InfoDelivery = () => {
  return (
    <Container
      variants={variants.fadInOut}
      key="profile-page"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="column"
      justify_content="center"
      align_items="center"
      padding="200px 0"
      bg_color={color.textPrimary}
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="flex-start"
          gap="30px"
        >
          <h2>Как работает возврат?</h2>
          <span style={{ fontSize: '1rem' }}>
            Наши продукты тестируются и проверяются по заводским стандартам,
            хотя в некоторых случаях могут быть некоторые дефекты, и в этом
            случае мы даем нашим клиентам возможность проверить свой товар при
            получении товара, если клиенты увидят какие-либо дефекты на товар,
            они могут отказаться от получения доставленного товара и вернуть его
            нам, и мы вышлем покупателю замену этого товара. также клиент может
            отменить свой заказ до того, как он получит свой заказ (
            <span style={{ color: color.yellow }}>
              кнопка отмены заказа будет доступна для пользователя на странице
              заказов в течение 24 часов после оплаты, через 24 часов кнопка
              исчезнет, и отменить заказ будет невозможно
            </span>
            )
          </span>
          <h2>Каковы правила возврата?</h2>
          <span style={{ fontSize: '1rem' }}>
            1: Для клиентов, которые получили товар и проверили его состояние,
            возврат товара невозможен.
          </span>
          <span style={{ fontSize: '1rem' }}>
            2: Если клиент запрашивает возврат средств вместо замены товара
            после получения дефектного товара, клиент несет ответственность за
            оплату стоимости доставки и получит возмещение после оплаты
            стоимости доставки.
          </span>
          <span style={{ fontSize: '1rem' }}>
            3: Изменение заказа после получения заказа невозможно
          </span>
        </Content>
      </Wrapper>
    </Container>
  );
};

const DeleveryInfoHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  h3 {
    margin: 0;
  }
`;

const DeleveryInfoContaiener = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gird-template-rows: repeat(3, 1fr);
  border: 1px solid ${color.btnPrimary};
  border-radius: 15px;
`;

const DeleveryInfoItems = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-right: ${(P: styleProps) => P.borderright};
  border-bottom: ${(P: styleProps) => P.borderbottom};
  padding: 5px;
  span {
    font-size: 0.6rem;
    text-align: center;
  }
  .headers-delevery {
    text-align: center;
    font-size: 0.5rem;
    font-family: 'intro';
    color: ${color.hover};
  }
  .prices-delever {
    font-family: 'intro';
    font-size: 1rem;
  }
`;

InfoDelivery.PageLayout = StoreLayout;
export default InfoDelivery;
