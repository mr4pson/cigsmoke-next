import AdminLayout from 'components/admin/adminLayout/layout';
import AnalyticsLayout from 'components/admin/analytics/AnalyticsLayout';

const AnalyticsCategories = () => {
  const qtyTitle = 'Количество проданных товаров по категориям:';
  const amountTitle = 'Объем продаж по категориям:';
  const avgRatingTitle = 'Средний рейтинг товаров по категориям:';

  return (
    <AnalyticsLayout
      option={'category'}
      isUser={false}
      qtyTitle={qtyTitle}
      amountTitle={amountTitle}
      avgRatingTitle={avgRatingTitle}
    />
  );
};

AnalyticsCategories.PageLayout = AdminLayout;

export default AnalyticsCategories;
