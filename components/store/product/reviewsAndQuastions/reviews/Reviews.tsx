import { Rating } from '@mui/material';
import { Modal } from 'antd';
import { Reaction } from 'common/enums/reaction.enum';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import moment from 'moment';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  createComment,
  deleteComment,
  deleteReview,
  sortReviews,
} from 'redux/slicers/store/productInfoSlicer';
import { TProductInfoState } from 'redux/types';
import styled from 'styled-components';
import {
  LoadMoreBtnWrapper,
  ReviewContainer,
  ReviewReplyContent,
  ReviewReplyItem,
  ReviewReplyWrapper,
  UserImageWrapper,
} from '../../common';
import { reviewDropdownOption } from '../../constants';
import Filters from '../Filters';
import LikeDisLike from '../LikeOrDisLike';
import {
  getReactionNumber,
  handleCommentReactionClick,
  handleReviewReactionClick,
} from './helpers';
import UserImagesSlider from './UserImagesSlider';
import UserImages from './UsersImagesThumbnail';

export enum ModalType {
  Review,
  Comment,
}

const Review = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );
  const [filterValue, setFilterValue] = useState('Сначала полезные');
  const [reviewsOpen, setReveiwsOpen] = useState(false);
  const [reviewDisplay, setReveiwsDisplay] = useState('none');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const user = getUserInfo();
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [isCommentSendVisibleMap, setIsCommentSendVisibleMap] = useState({});
  const [commentValueMap, setCommentValueMap] = useState({});
  // const [imagesData, setImagesData] = useState(8);

  const onReviewRemoveClick = (id: string) => () => {
    setIsReviewModalVisible(true);
    setReviewId(id);
  };

  const handleReviewRemove = (id: string) => () => {
    setIsReviewModalVisible(false);
    dispatch(deleteReview(id));
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
  };

  const onCommentRemoveClick = (id: string) => () => {
    setIsCommentModalVisible(true);
    setCommentId(id);
  };

  const handleCommentRemove = (id: string) => () => {
    setIsCommentModalVisible(false);
    dispatch(deleteComment(id));
  };

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false);
  };

  const handleLeaveCommentClick = (reviewId: string) => () => {
    setIsCommentSendVisibleMap((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleCommentValueChange = (reviewId: string) => (e) => {
    setCommentValueMap((prev) => ({
      ...prev,
      [reviewId]: e.target.value,
    }));
  };

  const handleCreateComment =
    (reviewId: string, commentValue: string, userId: string) => async () => {
      await dispatch(createComment({ reviewId, text: commentValue, userId }));
      setIsCommentSendVisibleMap((prev) => ({
        ...prev,
        [reviewId]: false,
      }));
    };

  const handleSortChange = (option) => {
    setFilterValue(option);
    dispatch(sortReviews(option));
  };

  return (
    <>
      <Filters
        options={reviewDropdownOption}
        value={filterValue}
        setValue={handleSortChange}
      />
      <ReviewContainer>
        {!product?.reviews?.length && <div>Отзывов пока нет.</div>}
        {product?.reviews?.map((review, key) => {
          const isReviewLiked = !!review.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Like,
          );
          const isReviewDisliked = !!review.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Dislike,
          );
          const likeNum = getReactionNumber(review.reactions, Reaction.Like);
          const dislikeNum = getReactionNumber(
            review.reactions,
            Reaction.Dislike,
          );
          const thumbnails = review.images ? review.images?.split(', ') : [];

          return (
            <React.Fragment key={`review-${key}`}>
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
                    <div className="user-profile-img">
                      <img
                        src={`https://avatars.dicebear.com/api/micah/${review.user?.id}.svg?facialHairProbability=0&mouth[]=smile&scale=70&hair[]=fonze,full,pixie`}
                        alt="profile"
                      />
                    </div>
                    <div className="side-line"></div>
                  </UserImageWrapper>
                  <ReviewReplyItem>
                    <div className="review-header">
                      <h3>{review?.user?.firstName}</h3>
                      <span className="date-stars">
                        <span className="post-date">
                          {moment(review.createdAt).format('DD.MM.YYYY')}
                          {review.user?.id == user?.id && (
                            <button onClick={onReviewRemoveClick(review.id!)}>
                              Удалить
                            </button>
                          )}
                        </span>
                        <span>
                          <Rating
                            value={review.rating}
                            size="medium"
                            readOnly
                          />
                        </span>
                      </span>
                    </div>
                    {/* <span className="product-details">{`Цвет товара: черный, Российский размер 
                    (обуви): 40,Размер 
                    производителя: US 8,5, Название 
                     цвета: cblack / pugry6 / quaglw`}</span> */}
                    <div className="user-post-text">
                      <h3>Отзыв</h3>
                      <span>{review.text}</span>
                    </div>
                    <UserImagesWrapper>
                      {!!review.images?.length && (
                        <UserImages
                          setOpen={setReveiwsOpen}
                          setDisplay={setReveiwsDisplay}
                          thumbnails={thumbnails}
                          title={'Вложения'}
                        />
                      )}
                      <UserImagesSlider
                        setSelectedIndex={setSelectedIndex}
                        selectedIndex={selectedIndex}
                        isOpen={reviewsOpen}
                        setOpen={setReveiwsOpen}
                        display={reviewDisplay}
                        setDisplay={setReveiwsDisplay}
                        images={thumbnails}
                        review={review}
                        // imagesData={imagesData}
                        // setImagesData={setImagesData}
                      />
                    </UserImagesWrapper>
                    <LikeDisLike
                      likeNum={likeNum}
                      dislikeNum={dislikeNum}
                      isLiked={isReviewLiked}
                      isDisliked={isReviewDisliked}
                      bgColor={color.textPrimary}
                      onLikeClick={handleReviewReactionClick(
                        review,
                        dispatch,
                        Reaction.Like,
                        user,
                      )}
                      onDislikeClick={handleReviewReactionClick(
                        review,
                        dispatch,
                        Reaction.Dislike,
                        user,
                      )}
                    />
                  </ReviewReplyItem>
                </ReviewReplyContent>
              </ReviewReplyWrapper>
              {review.comments?.map((comment) => {
                const isCommentLiked = !!comment.reactions?.find(
                  (reaction) =>
                    reaction.userId == user?.id &&
                    reaction.reaction === Reaction.Like,
                );
                const isCommentDisliked = !!comment.reactions?.find(
                  (reaction) =>
                    reaction.userId == user?.id &&
                    reaction.reaction === Reaction.Dislike,
                );
                const likeNum = getReactionNumber(
                  comment.reactions,
                  Reaction.Like,
                );
                const dislikeNum = getReactionNumber(
                  comment.reactions,
                  Reaction.Dislike,
                );

                return (
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
                        <div className="user-profile-img">
                          <img
                            src={`https://avatars.dicebear.com/api/micah/${comment.user?.id}.svg?facialHairProbability=0&mouth[]=smile&scale=70&hair[]=fonze,full,pixie`}
                            alt="profile"
                          />
                        </div>
                        <div className="side-line"></div>
                      </UserImageWrapper>
                      <ReviewReplyItem>
                        <div className="review-header">
                          <div className="replied-to-wrapper">
                            <h3>{comment.user?.firstName}</h3>
                            <span>{`в ответ ${review.user?.firstName}`}</span>
                          </div>
                          <span className="date-stars">
                            <span className="post-date">
                              {moment(comment.createdAt).format('DD.MM.YYYY')}
                              {comment.user?.id == user?.id && (
                                <button
                                  onClick={onCommentRemoveClick(comment.id!)}
                                >
                                  Удалить
                                </button>
                              )}
                            </span>
                          </span>
                        </div>
                        <div className="user-post-text">
                          <span>{comment.text}</span>
                        </div>
                        <LikeDisLike
                          likeNum={likeNum}
                          dislikeNum={dislikeNum}
                          isLiked={isCommentLiked}
                          isDisliked={isCommentDisliked}
                          bgColor={color.textPrimary}
                          onLikeClick={handleCommentReactionClick(
                            review,
                            comment,
                            dispatch,
                            Reaction.Like,
                            user,
                          )}
                          onDislikeClick={handleCommentReactionClick(
                            review,
                            comment,
                            dispatch,
                            Reaction.Dislike,
                            user,
                          )}
                        />
                      </ReviewReplyItem>
                    </ReviewReplyContent>
                  </ReviewReplyWrapper>
                );
              })}
              {!isCommentSendVisibleMap[review?.id!] && (
                <LoadMoreBtnWrapper>
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                    onClick={handleLeaveCommentClick(review?.id!)}
                  >
                    Оставить комментарий
                  </motion.button>
                </LoadMoreBtnWrapper>
              )}
              {isCommentSendVisibleMap[review?.id!] && (
                <UserCommentWrapper>
                  <UserCommentField
                    placeholder="Напишите комментарий"
                    onChange={handleCommentValueChange(review?.id!)}
                  />
                  <SendUserCommentBtn
                    onClick={handleCreateComment(
                      review?.id!,
                      commentValueMap[review?.id!],
                      user?.id!,
                    )}
                  >
                    Отправить
                  </SendUserCommentBtn>
                </UserCommentWrapper>
              )}
            </React.Fragment>
          );
        })}
      </ReviewContainer>
      <Modal
        title={'Вы действительно хотите удалить этот отзыв?'}
        visible={isReviewModalVisible}
        onOk={handleReviewRemove(reviewId)}
        onCancel={handleReviewCancel}
      ></Modal>
      <Modal
        title={'Вы действительно хотите удалить этот комментарий?'}
        visible={isCommentModalVisible}
        onOk={handleCommentRemove(commentId)}
        onCancel={handleCommentCancel}
      ></Modal>
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

const UserCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const UserCommentField = styled.textarea`
  width: 100%;
  max-width: 660px;
  min-height: 100px;
  max-height: 400px;
  display: block;
  background: #ccc;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  padding: 20px;
  outline: none;
  user-select: none;
`;

const SendUserCommentBtn = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 15px;
  background-color: ${color.btnPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'intro';
  color: ${color.textPrimary};
  margin-top: 20px;
`;

export default Review;
