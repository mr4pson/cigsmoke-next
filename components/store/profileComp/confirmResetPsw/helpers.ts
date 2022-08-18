import axios from 'axios';

const handleResetClick = async (
  userPassword: any,
  router: any,
  setServerResponse: any,
) => {
  const token = router.asPath.slice(29, router.asPath.length);

  const options = {
    url: `http://localhost:4001/auth/update-password`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      token,
      userPassword,
    },
  };

  await axios(options)
    .then((response) => {
      setServerResponse(response.status);
      setTimeout(() => router.push('/'), 2000);
      console.log(response.data);
    })
    .catch((error) => {
      setServerResponse(error.response.status);
    });
};

export { handleResetClick };
