import { UserService } from 'swagger/services';
const handleFirstLoad = async (
  setAuthorized,
  setServerErr,
  setLoading,
  setVerified,
  setStep,
  user,
) => {
  setStep(0);
  const token = localStorage.getItem('accessToken');
  if (token == 'undefined' || !user) {
    setAuthorized(false);
    setLoading(false);
    return;
  }
  try {
    await UserService.findUserById({userId:user?.id});
    setServerErr(200);
    setLoading(false);
    setVerified(user?.isVerified);
    setAuthorized(true);
  } catch (error: any) {
    setLoading(false);
    setServerErr(error.response.status);
    setStep(0);
    setAuthorized(false);
  }
};

export { handleFirstLoad };
