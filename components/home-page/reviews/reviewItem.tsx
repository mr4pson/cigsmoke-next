import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Rating } from '@mui/material'; // docs: https://mui.com/material-ui/api/rating/ *** https://mui.com/material-ui/react-rating/
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { Review } from 'swagger/services';
import moment from 'moment';
import Link from 'next/link';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';

type Props = {
  review: Review;
  index: number;
};

const ReviewItem: React.FC<Props> = ({ index, review }) => {
  const images = getProductVariantsImages(review.product!.productVariants);

  return (
    <ItemContainer
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={variants.fadInSlideUp}
    >
      <StarWrapper
        custom={0.4}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <Rating value={review.rating} size="small" readOnly />
      </StarWrapper>
      <h3>{review.product?.name}</h3>
      <div>{review.text?.substring(0, 100)}</div>
      <div id="user">
        <span>{moment(review.createdAt).format('DD.MM.YYYY')}</span>
        <span>
          {review.user?.lastName} {review.user?.firstName}
        </span>
      </div>
      {/* TODO add product id here */}
      <Link href={`/product/${review.product?.url}`}>
        <a>
          <motion.img
            whileHover="hover"
            whileTap="tap"
            custom={1.2}
            variants={variants.grow}
            src={`/api/images/${images[0]}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/assets/images/no_photo.png';
            }}
          />
        </a>
      </Link>
    </ItemContainer>
  );
};

const ItemContainer = styled(motion.li)`
  width: 270px;
  height: 320px;
  background-color: ${color.textPrimary};
  border-radius: 20px;
  box-shadow: 0px 2px 6px ${color.boxShadow};
  diplay: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  h3 {
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
  }
  p {
    width: 100%;
    text-align: left;
    font-size: 0.8rem;
  }
  #user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    aling-items: center;
    color: ${color.ratingEmpty};
  }
  a {
    align-self: center;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    img {
      width: 80px;
      height: 80px;
    }
  }
  @media ${devices.mobileL} {
    min-width: 270px;
  }
`;

const StarWrapper = styled(motion.div)`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export default ReviewItem;
