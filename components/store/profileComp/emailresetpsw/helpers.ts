import { AuthService } from 'swagger/services';
const handleResetClick = async (email: any, setServerResponse) => {
  try {
    await AuthService.resetPwd({ body: { email } });
    setServerResponse(200);
  } catch (error: any) {
    setServerResponse(error.response.status);
  }
};

export { handleResetClick };
