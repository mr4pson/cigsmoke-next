import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import ReviewsSVG from '../../../../../assets/reviews.svg';
import SettingskSVG from '../../../../../assets/settings.svg';
import variants from 'components/store/lib/variants';
import { handleMenuState } from '../../helpers';
import { handleLogout } from './authorize/helpers';
import { useAppDispatch } from 'redux/hooks';
import { User } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from '../../constants';

type StyleProps = {
  width: number;
};

type Props = {
  user: User | null;
  direction: number;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

const Profile: React.FC<Props> = ({
  user,
  direction,
  setDisplay,
  setIsOpened,
}) => {
  const dispatch = useAppDispatch();

  return (
    <AuthContent
      key={'profile'}
      custom={direction}
      variants={variants.slider_auth}
      initial="enter"
      animate="center"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      }}
    >
      <ProfileWrapper>
        <AuthDevider style={{ justifyContent: 'flex-start' }}>
          <Link href="/profile">
            <a>
              <motion.img
                src={`https://avatars.dicebear.com/api/micah/${user?.id}.svg?facialHairProbability=0&mouth[]=smile&scale=100&hair[]=fonze,full,pixie`}
                alt="profile"
              />
            </a>
          </Link>
          <ProfileDataWrapper>
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <span>{user?.email}</span>
            <Link href="/profile">
              <a onClick={handleMenuState(setIsOpened, setDisplay)}>
                <b>Личные данные</b>
              </a>
            </Link>
          </ProfileDataWrapper>
        </AuthDevider>
      </ProfileWrapper>

      <Link href="/profile#reviews">
        <motion.a
          whileHover="hover"
          whileTap="tap"
          custom={1.04}
          variants={variants.grow}
          style={{ alignSelf: 'flex-start' }}
          onClick={handleMenuState(setIsOpened, setDisplay)}
        >
          <AuthDevider style={{ justifyContent: 'flex-start' }}>
            <ReviewsSVG />
            <span style={{ fontWeight: '500', color: color.textSecondary }}>
              Мои отзывы
            </span>
          </AuthDevider>
        </motion.a>
      </Link>
      <Link href="/profile#settings">
        <motion.a
          whileHover="hover"
          whileTap="tap"
          custom={1.04}
          variants={variants.grow}
          style={{ alignSelf: 'flex-start' }}
          onClick={handleMenuState(setIsOpened, setDisplay)}
        >
          <AuthDevider style={{ justifyContent: 'flex-start' }}>
            <SettingskSVG />
            <span style={{ fontWeight: '500', color: color.textSecondary }}>
              Настройки
            </span>
          </AuthDevider>
        </motion.a>
      </Link>

      <AuthBtns
        whileHover="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        width="100"
        onClick={handleLogout(dispatch, setDisplay, setIsOpened)}
      >
        Выйти
      </AuthBtns>
    </AuthContent>
  );
};

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
  span {
    color: ${color.hover};
  }
`;

const AuthDevider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const AuthBtns = styled(motion.button)<any>`
  width: ${(p: StyleProps) => p.width}%;
  height: 40px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  a {
    &:hover {
      color: ${color.hover};
    }
  }
`;

const ProfileDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Intro';
  }
  span {
    color: ${color.ratingEmpty};
  }
`;

export { Profile };
