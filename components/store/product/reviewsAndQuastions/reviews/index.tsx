import styled from 'styled-components';
import { useState } from 'react';
import Stars from './Stars';
import UserImagesThumbnail from './UsersImagesThumbnail';
import UserImagesSlider from './UserImagesSlider';
import Review from './Reviews';
import AuthorizeReviewBtn from '../AuthorizeBtn';
import AddReview from './AddReview';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';

const thumbnails = generateArrayOfNumbers(23);

const Reviews = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [reviewsOpen, setReveiwsOpen] = useState(false);
  const [reviewDisplay, setReveiwsDisplay] = useState('none');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagesData, setImagesData] = useState(8);
  const images = generateArrayOfNumbers(imagesData);

  return (
    <ContentContainer>
      <ContentWrapper style={{ alignItems: 'flex-start' }}>
        <UserImagesThumbnail
          setSelectedIndex={setSelectedIndex}
          setOpen={setReveiwsOpen}
          setDisplay={setReveiwsDisplay}
          thumbnails={thumbnails}
          title={'Фото покупателей'}
        />
        <UserImagesSlider
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
          isOpen={reviewsOpen}
          setOpen={setReveiwsOpen}
          display={reviewDisplay}
          setDisplay={setReveiwsDisplay}
          images={images}
          imagesData={imagesData}
          setImagesData={setImagesData}
        />
        <Review />
      </ContentWrapper>
      <ContentWrapper>
        <Stars />
        {isAuthorized ? (
          <AddReview />
        ) : (
          <AuthorizeReviewBtn
            text="Написать отзыв"
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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 0;
  gap: 20px;
  position: relative;
`;

export default Reviews;
