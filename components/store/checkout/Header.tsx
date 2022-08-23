import styled from 'styled-components';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { Wrapper } from './common';
import LogoSVG from '../../../assets/wuluxe.svg';
import Return from '../../../assets/return.svg';
import Delivery from '../../../assets/delivery.svg';
import Progress from './Progress';
import Link from 'next/link';

const Header = (props: any) => {
  return (
    <>
      <Wrapper
        key={`header-checkout`}
        custom={0.05}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.05 } }}
        variants={variants.fadInSlideUp}
        style={{ gap: '20px' }}
        flexDirectionMobile={'column!important'}
      >
        <Link href="/">
          <a>
            <span>
              <LogoSVG style={{ width: '125px' }} />
            </span>
          </a>
        </Link>
        <InfoWrapper>
          {/* <span>
            <Return />
          </span>
          <div className="info-text">
            <h3>Гарантия легкого возврата</h3>
            <span>Заберем товар и быстро вернем деньги</span>
          </div> */}
          <span>
            <Delivery />
          </span>
          <div className="info-text">
            <h3>Бесплатная доставка курьером от {`2 500`} ₽</h3>
            <span>
              Доставка заказов до {`2 500`} ₽ – {`149`} ₽ / {`249 `}₽
            </span>
          </div>
        </InfoWrapper>
      </Wrapper>
      <Progress {...props} />
    </>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  .info-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: flex-start;
    gap: 5px;
    h3 {
      font-family: 'intro';
    }
    span {
      color: ${color.textSecondary};
    }
  }
`;

export default Header;
