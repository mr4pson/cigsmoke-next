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
import { SWIPE_CONFIDENCE_THRESHOLD, image } from '../../constants';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import CloseBtn from '../../../../../assets/close.svg';
import { devices } from 'components/store/lib/Devices';

const UserImagesSlider = (props: any) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  return (
    <Slidercontainer
      style={{ display: props.display }}
      custom={props.isOpen ? 0 : 0.3}
      animate={props.isOpen ? 'animate' : 'init'}
      variants={variants.fadInSlideUp}
    >
      <SliderContent>
        <StarsWrapper
          custom={props.isOpen ? 0.1 : 0}
          animate={props.isOpen ? 'animate' : 'init'}
          variants={variants.fadInSlideUp}
        >
          <span className="rating-image">Отзыв</span>
          <Rating value={4} size="medium" readOnly />
        </StarsWrapper>
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
            props.setOpen(false);
            setTimeout(() => props.setDisplay('none'), 300);
          }}
        >
          <ArrowSpan>
            <CloseBtn />
          </ArrowSpan>
        </ArrowBtns>
        <SliderWrapper
          custom={props.isOpen ? 0.1 : 0}
          animate={props.isOpen ? 'animate' : 'init'}
          variants={variants.fadInSlideUp}
        >
          <AnimatePresence initial={false} custom={direction}>
            <SliderImage
              key={page}
              src={image}
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
            <ReviewHeaderWrapper
              custom={props.isOpen ? 0.15 : 0.5}
              animate={props.isOpen ? 'animate' : 'init'}
              variants={variants.fadInSlideUp}
            >
              <h3>Комментарии</h3>
              <span>1</span>
            </ReviewHeaderWrapper>
            <UserReviewWrapper
              custom={props.isOpen ? 0.2 : 0.1}
              animate={props.isOpen ? 'animate' : 'init'}
              variants={variants.fadInSlideUp}
            >
              <img src={image} alt="" />
              <div className="user-review">
                <h3>User name</h3>
                <span className="review-date">19.07.2022</span>
                <span className="user-post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia suscipit quod culpa aut. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Suscipit ut veniam unde sed
                  adipisci error ipsa dolore repellendus in accusamus. Officiis,
                  sapiente! Delectus eveniet est assumenda voluptatum a? Enim,
                  esse. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia suscipit quod culpa aut. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Suscipit ut veniam unde sed
                  adipisci error ipsa dolore repellendus in accusamus. Officiis,
                  sapiente! Delectus eveniet est assumenda voluptatum a? Enim,
                  esse.
                </span>
              </div>
            </UserReviewWrapper>
            <LikeDisLike bgColor={color.bgProduct} />
          </ReviewAndBtnsWrapper>
          <UserImagePicker {...props} paginate={paginateImage} image={image} />
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
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
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
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  padding: 40px 10px;
  border-left: 1px solid #e2e7ec;
  overflow-y: scroll;
`;

const ReviewAndBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .user-post-text {
    height: 125px;
    overflow-y: scroll;
    @media ${devices.laptopM} {
      height: 200px;
    }
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
  display: flex;
  flex-dirction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
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
