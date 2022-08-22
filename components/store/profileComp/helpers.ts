import axios from 'axios';

const handleFirstLoad = async (
  setAuthorized,
  setServerErr,
  setLoading,
  setVerified,
  setStep,
) => {
  setStep(0);
  const token = localStorage.getItem('accessToken');
  if (token == 'undefined') {
    setAuthorized(false);
    return;
  }
  const options = {
    url: `http://localhost:4001/users/user`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `bearer ${token}`,
    },
  };
  await axios(options)
    .then((response) => {
      setAuthorized(true);
      setLoading(false);
      setVerified(response.data.isVerified);
      console.log(response.data);
    })
    .catch((error) => {
      setAuthorized(false);
      setServerErr(error.response.status);
      setLoading(false);
    });
};

export { handleFirstLoad };
