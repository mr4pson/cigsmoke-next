import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from '../../constants';
import { AuthService } from 'swagger/services';
import { signout } from 'redux/slicers/authSlicer';

const handleAfterAuthorized =
  (
    setDisplay: Dispatch<SetStateAction<PopupDisplay>>,
    setIsOpened: Dispatch<SetStateAction<boolean>>,
  ) =>
  () => {
    setIsOpened((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) =>
        prev === PopupDisplay.None ? PopupDisplay.Flex : PopupDisplay.None,
      );
    });
  };

const handleSession = async (dispatch) => {
  const token = localStorage.getItem('refreshToken');
  if (token === null) {
    return;
  }
  try {
    const accessToken: any = await AuthService.createToken({ body: { token } });
  } catch (error: any) {
    if (error.response.status == 403 || error.response.status == 401) {
      console.log('it s happend');

      dispatch(signout());
    }
  }
};

export { handleAfterAuthorized, handleSession };
