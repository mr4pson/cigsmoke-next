import styled from 'styled-components';
import { Container, Header } from '../common';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import ReviewsItems from './ReviewItems';
import { useMemo, useEffect } from 'react';
const reviews = generateArrayOfNumbers(3);
const Reveiws = (props: any) => {
  const { reveiwsRef, setActive } = props;
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('reveiws');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(reveiwsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [reveiwsRef, observer]);
  return (
    <Container id="reviews" ref={reveiwsRef}>
      <Header>Напишите отзывы</Header>
      <ReviewsList>
        {reviews.map((review, index) => {
          return <ReviewsItems review={index} key={index} />;
        })}
      </ReviewsList>
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
