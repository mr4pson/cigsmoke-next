import AdminLayout from 'components/admin/adminLayout/layout';
import AnalyticsLayout from 'components/admin/analytics/AnalyticsLayout';

const AnalyticsProducts = () => {
  const qtyTitle = 'Количество проданных товаров по отдельности:';
  const amountTitle = 'Объем продаж по каждому товару:';
  const avgRatingTitle = 'Средний рейтинг каждого товара:';

  return (
    <AnalyticsLayout
      option={'product'}
      isUser={false}
      qtyTitle={qtyTitle}
      amountTitle={amountTitle}
      avgRatingTitle={avgRatingTitle}
    />
  );
};

AnalyticsProducts.PageLayout = AdminLayout;

export default AnalyticsProducts;
