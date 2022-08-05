import AdminLayout from 'components/admin/adminLayout/layout';
import AnalyticsLayout from 'components/admin/analytics/AnalyticsLayout';

const AnalyticsBrands = () => {
  const qtyTitle = 'Количество проданных товаров по брендам:';
  const amountTitle = 'Объем продаж по брендам:';
  const avgRatingTitle = 'Средний рейтинг товаров по брендам:';

  return (
    <AnalyticsLayout
      option={'brand'}
      isUser={false}
      qtyTitle={qtyTitle}
      amountTitle={amountTitle}
      avgRatingTitle={avgRatingTitle}
    />
  );
};

AnalyticsBrands.PageLayout = AdminLayout;

export default AnalyticsBrands;
