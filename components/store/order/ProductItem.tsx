import { formatNumber } from 'common/helpers/number.helper';
import Link from 'next/link';
import { Product } from 'swagger/services';

type Props = {
  product: Product;
};
const ProductItem: React.FC<Props> = ({ product }) => {
  const images = product.images?.split(', ');
  return (
    <div className="product">
      <div className="image-wrapper">
        <img src={`/api/images/${images ? images[0] : ''}`} alt="" />
      </div>
      <div className="product-image-column">
        <Link href={`/product/${product.url}`}>
          <a>{product.name}</a>
        </Link>
        <b>
          <span>{formatNumber(product.price)} ₽</span>
          {product.oldPrice && (
            <span className="discount">{formatNumber(product.oldPrice)} ₽</span>
          )}
        </b>
      </div>
    </div>
  );
};

export default ProductItem;
