import axios from "axios";

async function userAuth(username, access_token) {
  let hasDeleteScope = false;
  let isAuthorized = false;

  let request = {
    url: `https://api.github.com/user/repos`,
    method: "get",
    params: {
      affiliation: "owner"
    },
    headers: {
      Authorization: 'token ' + access_token
    },
  };

  await axios(request)
    .then(response => {
      if (response.status !== 200) {
        return;
      }
      isAuthorized = true;

      let oAuthScopes = response.headers["x-oauth-scopes"];
      if (oAuthScopes) {
        let scopeArr = oAuthScopes.split(", ");
        hasDeleteScope =
          scopeArr.indexOf("repo") >= 0 && scopeArr.indexOf("delete_repo") >= 0;
      }
    })
    .catch(error => {});

  return { isAuthorized, hasDeleteScope };
}

export default userAuth;
