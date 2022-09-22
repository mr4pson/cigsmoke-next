import Link from 'next/link';
import styled from 'styled-components';
import Pagination from './Pagination';
import Slider from './Slider';
import color from 'components/store/lib/ui.colors';
import ArrowGray from '../../../../../assets/arrowGray.svg';
import { Product } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import { devices } from 'components/store/lib/Devices';

type Props = {
  product?: Product;
  images: string[];
  selectedIndex: number;
  direction: number;
  page: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<[number, number]>>;
};

const Images: React.FC<Props> = ({
  selectedIndex,
  direction,
  product,
  images,
  page,
  setSelectedIndex,
  paginateImage,
  setPage,
}) => {
  return (
    <ImagesContainer>
      <NavWrapper>
        {!!product?.category?.parent && (
          <Link href={`/catalog?categories=${product?.category?.parent.url}`}>
            <a title={product?.category?.parent?.name}>
              {product?.category?.parent?.name?.length! > 16
                ? `${product?.category?.parent?.name?.slice(0, 16)}..`
                : product?.category?.parent?.name}
            </a>
          </Link>
        )}
        <span>
          <ArrowGray />
        </span>
        {!!product?.category && (
          <Link
            href={`/catalog?categories=${product?.category?.parent?.url}&subCategories=${product?.category?.url}`}
          >
            <a title={product?.category?.name}>
              {product?.category?.name?.length! > 20
                ? `${product?.category?.name?.slice(0, 20)}..`
                : product?.category?.name}
            </a>
          </Link>
        )}
        <span>
          <ArrowGray />
        </span>
        {!!product?.brand && (
          <Link
            href={`/catalog?categories=${product?.category?.parent?.url}&subCategories=${product?.category?.url}&&brands=${product?.brand?.url}`}
          >
            <a title={product?.brand?.name}>
              {product?.brand?.name?.length! > 20
                ? `${product?.brand?.name?.slice(0, 20)}..`
                : product?.brand?.name}
            </a>
          </Link>
        )}
      </NavWrapper>
      <ImagesWrapper>
        <Pagination
          images={images}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          paginateImage={paginateImage}
          alt={product?.name}
        />

        <Slider
          images={images}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          direction={direction}
          page={page}
          paginateImage={paginateImage}
          alt={product?.name}
        />
      </ImagesWrapper>
    </ImagesContainer>
  );
};

const ImagesContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  position: sticky;
  top: 0;

  @media ${devices.mobileL} {
    display: none;
  }
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  a {
    color: ${color.yellow};
  }
`;

const ImagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  position: relative;
`;

export default Images;
