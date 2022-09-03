import styled from 'styled-components';
import { Container, Header } from '../common';
import KeyValue from './KeyValue';
import Cards from './Cards';
import { useMemo, useEffect } from 'react';
import isEmpty from 'validator/lib/isEmpty';

const UserInfo = (props: any) => {
  const { userInfoRef, setActive, user } = props;
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('profile');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(userInfoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [userInfoRef, observer]);
  return (
    <Container id="userinfo" ref={userInfoRef}>
      <Header>Личные данные</Header>
      <Wrapper>
        <KeyValue
          {...props}
          delay={0.05}
          keyData="Имя и фамилия"
          valueData={`${user.firstName} ${user.lastName}`}
        />
        {/* <KeyValue {...props} delay={0.1} keyData="Телефон" valueData={`077`} /> */}
        <KeyValue
          {...props}
          delay={0.2}
          keyData="Почта"
          valueData={user.email}
        />
        {/* <KeyValue
          {...props}
          delay={0.3}
          keyData="Адресс"
          valueData={
            isEmpty(user.address)
              ? 'У вас пока еще нет сохраненных адресов'
              : user.address
          }
        /> */}
        {/* <h2>Мои карты</h2> */}
        {/* <Cards /> */}
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  user-select: none;
  h2 {
    padding: 0 20px;
  }
`;

export default UserInfo;
