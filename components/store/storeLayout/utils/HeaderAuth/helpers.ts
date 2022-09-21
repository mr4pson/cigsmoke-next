import { Dispatch, SetStateAction } from 'react';
import { PopupDisplay } from '../../constants';
import { AuthService } from 'swagger/services';

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

const handleSession = async () => {
  const token = localStorage.getItem('refreshToken');
  try {
    const accessToken: any = await AuthService.createToken({ body: { token } });
    localStorage.setItem('accessToken', accessToken.accessToken);
  } catch (error: any) {
    if (error.response.status == 401) {
      console.log(error.response.data.message);
      return;
    }
    if (error.response.status == 403) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      return;
    }
  }
};

export { handleAfterAuthorized, handleSession };
