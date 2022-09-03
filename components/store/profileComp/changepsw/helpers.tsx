import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import axios from 'axios';
import { ChangeUserPswService } from 'swagger/services';

const InputsTooltip = styled(({ className, ...props }: TooltipProps) => (
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

const handleChangePsw = async ({ user, psw, setServerResponse }) => {
  try {
    await ChangeUserPswService.changePassword({
      userId: user.id,
      body: { password: psw },
    });
  } catch (error: any) {
    setServerResponse(error.response.status);
  }

  // const token = localStorage.getItem('accessToken');
  // const userId = localStorage.getItem('userId');
  // const options = {
  //   url: `http://localhost:4001/users/changepsw/${userId}`,
  //   method: 'PUT',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     Authorization: `bearer ${token}`,
  //   },
  //   data: {
  //     oldPassword: payload.oldPsw,
  //     password: payload.psw,
  //   },
  // };

  // await axios(options)
  //   .then((response) => {
  //     payload.setServerResponse(response.status);
  //   })
  //   .catch((error) => {
  //     payload.setServerResponse(error.response.status);
  //   });
};

export { InputsTooltip, handleChangePsw };
