import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { useCopyToClipboard } from './helpers';
import Share from '../../../../../assets/share.svg';
import Copy from '../../../../../assets/copy.svg';
import Telegram from '../../../../../assets/telegram.svg';
import Vk from '../../../../../assets/vk.svg';
import Ok from '../../../../../assets/okSocial.svg';
import Twitter from '../../../../../assets/twitter.svg';

const ShareToSocial = () => {
  const router = useRouter();
  const [isCopied, setCopied, copy] = useCopyToClipboard();
  // _______________socila menu hooks _______________
  const [isOpen, setOpen] = useState(false);
  const [display, setDisplay] = useState('none');
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);

  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setOpen,
      setDisplay,
    ),
  );
  const closeHandler = () => {
    setOpen(!isOpen);
    setTimeout(() => {
      setDisplay(display == 'none' ? 'flex' : 'none');
    }, 100);
  };

  return (
    <SocialParent
      key="social-product-page"
      custom={0.2}
      initial="init"
      animate="animate"
      exit={{ y: -30, opacity: 0, transition: { delay: 0.2 } }}
      variants={variants.fadInSlideUp}
    >
      <span id="product-code">{`Код товара: 407729404`}</span>
      <motion.button
        ref={btnNode}
        custom={1.05}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        onClick={() => closeHandler()}
      >
        <Share />
        <span>Поделиться</span>
      </motion.button>
      <ShareToSocialWrapper
        ref={menuNode}
        style={{ display: display }}
        animate={isOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <ul>
          <li
            onClick={() => {
              copy(`cigsmoke.ru/${router.asPath}`);
              setTimeout(() => {
                setCopied(false);
              }, 800);
            }}
          >
            <span style={{ width: '20px' }}>
              <Copy />
            </span>
            <button>
              <motion.span
                animate={!isCopied ? 'animate' : 'exit'}
                variants={variants.fadeOutSlideOut}
              >
                Скопировать ссылку
              </motion.span>
              <motion.span
                animate={isCopied ? 'animate' : 'exit'}
                variants={variants.fadeInSlideIn}
              >
                Ссылка скопирована
              </motion.span>
            </button>
          </li>
          <li>
            <Link href="/">
              <a>
                <span>
                  <Vk />
                </span>
                <span>ВКонтакте</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <span>
                  <Ok />
                </span>
                <span>Одноклассники</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <span>
                  <Telegram />
                </span>
                <span>Telegram</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <span>
                  <Twitter />
                </span>
                <span>Twitter</span>
              </a>
            </Link>
          </li>
        </ul>
      </ShareToSocialWrapper>
    </SocialParent>
  );
};

const SocialParent = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  position: relative;
  #product-code {
    color: ${color.textSecondary};
  }
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: ${color.hover};
    cursor: pointer;
    }
  }
`;

const ShareToSocialWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  top: 35px;
  right: 65px;
  padding: 20px;
  border-radius: 15px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  z-index: 9;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      padding: 5px 0;
      cursor: pointer;
      a {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        color: ${color.textTertiary};
        &:hover {
          color: ${color.hover};
        }
      }
      button {
        width: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        color: ${color.textTertiary};
        span {
          position: absolute;
          cursor: pointer;
          &:hover {
            color: ${color.hover};
          }
        }
      }
    }
  }
`;

export default ShareToSocial;
