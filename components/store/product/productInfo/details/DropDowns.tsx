import { motion } from 'framer-motion';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDownsParrent';
import DeleveryBox from '../../../../../assets/deleveryBox.svg';
import { devices } from 'components/store/lib/Devices';
import { ParameterProduct } from 'swagger/services';

type Props = {
  description?: any;
  parameterProducts?: ParameterProduct[];
};

const DropDowns: React.FC<Props> = ({ description, parameterProducts }) => {
  return (
    <InfoContainer
      key="info-product-page"
      custom={0.3}
      initial="init"
      whileInView="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
      margintop="-35px"
    >
      <InfoDropdown title="Описание">
        <section
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </InfoDropdown>
      <InfoDropdown title="Характеристики">
        <SpecsContainer>
          <SpecsKeyValueWrapper>
            {parameterProducts?.map((item, index) => {
              return (
                <>
                  {item.value == '_' ||
                  item.value == '-' ||
                  item.value == '' ? (
                    ''
                  ) : (
                    <li
                      className="wrapper-key-vlaue"
                      key={`parameter-product-label-${index}`}
                    >
                      <span id="key-specs">{item.parameter?.name}: </span>
                      <span id="value-specs">{item.value}</span>
                    </li>
                  )}
                </>
              );
            })}
          </SpecsKeyValueWrapper>
        </SpecsContainer>
      </InfoDropdown>
      <InfoDropdown title="Информация о доставке">
        <h3>КАКОВА СТОИМОСТЬ И ВАРИАНТЫ ДОСТАВКИ?</h3>
        <span style={{ fontSize: '1rem', fontWeight: '600' }}>
          Мы делаем все возможное, чтобы ваш заказ был доставлен вовремя и в
          полном объеме. Однако обратите внимание, что в периоды пикового спроса
          (например, в выходные дни Черной пятницы, на Рождество и в День
          святого Валентина) доставка может занять больше времени, чем
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
            <span className="headers-delevery">Бесплатно, если потратить</span>
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
          Обратите внимание, что примерная стоимость доставки зависит от вашего
          местоположения, и курьеры могут продлить окно доставки, если ваше
          местоположение классифицируется как «удаленное». Пожалуйста, свяжитесь
          с нашей службой поддержки клиентов для получения дополнительной
          информации по этому вопросу. Если вы заказываете товары на нашем
          сайте, ваш заказ может облагаться импортными пошлинами и налогами,
          которые применяются, когда доставка достигает пункта назначения за
          пределами Великобритании. Обратите внимание, что мы не контролируем
          эти сборы и не можем предсказать их сумму. Оплата любых таких
          импортных пошлин и налогов является обязанностью покупателя.
          Пожалуйста, свяжитесь с местной таможней для получения дополнительной
          информации.
        </span>
      </InfoDropdown>
      <InfoDropdown title="Информация о возврате">
        <h2>Как работает возврат?</h2>
        <span style={{ fontSize: '1rem' }}>
          Наши продукты тестируются и проверяются по заводским стандартам, хотя
          в некоторых случаях могут быть некоторые дефекты, и в этом случае мы
          даем нашим клиентам возможность проверить свой товар при получении
          товара, если клиенты увидят какие-либо дефекты на товар, они могут
          отказаться от получения доставленного товара и вернуть его нам, и мы
          вышлем покупателю замену этого товара. также клиент может отменить
          свой заказ до того, как он получит свой заказ (
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
          2: Если клиент запрашивает возврат средств вместо замены товара после
          получения дефектного товара, клиент несет ответственность за оплату
          стоимости доставки и получит возмещение после оплаты стоимости
          доставки.
        </span>
        <span style={{ fontSize: '1rem' }}>
          3: Изменение заказа после получения заказа невозможно
        </span>
      </InfoDropdown>
    </InfoContainer>
  );
};

const InfoContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  margin-top: ${(P: styleProps) => P.margintop};
  user-select: none;
`;

const SpecsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SpecsKeyValueWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  .wrapper-key-vlaue {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    span {
      font-size: 0.875rem;
    }
    #key-specs {
      width: 100%;
      font-family: 'intro';
      color: ${color.textSecondary};
    }
    #value-specs {
      width: 50%;
    }
  }
`;

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

export default DropDowns;
