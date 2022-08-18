import axios from 'axios';

const handleResetClick = async (email: any, setServerResponse) => {
  const options = {
    url: `http://localhost:4001/auth/reset`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {
      email,
    },
  };

  await axios(options)
    .then((response) => {
      setServerResponse(response.status);
    })
    .catch((error) => {
      setServerResponse(error.response.status);
    });
};

export { handleResetClick };
