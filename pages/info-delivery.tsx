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
          <h3>КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?</h3>
          <span style={{ fontSize: '1rem', fontWeight: '600' }}>
            Мы делаем все возможное, чтобы ваш заказ был доставлен вовремя и в
            полном объеме. Однако обратите внимание, что в периоды пикового
            спроса (например, в выходные дни Черной пятницы, на Рождество и в
            День святого Валентина) доставка может занять больше времени, чем
            ожидалось.
          </span>
          <DeleveryInfoHeader>
            <DeleveryBox />
            <h3>ВАРИАНТЫ ДОСТАВКИ WULUXE:</h3>
          </DeleveryInfoHeader>
          <DeleveryInfoContaiener>
            <DeleveryInfoItems borderbottom="1px solid" borderright="1px solid">
              <span className="headers-delevery">Услуги</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid" borderright="1px solid">
              <span className="headers-delevery">Доступный</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid" borderright="1px solid">
              <span className="headers-delevery">Расходы</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid">
              <span className="headers-delevery">
                Бесплатно, если потратить
              </span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid" borderright="1px solid">
              <span>Стандартная Доставка</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid" borderright="1px solid">
              <span>2-5 рабочих дней</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid" borderright="1px solid">
              <span className="prices-delever">150₽</span>
              {/* TODO add dynamic pricing */}
            </DeleveryInfoItems>
            <DeleveryInfoItems borderbottom="1px solid">
              <span className="prices-delever">5000₽</span>
              {/* TODO add dynamic pricing */}
            </DeleveryInfoItems>
            <DeleveryInfoItems borderright="1px solid">
              <span>Экспресс-доставка</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderright="1px solid">
              <span>2-3 рабочих дня</span>
            </DeleveryInfoItems>
            <DeleveryInfoItems borderright="1px solid">
              <span className="prices-delever">500₽</span>
              {/* TODO add dynamic pricing */}
            </DeleveryInfoItems>
            <DeleveryInfoItems>
              <span className="prices-delever">10000₽</span>
              {/* TODO add dynamic pricing */}
            </DeleveryInfoItems>
          </DeleveryInfoContaiener>
          <span>
            Обратите внимание, что примерная стоимость доставки зависит от
            вашего местоположения, и курьеры могут продлить окно доставки, если
            ваше местоположение классифицируется как «удаленное». Пожалуйста,
            свяжитесь с нашей службой поддержки клиентов для получения
            дополнительной информации по этому вопросу. Если вы заказываете
            товары на нашем сайте, ваш заказ может облагаться импортными
            пошлинами и налогами, которые применяются, когда доставка достигает
            пункта назначения за пределами Великобритании. Обратите внимание,
            что мы не контролируем эти сборы и не можем предсказать их сумму.
            Оплата любых таких импортных пошлин и налогов является обязанностью
            покупателя. Пожалуйста, свяжитесь с местной таможней для получения
            дополнительной информации.
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
