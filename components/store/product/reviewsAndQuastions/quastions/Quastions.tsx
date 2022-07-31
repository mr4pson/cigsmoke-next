import { motion } from 'framer-motion';
import { useState } from 'react';
import Filters from '../Filters';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import LikeDisLike from '../LikeOrDisLike';
import { quastionsDropdownOption, image } from '../../constants';
import {
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyWrapper,
  ReviewReplyContent,
  ReviewReplyItem,
  UserImageWrapper,
} from '../../common';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';

const Quastion = () => {
  const [filterValue, setFilterValue] = useState('Сначала полезные');
  const [reviewData, setReveiwsData] = useState(2);

  const reviews = generateArrayOfNumbers(reviewData);

  return (
    <>
      <Filters
        options={quastionsDropdownOption}
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
                      </span>
                    </div>
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

export default Quastion;
