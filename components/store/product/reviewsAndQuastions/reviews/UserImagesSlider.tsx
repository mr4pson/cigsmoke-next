import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Rating } from '@mui/material';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import LikeDisLike from '../LikeOrDisLike';
import { SliderImage } from '../../common';
import UserImagePicker from './UserImagePagination';
import { handleDragEnd } from 'components/home-page/helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import CloseBtn from '../../../../../assets/close.svg';
import { devices } from 'components/store/lib/Devices';
import moment from 'moment';
import { Reaction } from 'common/enums/reaction.enum';
import { getReactionNumber } from './helpers';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';

const UserImagesSlider = ({
  setSelectedIndex,
  selectedIndex,
  isOpen,
  setOpen,
  display,
  setDisplay,
  images,
  review,
  // imagesData,
  // setImagesData,
}) => {
  const user = getUserInfo();
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const isReviewLiked = !!review?.reactions?.find(
    (reaction) =>
      reaction.userId == user?.id && reaction.reaction === Reaction.Like,
  );
  const isReviewDisliked = !!review?.reactions?.find(
    (reaction) =>
      reaction.userId == user?.id && reaction.reaction === Reaction.Dislike,
  );
  const likeNum = getReactionNumber(review?.reactions, Reaction.Like);
  const dislikeNum = getReactionNumber(review?.reactions, Reaction.Dislike);

  return (
    <Slidercontainer
      style={{ display }}
      custom={isOpen ? 0 : 0.3}
      animate={isOpen ? 'animate' : 'init'}
      variants={variants.fadInSlideUp}
    >
      <SliderContent>
        {!!review?.rating && (
          <StarsWrapper
            custom={isOpen ? 0.1 : 0}
            animate={isOpen ? 'animate' : 'init'}
            variants={variants.fadInSlideUp}
          >
            <span className="rating-image">Отзыв</span>
            <Rating value={review?.rating} size="medium" readOnly />
          </StarsWrapper>
        )}
        <ArrowBtns
          position="absolute"
          top="25px"
          right="30px"
          bgcolor={color.btnPrimary}
          custom={1.1}
          whileHover="hover"
          whileTap="tap"
          variants={variants.grow}
          onClick={() => {
            setOpen(false);
            setTimeout(() => setDisplay('none'), 300);
          }}
        >
          <ArrowSpan>
            <CloseBtn />
          </ArrowSpan>
        </ArrowBtns>
        <SliderWrapper
          custom={isOpen ? 0.1 : 0}
          animate={isOpen ? 'animate' : 'init'}
          variants={variants.fadInSlideUp}
        >
          <AnimatePresence initial={false} custom={direction}>
            <SliderImage
              key={page}
              src={`/api/images/${images[selectedIndex]}`}
              custom={direction}
              variants={variants.slider}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd(
                page,
                SWIPE_CONFIDENCE_THRESHOLD,
                setPage,
              )}
            />
          </AnimatePresence>
        </SliderWrapper>
        <ReviewAndPaginateWrapper>
          <ReviewAndBtnsWrapper>
            {!!review && (
              <ReviewHeaderWrapper
                custom={isOpen ? 0.15 : 0.5}
                animate={isOpen ? 'animate' : 'init'}
                variants={variants.fadInSlideUp}
              >
                <h3>Комментарии</h3>
                <span>{review?.comments.length}</span>
              </ReviewHeaderWrapper>
            )}
            <UserReviewWrapper
              custom={isOpen ? 0.2 : 0.1}
              animate={isOpen ? 'animate' : 'init'}
              variants={variants.fadInSlideUp}
            >
              {review?.comments.map((comment) => (
                <div className="user-comment-wrap">
                  <img src={`/static/temp/gamer.png`} alt="" />
                  <div className="user-review">
                    <h3>{comment?.user?.firstName}</h3>
                    <span className="review-date">
                      {moment(comment.createAt).format('DD.MM.YYYY')}
                    </span>
                    <span className="user-post-text">{comment.text}</span>
                  </div>
                </div>
              ))}
            </UserReviewWrapper>
            {!!review && (
              <LikeDisLike
                likeNum={likeNum}
                dislikeNum={dislikeNum}
                isLiked={isReviewLiked}
                isDisliked={isReviewDisliked}
                bgColor={color.textPrimary}
                onLikeClick={() => {}}
                onDislikeClick={() => {}}
              />
            )}
          </ReviewAndBtnsWrapper>
          <UserImagePicker
            // image={image}
            images={images}
            // imagesData={imagesData}
            selectedIndex={selectedIndex}
            paginate={paginateImage}
            // setImagesData={setImagesData}
            setSelectedIndex={setSelectedIndex}
          />
        </ReviewAndPaginateWrapper>
      </SliderContent>
    </Slidercontainer>
  );
};

const Slidercontainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  z-index: 25;
  border-radius: 25px;
`;

const SliderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: reletive;
  padding: 15px;
`;

const SliderWrapper = styled(motion.div)`
  width: calc(100% - 400px);
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media ${devices.laptopS} {
    width: calc(100% - 280px);
  }

  @media ${devices.mobileL} {
    width: calc(100% - 185px);
  }
`;

const StarsWrapper = styled(motion.div)`
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 20px;
  position: absolute;
  top: 25px;
  left: 65px;
  background-color: #0000005e;
  z-index: 10;
  .rating-image {
    color: ${color.textPrimary};
  }
`;

const ReviewAndPaginateWrapper = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  padding: 40px 10px;
  border-left: 1px solid #e2e7ec;
  overflow-y: scroll;

  @media ${devices.laptopS} {
    width: 280px;
  }

  @media ${devices.mobileL} {
    padding-right: 0;
    margin-right: -25px;
    width: 210px;
  }
`;

const ReviewAndBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .user-post-text {
    max-height: 125px;
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
`;

const ReviewHeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-family: 'intro';
  h3 {
    font-size: 1.2rem;
  }
`;

const UserReviewWrapper = styled(motion.div)`
  width: 100%;
  max-height: 500px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .user-comment-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: contain;
    border: 1px solid ${color.textSecondary};
  }
  .user-review {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
    h3 {
      font-size: 1.1rem;
    }
    .review-date {
      color: ${color.textSecondary};
    }
  }
`;

export default UserImagesSlider;
