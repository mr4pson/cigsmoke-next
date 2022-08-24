import { Carousel, Image, Spin } from 'antd';
import { imageFallback } from 'common/constants';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import styles from './index.module.scss';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    height: 5px;
    background: #f0f2f5;
    border: 1px solid #002140;
  }
  > .slick-dots li.slick-active button {
    background: #f0f2f5;
    border: 1px solid #002140;
  }
`;

interface Props {
  isLoading: boolean;
}

const SlidesTab = ({ isLoading }: Props) => {
  const slides = useAppSelector((state) => state.banners.slides);

  return (
    <>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <div>
          <CarouselWrapper>
            {slides?.map((slide) => {
              return (
                <div key={slide?.id}>
                  <a href={'https://' + slide?.link}>
                    <Image
                      className={styles.bannersTab__slidesImageContainer__image}
                      preview={false}
                      src={`/api/images/${slide?.image}`}
                      fallback={imageFallback}
                    />
                  </a>
                </div>
              );
            })}
          </CarouselWrapper>
        </div>
      )}
    </>
  );
};
export default SlidesTab;
