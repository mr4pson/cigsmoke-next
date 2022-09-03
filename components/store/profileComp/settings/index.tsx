import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { Container, Header } from '../common';
import { useEffect, useMemo, useState } from 'react';
import Notifactions from './Notification';
import UserData from './userData';

const Settings = (props: any) => {
  const { settingsRef, setActive, user } = props;
  const [isOpen, setOpen] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive('settings');
      }),
    [],
  );

  useEffect(() => {
    observer.observe(settingsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [settingsRef, observer]);
  return (
    <Container id="settings" ref={settingsRef}>
      <Header>Настройки</Header>
      <Notifactions {...props} />
      <Header>Изменить личные данные</Header>
      <ChangeDataBtn
        whileHover="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        onClick={() => setOpen(true)}
      >
        Изменить данные
      </ChangeDataBtn>
      <UserData isOpen={isOpen} setOpen={setOpen} {...props} />
    </Container>
  );
};

const ChangeDataBtn = styled(motion.button)`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background-color: ${color.btnPrimary};
  color: ${color.textPrimary};
  cursor: pointer;
`;

export default Settings;
