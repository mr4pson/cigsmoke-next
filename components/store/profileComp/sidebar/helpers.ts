import axios from 'axios';
const handleConfirmationEmail = async (setServerResponse) => {
  const token = localStorage.getItem('accessToken');
  const options = {
    url: `http://localhost:4001/users/email-confirmation`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `bearer ${token}`,
    },
  };

  await axios(options)
    .then((response) => {
      setServerResponse(response.status);
      setTimeout(() => {
        setServerResponse(undefined);
      }, 30000);
      console.log(response.data);
    })
    .catch((error) => {
      setServerResponse(error.response.status);
      setTimeout(() => {
        setServerResponse(undefined);
      }, 30000);
    });
};

const handleSignout = (setAuthorized) => {
  setAuthorized(false);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export { handleConfirmationEmail, handleSignout };
