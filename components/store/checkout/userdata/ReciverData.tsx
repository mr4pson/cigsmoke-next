import TextField from '@mui/material/TextField';
import { InputsTooltip } from '../helpers';
import React from 'react';
import { DetailsRowWrapper, DetailsColumnWrapper } from './common';

const ReciverData = (props: any) => {
  const { fullName, setFullname, phone, setPhone } = props;
  return (
    <>
      <h3>Данные получателя</h3>
      <DetailsRowWrapper justifycontent="center">
        <DetailsColumnWrapper>
          <label htmlFor="address-reciver-fullname">
            <b>
              <span>Имя и фамилия</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              key="address-reciver-fullname-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-reciver-fullname"
            fullWidth
            label="Имя и фамилия"
            multiline
            rows={1}
            value={fullName}
            defaultValue=""
            onChange={(e) => setFullname(e.target.value)}
          />
        </DetailsColumnWrapper>
      </DetailsRowWrapper>
      <DetailsRowWrapper justifycontent="center">
        <DetailsColumnWrapper>
          <label htmlFor="address-reciver-phone">
            <b>
              <span>Телефон</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              key="address-reciver-phone-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
          </label>
          <TextField
            id="address-reciver-phone"
            fullWidth
            label="Телефон"
            multiline
            rows={1}
            value={phone}
            defaultValue=""
            onChange={(e) => setPhone(e.target.value)}
          />
        </DetailsColumnWrapper>
      </DetailsRowWrapper>
    </>
  );
};

export default ReciverData;
