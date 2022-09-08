import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Advertisement } from 'swagger/services';

type Props = {
  advertisement: Advertisement | undefined;
};
export const LatestProductsBanner: React.FC<Props> = ({ advertisement }) => {
  return (
    <FlexBoxColumn>
      <DiscountWrapper
        key="latest-home-disount-wrapper"
        custom={0.2}
        initial="init"
        animate="animate"
        variants={variants.fadeIn}
      >
        <Link href={advertisement?.link ?? ''}>
          <a>
            <DiscountImg
              key="latest-home-discount-img"
              custom={0.3}
              initial="init"
              animate="animate"
              exit={{ y: -80, opacity: 0, transition: { delay: 0.05 } }}
              src={`/api/images/${advertisement?.image}`}
              variants={variants.fadInSlideUp}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
            />
          </a>
        </Link>
        <motion.h3
          key="latest-home-discount-header"
          custom={0.4}
          initial="init"
          animate="animate"
          exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
          variants={variants.fadInSlideUp}
        >
          НОВИНКИ
        </motion.h3>
        <motion.p
          key="latest-home-discount-text"
          custom={0.5}
          initial="init"
          animate="animate"
          exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
          variants={variants.fadInSlideUp}
        >
          {advertisement?.description}
        </motion.p>
        <Link href={advertisement?.link ?? ''}>
          <motion.a
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
          >
            <motion.button
              key="latest-home-discount-btn"
              custom={0.6}
              initial="init"
              animate="animate"
              exit={{ y: -80, opacity: 0, transition: { delay: 0.2 } }}
              variants={variants.fadInSlideUp}
            >
              Посмотреть
            </motion.button>
          </motion.a>
        </Link>
      </DiscountWrapper>
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

  @media ${devices.laptopS} {
    display: none;
  }
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
    font-family: 'intro';
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
