import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Stars from './Stars';
import UserImagesThumbnail from './UsersImagesThumbnail';
import UserImagesSlider from './UserImagesSlider';
import Review from './Reviews';
import AuthorizeReviewBtn from '../AuthorizeBtn';
import AddReview from './AddReview';
import { useAppSelector } from 'redux/hooks';
import { TAuthState, TProductInfoState } from 'redux/types';
import { devices } from 'components/store/lib/Devices';

const Reviews = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );
  const [isAuthorized, setAuthorized] = useState(!!user);
  const [reviewsOpen, setReveiwsOpen] = useState(false);
  const [reviewDisplay, setReveiwsDisplay] = useState('none');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isReviewAlreadyPublished = !!product?.reviews?.find(
    (review) => review.user?.id == user?.id,
  );

  const thumbnails = product?.reviews?.reduce((accum: string[], review) => {
    const images = review.images ? review.images.split(', ') : [];
    return images && images.length ? accum.concat(images) : accum;
  }, []);

  useEffect(() => {
    setAuthorized(!!user);
  }, [user]);

  return (
    <ContentContainer>
      <ContentWrapper style={{ alignItems: 'flex-start' }}>
        {!!thumbnails?.length && (
          <UserImagesThumbnail
            setOpen={setReveiwsOpen}
            setDisplay={setReveiwsDisplay}
            thumbnails={thumbnails}
            title={'Фото покупателей'}
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
          review={undefined}
          // imagesData={imagesData}
          // setImagesData={setImagesData}
        />
        <Review />
      </ContentWrapper>
      <ContentWrapper>
        <Stars />
        {isAuthorized ? (
          !isReviewAlreadyPublished && <AddReview product={product} />
        ) : (
          <AuthorizeReviewBtn
            text="Написать отзыв"
            alertSignIn="Войдите, чтобы добавить отзыв"
            setAuthorized={setAuthorized}
          />
        )}
      </ContentWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;

  @media ${devices.laptopS} {
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 0;
  gap: 20px;
  position: relative;

  @media ${devices.laptopS} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export default Reviews;
