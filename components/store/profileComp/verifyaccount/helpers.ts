import axios from 'axios';

const handleVerification = async (router: any, setServerResponse) => {
  const regEx = /[^\/]+$/; // get everything after last /
  const token = router.asPath.match(regEx);
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
      setTimeout(() => {
        router.push('/profile');
      }, 10000);
      setServerResponse(response.status);
      console.log(response.data);
    })
    .catch((error) => {
      setServerResponse(error.response.status);
      setTimeout(() => {
        router.push('/profile');
      }, 10000);
    });
};

export { handleVerification };
