import styled from 'styled-components';
import color from '../lib/ui.colors';
import Link from 'next/link';
import VkSvg from '../../../assets/vkcolored.svg';
import OkSvg from '../../../assets/okcolored.svg';
import TelegramSvg from '../../../assets/telegramcolored.svg';

const Footer = () => {
  const copyRighYear = new Date().getFullYear();
  return (
    <Container>
      <Wrapper>
        <Link href="/copyright">
          <a>
            <span>
              © {copyRighYear} ООО «Интернет Решения». Все права защищены.
            </span>
          </a>
        </Link>
        <SocialWrapper>
          <Link href="vk.com/wuluxe">
            <a title="vk">
              <span>
                <VkSvg />
              </span>
            </a>
          </Link>
          <Link href="ok.com/wuluxe">
            <a title="ok">
              <span>
                <OkSvg />
              </span>
            </a>
          </Link>
          <Link href="tm.com/wuluxe">
            <a title="telegram">
              <span>
                <TelegramSvg />
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

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: cetner;
  align-items: center;
  gap: 20px;
`;

export default Footer;
