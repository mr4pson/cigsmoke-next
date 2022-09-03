import { AuthService } from 'swagger/services';
const handleVerification = async (router: any, setServerResponse) => {
  const regEx = /[^\/]+$/; // get everything after last /
  const token = router.asPath.match(regEx);
  console.log(token[0]);

  try {
    const response = await AuthService.confirmEmailByToken({ token });
    setServerResponse(200);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
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
