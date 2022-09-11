import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { formatNumber } from 'common/helpers/number.helper';
import Link from 'next/link';
import { OrderProduct } from 'swagger/services';

type Props = {
  orderProduct: OrderProduct;
};
const ProductItem: React.FC<Props> = ({ orderProduct }) => {
  const curVariant = orderProduct.productVariant
    ? orderProduct.productVariant
    : orderProduct.product?.productVariants![0]
    ? orderProduct.product?.productVariants![0]
    : ({} as any);

  const images = getProductVariantsImages(
    orderProduct.product?.productVariants,
  );

  return (
    <div className="product">
      <div className="image-wrapper">
        <img src={`/api/images/${images ? images[0] : ''}`} alt="" />
      </div>
      <div className="product-image-column">
        <Link href={`/product/${orderProduct.product?.url}`}>
          <a>{orderProduct.product?.name}</a>
        </Link>
        <b>
          <span>{formatNumber(curVariant.price)} ₽</span>
          {curVariant.oldPrice && (
            <span className="discount">
              {formatNumber(curVariant.oldPrice)} ₽
            </span>
          )}
        </b>
      </div>
    </div>
  );
};

export default ProductItem;
