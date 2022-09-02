import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import color from 'components/store/lib/ui.colors';
import { UserService } from 'swagger/services';
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

const handleEmailChange = async ({ user, email, setServerResponse }) => {
  try {
    await UserService.updateUser({ userId: user.id, body: { email } });
    setServerResponse(200);
  } catch (error: any) {
    setServerResponse(error.response.status);
    setTimeout(() => {
      setServerResponse(undefined);
    }, 1000);
  }
};

const handleDataChange = async ({ user, payload, setServerResponse }) => {
  try {
    await UserService.updateUser({ userId: user.id, body: payload });
    setServerResponse(200);
  } catch (error: any) {
    setServerResponse(error.response.status);
    setTimeout(() => {
      setServerResponse(undefined);
    }, 1000);
  }
};

export { InputsTooltip, handleEmailChange, handleDataChange };
