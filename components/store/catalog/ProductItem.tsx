import styled from 'styled-components';
import { Product } from 'swagger/services';

type Props = {
  data: Product;
};

const ProductItem: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <ProductContent>
      <ProductImageContent>
        <ProductImage
          style={{ backgroundImage: `url(${JSON.parse(data.images!)[0]})` }}
        />
        <FavoriteBtn src="./icons/wishlist-icon.svg"></FavoriteBtn>
      </ProductImageContent>
    </ProductContent>
  );
};

const ProductContent = styled.div``;

const ProductImageContent = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.09);
  overflow: auto;
  position: relative;
`;

const ProductImage = styled.div`
  width: 250px;
  height: 280px;
  background: #ccc;
  background-size: cover;
  background-position: center;
`;

const FavoriteBtn = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 23px;
`;

export default ProductItem;
