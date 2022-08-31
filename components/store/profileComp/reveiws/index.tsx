import styled from 'styled-components';
import { Container, Header } from '../common';
import ReviewsItems from './ReviewItems';
import { useMemo, useEffect } from 'react';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUserReviews } from 'redux/slicers/store/profileSlicer';
import { TProfileState } from 'redux/types';
const Reveiws = (props: any) => {
  const dispatch = useAppDispatch();
  const user = getUserInfo();
  const { reveiwsRef, setActive } = props;
  const { reviews } = useAppSelector<TProfileState>((state) => state.profile);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('reveiws');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(reveiwsRef.current);
    dispatch(fetchUserReviews(user?.id!));

    return () => {
      observer.disconnect();
    };
  }, [reveiwsRef, observer]);
  return (
    <Container id="reviews" ref={reveiwsRef}>
      <Header>Напишите отзывы</Header>
      {reviews.length ? (
        <ReviewsList>
          {reviews?.map((review, index) => {
            return <ReviewsItems review={review} key={index} />;
          })}
        </ReviewsList>
      ) : (
        <div>У вас еще нет отзывов</div>
      )}
    </Container>
  );
};

const ReviewsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

export default Reveiws;
