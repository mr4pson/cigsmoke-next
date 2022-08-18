import axios from 'axios';

const handleVerification = async (router: any, setServerResponse) => {
  const token = router.asPath.slice(29, router.asPath.length);

  const options = {
    url: `http://localhost:4001/auth/authorize/${token}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };

  await axios(options)
    .then((response) => {
      setTimeout(() => router.push('/profile'), 2000);
      console.log(response.data);
    })
    .catch((error) => {
      setServerResponse(error.response.status);
    });
};

export { handleVerification };
