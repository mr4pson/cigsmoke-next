import { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { paginateTo } from './constant';

import { signup, userSignin, clearServerErr } from 'redux/slicers/authSlicer';

type signIn = {
  setStep: any;
  email: any;
  psw: any;
  setLoading: any;
  setServerErr: any;
  setAuthorized: any;
  dispatch: any;
};

type signUp = {
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  paginate: any;
  setLoading: any;
  setServerErr: any;
  setStep: any;
  setAuthorized: any;
  dispatch: any;
};

const UsePagination = () => {
  const [direction, setPage]: [number, any] = useState(0);
  const [authType, setAuthType]: [any, any] = useState('selection');

  const paginate = (newDirection: number, newType: any) => {
    setPage(newDirection);
    setAuthType(newType);
  };

  return [direction, authType, paginate];
};

const handleBack = (paginate, emailErr, pswErr, serverErr, dispatch) => {
  paginate(paginateTo.back, 'selection');
  emailErr(false);
  pswErr(false);
  serverErr(undefined);
  dispatch(clearServerErr());
};

const handleSignIn = async ({
  setStep,
  email,
  psw,
  setLoading,
  setServerErr,
  setAuthorized,
  dispatch,
}: signIn) => {
  if (isEmail(email) && !isEmpty(psw)) {
    setLoading(true);
    const payload = {
      email,
      password: psw,
    };

    const resp: any = await dispatch(userSignin(payload));

    if (!resp.error) {
      setStep(1);
      setServerErr(undefined);
      setLoading(false);
      setAuthorized(true);
    }
    if (resp.error) {
      setServerErr(resp.payload);
      setLoading(false);
    }
  }
};

const handleSignUp = async ({
  firstName,
  lastName,
  email,
  password,
  paginate,
  setLoading,
  setServerErr,
  setStep,
  setAuthorized,
  dispatch,
}: signUp) => {
  if (isEmail(email)) {
    setLoading(true);
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };
    const resp: any = await dispatch(signup(payload));
    if (!resp.error) {
      setLoading(false);
      setStep(1);
      setServerErr(undefined);
      setAuthorized(true);
    }
    if (resp.error) {
      setLoading(false);
      setAuthorized(false);
      setServerErr(resp.payload);
      paginate(paginateTo.back, 'signup');
    }
  }
};

export { UsePagination, handleBack, handleSignIn, handleSignUp };
