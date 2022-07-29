import { motion } from 'framer-motion';
import styled from 'styled-components';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { styleProps } from 'components/store/lib/types';
import InfoDropdown from './DropDwonsParrent';
import DeleveryBox from '../../../../../assets/deleveryBox.svg';
const DropDown = () => {
  const fakeData = generateArrayOfNumbers(6);
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
        <h3>Чаша для кальяна Solaris, глина</h3>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit,
        </span>
      </InfoDropdown>
      <InfoDropdown title="Характеристики">
        <SpecsContainer>
          <SpecsKeyValueWrapper>
            {fakeData.map((item, index) => {
              return (
                <li key={index}>
                  <span id="key-specs">Вместимость: :</span>
                </li>
              );
            })}
          </SpecsKeyValueWrapper>
          <SpecsKeyValueWrapper>
            {fakeData.map((item, index) => {
              return (
                <li key={index}>
                  <span>20гр</span>
                </li>
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
          <h3>ВАРИАНТЫ ДОСТАВКИ CIGSMOKE:</h3>
        </DeleveryInfoHeader>
        <DeleverInfoContaiener>
          <DeleverInfoItems borderbottom="1px solid" borderright="1px solid">
            <span className="headers-delevery">Услуги</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid" borderright="1px solid">
            <span className="headers-delevery">Доступный</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid" borderright="1px solid">
            <span className="headers-delevery">Расходы</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid">
            <span className="headers-delevery">Бесплатно, если потратить</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid" borderright="1px solid">
            <span>Стандартная Доставка</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid" borderright="1px solid">
            <span>2-5 рабочих дней</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid" borderright="1px solid">
            <span className="prices-delever">500₽</span>
            {/* TODO add dynamic pricing */}
          </DeleverInfoItems>
          <DeleverInfoItems borderbottom="1px solid">
            <span className="prices-delever">10000₽</span>
            {/* TODO add dynamic pricing */}
          </DeleverInfoItems>
          <DeleverInfoItems borderright="1px solid">
            <span>Экспресс-доставка</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderright="1px solid">
            <span>2-3 рабочих дня</span>
          </DeleverInfoItems>
          <DeleverInfoItems borderright="1px solid">
            <span className="prices-delever">2500₽</span>
            {/* TODO add dynamic pricing */}
          </DeleverInfoItems>
          <DeleverInfoItems>
            <span className="prices-delever">15000₽</span>
            {/* TODO add dynamic pricing */}
          </DeleverInfoItems>
        </DeleverInfoContaiener>
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SpecsKeyValueWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  span {
    font-size: 0.875rem;
  }
  #key-specs {
    font-family: 'intro';
    color: ${color.textSecondary};
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

const DeleverInfoContaiener = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gird-template-rows: repeat(3, 1fr);
  border: 1px solid ${color.btnPrimary};
  border-radius: 15px;
`;

const DeleverInfoItems = styled.li`
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

export default DropDown;
