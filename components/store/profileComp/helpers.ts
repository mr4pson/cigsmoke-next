import axios from 'axios';

const handleFirstLoad = async (setAuthorized, setServerErr, setLoading) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  if (token == 'undefined' || userId == 'undefined') {
    setAuthorized(false);
    return;
  }
  const options = {
    url: `http://localhost:4001/users/${userId}`,
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
      console.log(response.data);
    })
    .catch((error) => {
      setAuthorized(false);
      setServerErr(error.response.status);
      setLoading(false);
    });
};

export { handleFirstLoad };
