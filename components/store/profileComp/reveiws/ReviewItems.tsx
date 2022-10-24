import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { Rating } from '@mui/material';
import DeleteSVG from '../../../../assets/close_black.svg';
import Link from 'next/link';
import AddReview from './AddReview';
import { Review } from 'swagger/services';

type Props = {
  review: Review;
};
const ReviewsItems: React.FC<Props> = ({ review }) => {
  const [isOpen, setOpen] = useState(false);
  const images = review.images?.split(', ');

  return (
    <ReviewsItem>
      <div className="review-info-wrapper">
        <Link href={`/product/${review.product?.url}`}>
          <a className="product-title">{review.product?.name}</a>
        </Link>
        <span>
          <Rating value={review.rating} size="small" readOnly />
        </span>
        <span className="review-text">{review.text}</span>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          className="add-review-btn"
          onClick={() => setOpen(true)}
        >
          Изменить отзыв
        </motion.button>
      </div>
      <div className="product-image-wrapper">
        <motion.span
          custom={1.1}
          whileHover="hover"
          whileTap="tap"
          variants={variants.grow}
        >
          <DeleteSVG />
        </motion.span>
        <img src={`/api/images/${images ? images[0] : ''}`} alt="" />
      </div>
      {isOpen ? <AddReview setOpen={setOpen} review={review} /> : ''}
    </ReviewsItem>
  );
};

const ReviewsItem = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  user-select: none;
  .review-info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    .product-title {
      color: ${color.yellow};
      &:hover {
        color: ${color.hover};
      }
    }
    .review-text {
      width: 80%;
    }
    .add-review-btn {
      width: 130px;
      height: 35px;
      border-radius: 8px;
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
      cursor: pointer;
    }
  }
  .product-image-wrapper {
    width: 30%;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 50px;
    }
  }
`;

export default ReviewsItems;
