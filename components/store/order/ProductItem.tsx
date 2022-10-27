import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { formatNumber } from 'common/helpers/number.helper';
import Link from 'next/link';
import { OrderProduct } from 'swagger/services';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { Role } from 'common/enums/roles.enum';
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
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
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
          <span>
            {user?.role === Role.SuperUser
              ? curVariant.wholeSalePrice
              : formatNumber(curVariant.price)}{' '}
            ₽ - {orderProduct.qty}шт
          </span>
          {curVariant.oldPrice && user?.role !== Role.SuperUser ? (
            <span className="discount">
              {formatNumber(curVariant.oldPrice)} ₽
            </span>
          ) : (
            ''
          )}
        </b>
      </div>
      {orderProduct.productVariant?.color?.name !== '_' ? (
        <div className="color-wrapper">
          <span>Цвет: {orderProduct.productVariant?.color?.name}</span>
          <span
            style={{
              backgroundColor: `${orderProduct.productVariant?.color?.code}`,
              borderRadius: '50%',
              padding: '5px',
              width: '15px',
              height: '15px',
            }}
          ></span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProductItem;
