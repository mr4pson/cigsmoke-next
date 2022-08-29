import styled from 'styled-components';
import React from 'react';
import TextField from '@mui/material/TextField';
import color from 'components/store/lib/ui.colors';
import {
  AddressAutofill,
  addressToCoord,
  handleHiddenInputChange,
} from './helpers';
import { InputsTooltip } from '../helpers';
import { MAPBOX_TOKEN } from './constant';
import Locate from '../../../../../../assets/geolocate.svg';
import Close from '../../../../../../assets/close_black.svg';

const AutoFill = (props: any) => {
  const { address, setAddress, setPostCode, setViewPort } = props;

  return (
    <>
      <TextAreaWrapper>
        <label htmlFor="address-autofill">
          <b>
            <span>Ваш адресс</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="address-tip"
            title={
              <React.Fragment>
                <span>Это поле обязательно к заполнению</span>
                <span>Пример: МО, г. Люберцы, Октябрьский проспект 181</span>
                <span>
                  Определить местоположение с нажав на кнопку местоположения
                </span>
                <span>
                  <Locate />
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        {address != '' ? (
          <span
            className="address-clear-btn"
            onClick={() => {
              setAddress('');
              setPostCode('');
            }}
          >
            <Close />
          </span>
        ) : (
          ''
        )}
        <TextField
          fullWidth
          label="Укажите адресс"
          multiline
          maxRows={Infinity}
          value={address}
          defaultValue=""
          onChange={(e) => handleHiddenInputChange(e, setAddress)}
        />
      </TextAreaWrapper>
      <AutoFillWrapper>
        <AddressAutofill
          options={{
            language: 'ru',
          }}
          onRetrieve={(e: any) => {
            setPostCode(e.features[0].properties.postcode);
            addressToCoord(
              e.features[0].properties.full_address,
              setViewPort,
              setAddress,
            );
          }}
          accessToken={MAPBOX_TOKEN}
        >
          <input
            name="address"
            id="address-autofill"
            placeholder="Адресс"
            type="text"
            autoComplete="address-line1"
          />
        </AddressAutofill>
      </AutoFillWrapper>
    </>
  );
};

const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
  position: relative;
  user-select: none;
  .address-clear-btn {
    position: absolute;
    right: 0px;
    top: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 5px;
    span {
      font-family: 'intro';
    }
    .tool-tip {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
    }
    .required {
      color: ${color.hover};
    }
  }
`;

const AutoFillWrapper = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    height: 0;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;

export default AutoFill;
