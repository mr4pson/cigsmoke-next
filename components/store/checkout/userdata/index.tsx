import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import MapContainer from './MapContainer';
import { useState } from 'react';
import { styleProps } from 'components/store/lib/types';
import { geoLocatClick } from './helpers';
import AutoFill from './Autofill';
import Locate from '../../../../assets/geolocate.svg';
import AddressDetails from './AddressDetails';
import ReciverData from './ReciverData';

const UserData = (props: any) => {
  const { setStep, backToFinal, setHasAddress } = props;
  const [address, setAddress] = useState('');
  const [viewport, setViewPort]: [any, any] = useState({
    latitude: 55.755825,
    longitude: 37.617298,
    zoom: 10,
  });
  const [postCode, setPostCode] = useState('');
  const [roomOrOffice, setRoomOrOffice] = useState('');
  const [door, setDoor] = useState('');
  const [floor, setFloor] = useState('');
  const [rignBell, setRingBell] = useState('');
  const [fullName, setFullname] = useState('Rishad Mohammadi');
  const [phone, setPhone] = useState('+7');

  return (
    <Container>
      <MapContainer
        viewport={viewport}
        setViewPort={setViewPort}
        setAddress={setAddress}
        setPostCode={setPostCode}
      />
      <FormContainer
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
      >
        {backToFinal ? (
          <ActionBtns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            bgcolor={color.btnPrimary}
            onClick={() => {
              setStep(2);
              setHasAddress(true);
            }}
          >
            Назад
          </ActionBtns>
        ) : (
          ''
        )}
        <FormWrapper>
          <h3>Куда доставить заказ?</h3>
          <span className="sub-addres-info">
            Укажите адрес на карте или используйте поиск
          </span>
          <AutoFill
            address={address}
            setAddress={setAddress}
            setPostCode={setPostCode}
            setViewPort={setViewPort}
          />
          <button className="geolocate" onClick={geoLocatClick}>
            <span>
              <Locate />
            </span>
            <span>Определить местоположение</span>
          </button>
          <AddressDetails
            roomOrOffice={roomOrOffice}
            setRoomOrOffice={setRoomOrOffice}
            postCode={postCode}
            setPostCode={setPostCode}
            door={door}
            setDoor={setDoor}
            floor={floor}
            setFloor={setFloor}
            rignBell={rignBell}
            setRingBell={setRingBell}
          />
          <ReciverData
            fullName={fullName}
            setFullname={setFullname}
            phone={phone}
            setPhone={setPhone}
          />
          <ActionBtns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            bgcolor={
              isEmpty(address) ||
              isEmpty(postCode) ||
              isEmpty(fullName) ||
              isEmpty(phone)
                ? color.textSecondary
                : color.btnPrimary
            }
            disabled={
              isEmpty(address) ||
              isEmpty(postCode) ||
              isEmpty(fullName) ||
              isEmpty(phone)
                ? true
                : false
            }
            onClick={() => {
              setStep(2);
              setHasAddress(true);
            }}
          >
            Сохранить и продолжить
          </ActionBtns>
        </FormWrapper>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const FormContainer = styled(motion.div)`
  width: 450px;
  height: 95vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: scroll;
  user-select: none;
`;

const ActionBtns = styled(motion.button)`
  width: 100%;
  height: 50px;
  min-height: 50px;
  text-align: center;
  background-color: ${(p: styleProps) => p.bgcolor};
  color: ${color.textPrimary};
  border-radius: 15px;
  font-family: 'intro';
  font-size: 1rem;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  .sub-addres-info {
    color: ${color.textSecondary};
  }
  .geolocate {
    width: 100%;
    display: flex;
    flex-direction: row;
    jusitfy-content: flex-start;
    align-items: center;
    gap: 10px;
    &:hover {
      color: ${color.hover};
    }
  }
`;

export default UserData;
