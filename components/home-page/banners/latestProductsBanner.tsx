import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';

export const LatestProductsBanner = () => {
  return (
    <FlexBoxColumn>
      <AnimatePresence>
        <DiscountWrapper
          key="disount-wrapper"
          custom={0.2}
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadeIn}
        >
          <AnimatePresence>
            <DiscountImg
              key="discount-img"
              custom={0.5}
              initial="init"
              animate="animate"
              exit="exit"
              src="/static/pm40.webp"
              variants={variants.fadInSlideUp}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
            />
            <motion.h3
              key="discount-header"
              custom={0.8}
              initial="init"
              animate="animate"
              exit="exit"
              variants={variants.fadInSlideUp}
            >
              НОВИНКИ
            </motion.h3>
            <motion.p
              key="discount-text"
              custom={1.1}
              initial="init"
              animate="animate"
              exit="exit"
              variants={variants.fadInSlideUp}
            >
              Только в этом сезонe действует скидка на Vaperesso Luxe
            </motion.p>
            <Link href="/">
              <motion.a
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
              >
                <AnimatePresence>
                  <motion.button
                    key="discount-btn"
                    custom={1.4}
                    initial="init"
                    animate="animate"
                    exit="exit"
                    variants={variants.fadInSlideUp}
                  >
                    Посмотреть
                  </motion.button>
                </AnimatePresence>
              </motion.a>
            </Link>
          </AnimatePresence>
        </DiscountWrapper>
      </AnimatePresence>
    </FlexBoxColumn>
  );
};

const FlexBoxColumn = styled.div`
  width: 100%;
  height: 462px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 9;
`;

const DiscountWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.bgSecondary};
  border-radius: 25px;
  gap: 15px;
  padding: 20px;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    width: 160px;
    text-align: center;
    margin: 0;
    font-size: 15px;
    font-weight: 500;
  }
  button {
    width: 130px;
    height: 45px;
    background: ${color.btnPrimary};
    color: ${color.textPrimary};
    border: none;
    border-radius: 8px;
    align-items: center;
  }
  a {
    border-radius: 8px;
  }
`;

const DiscountImg = styled(motion.img)`
  width: 149px;
  border-radius: 25px;
`;

export default LatestProductsBanner;
