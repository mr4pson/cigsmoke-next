import { AuthService, UserService } from 'swagger/services';

const handleResetClick = async (
  userPassword: any,
  router: any,
  setServerResponse: any,
) => {
  const regEx = /[^\/]+$/; // get everything after last /
  const token = router.asPath.match(regEx).toString();

  try {
    const response = await AuthService.updatePwd({
      body: { token, userPassword: userPassword },
    });

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    setTimeout(() => router.push('/profile'), 2000);
    setServerResponse(200);
  } catch (error: any) {
    setServerResponse(error.response.status);
  }
};

export { handleResetClick };
