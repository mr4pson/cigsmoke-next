import color from '../lib/ui.colors';
import styled from 'styled-components';
import { useState } from 'react';
import MapContainer from './MapContainer';
import Link from 'next/link';
import { useCopyToClipboard } from './helpers';

const AddressContactUs = () => {
  const [viewport, setViewPort]: [any, any] = useState({
    latitude: 55.67878,
    longitude: 37.89487,
    zoom: 18,
    width: 'fit',
  });
  const [viewportUser, setViewPortUser]: [any, any] = useState({
    latitude: 55.67878,
    longitude: 37.89487,
    zoom: 18,
    width: 'fit',
  });
  const [copiedText, setCopiedText, copy] = useCopyToClipboard();
  return (
    <>
      <Headers>Свяжитесь с нами</Headers>
      <Contents>
        Для получения дополнительной информации вы можете позвонить нам по
        телефону:{' '}
        <Link href="tel:+79855675947">
          <a>
            <Links>+7 (985) 567-59-47</Links>
          </a>
        </Link>
      </Contents>
      <Contents>
        или вы можете отправить нам письмо по адресу:{' '}
        <Link href="mailto:info@wuluxe.ru">
          <a>
            <Links>info@wuluxe.ru</Links>
          </a>
        </Link>
      </Contents>
      <Headers>Наш адрес</Headers>
      <Contents>приезжайте к нам по деловым вопросам</Contents>
      <Contents>Рабочее время 09:00 - 20:00</Contents>
      <Contents
        onClick={() => {
          copy('МО, г. Люберцы, Октябрьский проспект 181');
          setTimeout(() => {
            setCopiedText(false);
          }, 1000);
        }}
        onTouchStart={() => {
          copy('МО, г. Люберцы, Октябрьский проспект 181');
          setTimeout(() => {
            setCopiedText(false);
          }, 1000);
        }}
        style={{ cursor: 'pointer' }}
      >
        МО, г. Люберцы, Октябрьский проспект 181
      </Contents>
      <Contents>
        Нажмите на указанный выше адрес, чтобы скопировать.{' '}
        {copiedText ? 'Скопировано!' : ''}
      </Contents>
      <MapContainer
        viewportUser={viewportUser}
        setViewPortUser={setViewPortUser}
        viewport={viewport}
        setViewPort={setViewPort}
      />
    </>
  );
};

const Headers = styled.h1`
  width: 100%;
  text-aling: start;
  font-family: 'intro';
  font-size: 2rem;
`;

const Contents = styled.span`
  width: 100%;
  text-align: start;
  font-size: 1rem;
`;

const Links = styled.span`
  color: ${color.yellow};
  &:hover {
    color: ${color.hover};
  }
`;

export default AddressContactUs;
