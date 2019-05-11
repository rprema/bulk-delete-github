import axios from "axios";

async function fetchRepos(username, access_token) {
  let page = 1;
  let exitLoop = false;
  let privateRepos = [],
    publicRepos = [],
    forkedRepos = [];

  while (!exitLoop) {
    let request = {
      url: `https://api.github.com/user/repos`,
      method: "get",
      params: {
        access_token,
        page,
        affiliation: "owner"
      }
    };

    await axios(request)
      .then(response => {
        if (response.status !== 200 || response.data.length === 0) {
          exitLoop = true;
          return;
        }
        publicRepos.push(...processRepoData(response.data, "public"));
        privateRepos.push(...processRepoData(response.data, "private"));
        forkedRepos.push(...processRepoData(response.data, "fork"));
        page++;
      })
      .catch(error => {
        exitLoop = true;
      });
  }

  return { privateRepos, publicRepos, forkedRepos };
}

/**
 *
 * @param {*} responseData
 * @param {*} repoType
 */
function processRepoData(responseData, repoType) {
  let repoData = responseData
    .filter(repo => {
      if (repoType === "public") {
        return !repo.private && !repo.fork;
      } else if (repoType === "private") {
        return repo.private;
      } else if (repoType === "fork") {
        return repo.fork;
      } else {
        return repo;
      }
    })
    .map(repo => ({
      name: repo.name,
      html_url: repo.html_url
    }));

  return repoData;
}

export default fetchRepos;
