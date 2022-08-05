import AdminLayout from 'components/admin/adminLayout/layout';
import AnalyticsLayout from 'components/admin/analytics/AnalyticsLayout';

const AnalyticsUsers = () => {
  const qtyTitle = 'Количество купленных товаров каждым пользователем:';
  const amountTitle = 'Сумма покупок каждого пользователя:';
  const avgRatingTitle = 'Средние оценки, выставляемые пользователями:';

  return (
    <AnalyticsLayout
      option={'user'}
      isUser={true}
      qtyTitle={qtyTitle}
      amountTitle={amountTitle}
      avgRatingTitle={avgRatingTitle}
    />
  );
};

AnalyticsUsers.PageLayout = AdminLayout;

export default AnalyticsUsers;
