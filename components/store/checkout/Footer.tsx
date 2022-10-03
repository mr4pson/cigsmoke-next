import styled from 'styled-components';
import color from '../lib/ui.colors';
import Link from 'next/link';
import VKSVG from '../../../assets/vkcolored.svg';
import TelegraSVG from '../../../assets/telegramcolored.svg';
import WhatsappSVG from '../../../assets/whatsappcolored.svg';

const Footer = () => {
  const copyRighYear = new Date().getFullYear();
  return (
    <Container>
      <Wrapper>
        <Link href="/copyright-terms">
          <a>
            <span>© {copyRighYear} «Wuluxe». Все права защищены.</span>
          </a>
        </Link>
        <SocialWrapper>
          <Link href="https://vk.com/wuluxe">
            <a target="_blank" rel="noopener noreferrer">
              <span>
                <VKSVG />
              </span>
            </a>
          </Link>
          <Link href="https://t.me/wuluxe">
            <a target="_blank" rel="noopener noreferrer">
              <span>
                <TelegraSVG />
              </span>
            </a>
          </Link>
          <Link href="https://wa.me/+79855675947">
            <a target="_blank" rel="noopener noreferrer">
              <span>
                <WhatsappSVG />
              </span>
            </a>
          </Link>
        </SocialWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${color.textSecondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${color.textPrimary};
    &:hover {
      color: ${color.yellow};
    }
  }
`;

const SocialWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    span {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export default Footer;
