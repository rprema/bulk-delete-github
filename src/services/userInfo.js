import axios from "axios";

async function userInfo(username, access_token) {
  let userInfo = {};
  let request = {
    url: `https://api.github.com/users/${username}`,
    method: "get"
  };

  await axios(request)
    .then(response => {
      if (response.status !== 200) {
        return;
      }
      userInfo = response.data;
    })
    .catch(error => {});

  return userInfo;
}

export default userInfo;
