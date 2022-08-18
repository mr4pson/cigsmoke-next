import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { Rating } from '@mui/material';
import DeleteSVG from '../../../../assets/close_black.svg';
import Link from 'next/link';
import AddReview from './AddReview';

const ReviewsItems = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const { review } = props;
  return (
    <ReviewsItem>
      <div className="review-info-wrapper">
        <Link href="/product/id">
          <a className="product-title">
            Клавиатура для Lenovo 330-15ikb, 520-15ikb, 320-15ikb, S145-15ast,
            320-15abr...
          </a>
        </Link>
        <span>
          <Rating value={review} size="small" readOnly />
        </span>
        <span className="review-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          expedita maxime ad molestiae, facilis sit unde eaque modi.
        </span>
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
        <img
          src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
          alt=""
        />
      </div>
      {isOpen ? <AddReview setOpen={setOpen} /> : ''}
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
