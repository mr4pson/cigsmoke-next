import Link from 'next/link';
import styled from 'styled-components';
import Pagination from './Pagination';
import Slider from './Slider';
import color from 'components/store/lib/ui.colors';
import ArrowGray from '../../../../../assets/arrowGray.svg';

const Images = (props: any) => {
  return (
    <ImagesContainer>
      <NavWrapper>
        <Link href="/main">
          <a>Main category</a>
        </Link>
        <span>
          <ArrowGray />
        </span>
        <Link href="/main">
          <a>Sub category</a>
        </Link>
        <span>
          <ArrowGray />
        </span>
        <Link href="/main">
          <a>Brands if exiest</a>
        </Link>
      </NavWrapper>
      <ImagesWrapper>
        <Pagination {...props} />

        <Slider {...props} />
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
`;

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  a {
    color: ${color.hover};
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
