import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Rating } from '@mui/material';
import Filters from '../Filters';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import UserImages from './UsersImagesThumbnail';
import UserImagesSlider from './UserImagesSlider';
import LikeDisLike from '../LikeOrDisLike';
import { reviewDropdownOption, image } from '../../constants';
import {
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyWrapper,
  ReviewReplyContent,
  ReviewReplyItem,
  UserImageWrapper,
} from '../../common';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';

const images = generateArrayOfNumbers(5);
const thumbnails = generateArrayOfNumbers(9);

const Review = () => {
  const [filterValue, setFilterValue] = useState('Сначала полезные');
  const [reviewsOpen, setReveiwsOpen] = useState(false);
  const [reviewDisplay, setReveiwsDisplay] = useState('none');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reviewData, setReveiwsData] = useState(2);

  const reviews = generateArrayOfNumbers(reviewData);

  return (
    <>
      <Filters
        options={reviewDropdownOption}
        value={filterValue}
        setValue={setFilterValue}
      />
      <ReviewContainer>
        {reviews.map(() => {
          return (
            <>
              <ReviewReplyWrapper
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.2}
                variants={variants.fadInSlideUp}
                padding="0"
              >
                <ReviewReplyContent>
                  <UserImageWrapper>
                    <img src={image} alt="" className="user-profile-img" />
                    <div></div>
                  </UserImageWrapper>
                  <ReviewReplyItem>
                    <div className="review-header">
                      <h3>User name</h3>
                      <span className="date-stars">
                        <span className="post-date">19.07.2022</span>
                        <span>
                          <Rating value={4} size="medium" readOnly />
                        </span>
                      </span>
                    </div>
                    <span className="product-details">{`Цвет товара: черный, Российский размер 
                    (обуви): 40,Размер 
                    производителя: US 8,5, Название 
                     цвета: cblack / pugry6 / quaglw`}</span>
                    <div className="user-post-text">
                      <h3>Комментарий</h3>
                      <span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Aperiam perferendis odio enim explicabo sint unde
                        aspernatur ducimus tempora, nihil dolore deleniti.
                        Voluptatibus aspernatur delectus explicabo sit, totam
                        impedit debitis veniam.
                      </span>
                    </div>
                    <UserImagesWrapper>
                      <UserImages
                        setSelectedIndex={setSelectedIndex}
                        setOpen={setReveiwsOpen}
                        setDisplay={setReveiwsDisplay}
                        thumbnails={thumbnails}
                        title={'Фото Покупатель'}
                      />
                      <UserImagesSlider
                        setSelectedIndex={setSelectedIndex}
                        selectedIndex={selectedIndex}
                        isOpen={reviewsOpen}
                        setOpen={setReveiwsOpen}
                        display={reviewDisplay}
                        setDisplay={setReveiwsDisplay}
                        images={images}
                      />
                    </UserImagesWrapper>
                    <LikeDisLike bgColor={color.textPrimary} />
                  </ReviewReplyItem>
                </ReviewReplyContent>
              </ReviewReplyWrapper>
              <ReviewReplyWrapper
                initial="init"
                whileInView="animate"
                viewport={{ once: true }}
                custom={0.3}
                variants={variants.fadInSlideUp}
                padding="50px"
              >
                <ReviewReplyContent>
                  <UserImageWrapper>
                    <span className="reply-logo">CigSmoke</span>
                    <div></div>
                  </UserImageWrapper>
                  <ReviewReplyItem>
                    <div className="review-header">
                      <div className="replied-to-wrapper">
                        <h3>Cigsmoke</h3>
                        <span>{`в ответ User name`}</span>
                      </div>
                      <span className="date-stars">
                        <span className="post-date">19.07.2022</span>
                      </span>
                    </div>
                    <div className="user-post-text">
                      <span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Aperiam perferendis odio enim explicabo sint unde
                        aspernatur ducimus tempora, nihil dolore deleniti.
                        Voluptatibus aspernatur delectus explicabo sit, totam
                        impedit debitis veniam.
                      </span>
                    </div>
                    <LikeDisLike bgColor={color.textPrimary} />
                  </ReviewReplyItem>
                </ReviewReplyContent>
              </ReviewReplyWrapper>
            </>
          );
        })}
        <LoadMoreBtnWrapper>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            onClick={() => setReveiwsData(reviewData + 1)}
          >
            Еще...
          </motion.button>
        </LoadMoreBtnWrapper>
      </ReviewContainer>
    </>
  );
};

const UserImagesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

export default Review;
