import { List } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { useAppSelector } from 'redux/hooks';
import { Advertisement } from 'swagger/services';

const AdvertisementDescList = () => {
  const data = useAppSelector<Advertisement[]>(
    (state) => state.banners.advertisement,
  );

  const formattedData = [
    {
      title: 'id',
      desc: data[0]?.id,
    },
    {
      title: 'Имя картинки',
      desc: data[0]?.image,
    },
    {
      title: 'Ссылка',
      desc: data[0]?.link,
    },
    {
      title: 'Описание',
      desc: data[0]?.description,
    },
  ];

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={formattedData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<MinusOutlined />}
              title={<p>{item?.title}</p>}
              description={
                item?.title === 'Ссылка' ? (
                  <a href={'https://' + item?.desc}>{item?.desc}</a>
                ) : (
                  <p>{item?.desc}</p>
                )
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default AdvertisementDescList;
