import color from 'components/store/lib/ui.colors';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Authorize from 'ui-kit/authorize';
import { handleFirstLoad } from './helpers';
import SideBar from './sidebar';
import UserInfo from './userInfo';
import Reveiws from './reveiws';
import Changepsw from './changepsw';
import Settings from './settings';
import { devices } from '../lib/Devices';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';

const ProfileComp = (props: any) => {
  const { setActive } = props;
  const [isAuthorized, setAuthorized] = useState(false);
  const [step, setStep] = useState(0);
  const [serverErr, setServerErr] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [isVerified, setIsverified] = useState(undefined);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  useEffect(() => {
    handleFirstLoad(
      setAuthorized,
      setServerErr,
      setLoading,
      setIsverified,
      setStep,
      user,
    );
  });

  const userInfoRef = useRef(null);
  const reveiwsRef = useRef<any>(null);
  const changePswRef = useRef(null);
  const settingsRef = useRef(null);

  return (
    <>
      {isLoading ? (
        <>loading...</>
      ) : (
        <>
          {user ? (
            <Container>
              <SideBar
                userInfoRef={userInfoRef}
                reveiwsRef={reveiwsRef}
                changePswRef={changePswRef}
                settingsRef={settingsRef}
                isVerified={isVerified}
                setAuthorized={setAuthorized}
                setStep={setStep}
                user={user}
                {...props}
              />
              <Wrapper>
                <UserInfo
                  settingsRef={settingsRef}
                  userInfoRef={userInfoRef}
                  setActive={setActive}
                  user={user}
                  {...props}
                />
                <Reveiws {...props} reveiwsRef={reveiwsRef} />
                <Changepsw {...props} changePswRef={changePswRef} user={user} />
                <Settings {...props} settingsRef={settingsRef} user={user} />
              </Wrapper>
            </Container>
          ) : (
            <>
              <AuthHeader>
                <h2 className="server-err">
                  {serverErr == 403
                    ? 'Доступ запрещен'
                    : 'Войдите, чтобы увидеть свой аккаунт'}
                </h2>
              </AuthHeader>
              <Authorize
                setAuthorized={setAuthorized}
                step={step}
                setStep={setStep}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

const AuthHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-contetn: center;
  align-items: center;
  gap: 20px;
  .server-err {
    font-family: 'intro';
    color: ${color.hover};
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  @media ${devices.laptopS} {
    flex-direction: column;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
  @media ${devices.laptopS} {
    width: 100%;
  }
  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export default ProfileComp;
