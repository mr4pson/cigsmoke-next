// import { AuthService } from 'swagger/services';
import { authorizeUser } from 'redux/slicers/authSlicer';
const handleVerification = async (router: any, setServerResponse, dispatch) => {
  const regEx = /[^\/]+$/; // get everything after last /
  const token = router.asPath.match(regEx).toString();

  try {
    dispatch(authorizeUser(token));
    // const response = await AuthService.confirmEmailByToken({ token });
    setServerResponse(200);
    // localStorage.setItem('accessToken', response.accessToken);
    // localStorage.setItem('refreshToken', response.refreshToken);
    setTimeout(() => {
      router.push('/profile');
    }, 10000);
  } catch (error: any) {
    setServerResponse(error.response.status);
    setTimeout(() => {
      router.push('/profile');
    }, 10000);
  }
};

export { handleVerification };
