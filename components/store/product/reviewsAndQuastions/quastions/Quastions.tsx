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
import moment from 'moment';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import { Modal } from 'antd';
import { useAppDispatch } from 'redux/hooks';
import {
  createQuestionComment,
  deleteQuestion,
  deleteQuestionComment,
  sortQuestions,
} from 'redux/slicers/store/productInfoSlicer';
import { Reaction } from 'common/enums/reaction.enum';
import { getReactionNumber } from '../reviews/helpers';
import {
  handleCommentReactionClick,
  handleQuestionReactionClick,
} from './helpers';
import styled from 'styled-components';
import { Role } from 'common/enums/roles.enum';

const Quastion = ({ product }) => {
  const dispatch = useAppDispatch();
  const [filterValue, setFilterValue] = useState('Сначала полезные');
  const user = getUserInfo();
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [questionId, setQuestion] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [isCommentSendVisibleMap, setIsCommentSendVisibleMap] = useState({});
  const [commentValueMap, setCommentValueMap] = useState({});

  const onQuestionRemoveClick = (id: string) => () => {
    setIsQuestionModalVisible(true);
    setQuestion(id);
  };

  const handleQuestionRemove = (id: string) => () => {
    setIsQuestionModalVisible(false);
    dispatch(deleteQuestion(id));
  };

  const handleQuestionCancel = () => {
    setIsQuestionModalVisible(false);
  };

  const onCommentRemoveClick = (id: string) => () => {
    setIsCommentModalVisible(true);
    setCommentId(id);
  };

  const handleCommentRemove = (id: string) => () => {
    setIsCommentModalVisible(false);
    dispatch(deleteQuestionComment(id));
  };

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false);
  };

  const handleLeaveCommentClick = (questionId: string) => () => {
    setIsCommentSendVisibleMap((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleCommentValueChange = (questionId: string) => (e) => {
    setCommentValueMap((prev) => ({
      ...prev,
      [questionId]: e.target.value,
    }));
  };

  const handleCreateComment =
    (questionId: string, commentValue: string, userId: string) => async () => {
      await dispatch(
        createQuestionComment({ questionId, text: commentValue, userId }),
      );
      setIsCommentSendVisibleMap((prev) => ({
        ...prev,
        [questionId]: false,
      }));
    };

  const handleSortChange = (option) => {
    setFilterValue(option);
    dispatch(sortQuestions(option));
  };
  return (
    <>
      <Filters
        options={quastionsDropdownOption}
        value={filterValue}
        setValue={handleSortChange}
      />
      <ReviewContainer>
        {product?.questions?.map((question) => {
          const isReviewLiked = !!question.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Like,
          );
          const isReviewDisliked = !!question.reactions?.find(
            (reaction) =>
              reaction.userId == user?.id &&
              reaction.reaction === Reaction.Dislike,
          );
          const likeNum = getReactionNumber(question.reactions, Reaction.Like);
          const dislikeNum = getReactionNumber(
            question.reactions,
            Reaction.Dislike,
          );

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
                    <div className="user-profile-img">
                      <img
                        src={`https://avatars.dicebear.com/api/micah/${question?.user?.id}.svg?facialHairProbability=0&mouth[]=smile&scale=70&hair[]=fonze,full,pixie`}
                        alt="profile"
                      />
                    </div>
                    <div className="side-line"></div>
                  </UserImageWrapper>
                  <ReviewReplyItem>
                    <div className="review-header">
                      <h3>{question.user?.firstName}</h3>
                      <span className="date-stars">
                        <span className="post-date">
                          {moment(question.createdAt!).format('DD.MM.YYYY')}
                          {question.user?.id == user?.id && (
                            <button
                              onClick={onQuestionRemoveClick(question.id!)}
                            >
                              Удалить
                            </button>
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="user-post-text">
                      <h3>Вопрос</h3>
                      <span>{question.text}</span>
                    </div>
                    <LikeDisLike
                      likeNum={likeNum}
                      dislikeNum={dislikeNum}
                      isLiked={isReviewLiked}
                      isDisliked={isReviewDisliked}
                      bgColor={color.textPrimary}
                      onLikeClick={handleQuestionReactionClick(
                        question,
                        dispatch,
                        Reaction.Like,
                        user,
                      )}
                      onDislikeClick={handleQuestionReactionClick(
                        question,
                        dispatch,
                        Reaction.Dislike,
                        user,
                      )}
                    />
                  </ReviewReplyItem>
                </ReviewReplyContent>
              </ReviewReplyWrapper>
              {question.comments.map((comment) => {
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
                        <span className="reply-logo">Wuluxe</span>
                        <div className="side-line"></div>
                      </UserImageWrapper>
                      <ReviewReplyItem>
                        <div className="review-header">
                          <div className="replied-to-wrapper">
                            <h3>Wuluxe</h3>
                            <span>{`в ответ ${question.user?.firstName}`}</span>
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
                            question,
                            comment,
                            dispatch,
                            Reaction.Like,
                            user,
                          )}
                          onDislikeClick={handleCommentReactionClick(
                            question,
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
              {!isCommentSendVisibleMap[question?.id!] &&
                user?.role === Role.Admin && (
                  <LoadMoreBtnWrapper>
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={variants.boxShadow}
                      onClick={handleLeaveCommentClick(question?.id!)}
                    >
                      Оставить комментарий
                    </motion.button>
                  </LoadMoreBtnWrapper>
                )}
              {isCommentSendVisibleMap[question?.id!] && (
                <UserCommentWrapper>
                  <UserCommentField
                    placeholder="Напишите комментарий"
                    onChange={handleCommentValueChange(question?.id!)}
                  />
                  <SendUserCommentBtn
                    onClick={handleCreateComment(
                      question?.id!,
                      commentValueMap[question?.id!],
                      user?.id!,
                    )}
                  >
                    Отправить
                  </SendUserCommentBtn>
                </UserCommentWrapper>
              )}
            </>
          );
        })}
        <LoadMoreBtnWrapper>
          {/* <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            // onClick={() => setReveiwsData(reviewData + 1)}
          >
            Еще...
          </motion.button> */}
        </LoadMoreBtnWrapper>
      </ReviewContainer>
      <Modal
        title={'Вы действительно хотите удалить этот вопрос?'}
        visible={isQuestionModalVisible}
        onOk={handleQuestionRemove(questionId)}
        onCancel={handleQuestionCancel}
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

export default Quastion;
