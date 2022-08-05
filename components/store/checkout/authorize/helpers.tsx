import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { paginateTo } from '../constant';
import axios from 'axios';

type signIn = {
  setStep: any;
  email: any;
  psw: any;
  setLoading: any;
  setServerErr: any;
  setAuthorized: any;
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

const AuthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.textPrimary,
    color: color.btnPrimary,
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'intro',
    boxShadow: `0px 2px 6px ${color.boxShadowBtn}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    borderRadius: '15px',
    padding: '15px',
    userSelect: 'none',
  },
}));

const handleBack = (paginate, emailErr, pswErr, serverErr) => {
  paginate(paginateTo.back, 'selection');
  emailErr(false);
  pswErr(false);
  serverErr(undefined);
};

const handleSignIn = ({
  setStep,
  email,
  psw,
  setLoading,
  setServerErr,
  setAuthorized,
}: signIn) => {
  if (isEmail(email) && !isEmpty(psw)) {
    setLoading(true);
    const options = {
      url: 'http://localhost:4001/auth/signin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        email,
        password: psw,
      },
    };

    axios(options)
      .then((response) => {
        if (response.status === 200) {
          setStep(1);
          setServerErr(undefined);
          setLoading(false);
          setAuthorized(true);
          console.log(response.data);
        }
      })
      .catch((error) => {
        setServerErr(error.response.status);
        setLoading(false);
      });
  }
};

const handleSignUp = ({
  firstName,
  lastName,
  email,
  password,
  paginate,
  setLoading,
  setServerErr,
  setStep,
}: signUp) => {
  if (isEmail(email)) {
    setLoading(true);
    const options = {
      url: 'http://localhost:4001/auth/signup',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    };

    axios(options)
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          setStep(1);
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          setServerErr(error.response.status);
          paginate(paginateTo.back, 'signup');
          console.log(error.response.data.message);
        }
      });
  }
};

export { UsePagination, handleBack, AuthTooltip, handleSignIn, handleSignUp };
