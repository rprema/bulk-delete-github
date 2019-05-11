import axios from "axios";

async function deleteRepos(repos, username, access_token) {
  repos.forEach(async repo => {
    const URL = `https://api.github.com/repos/${username}/${repo}`;
    await axios({
      method: "delete",
      url: URL,
      params: {
        access_token
      }
    })
      .then(response => {
        console.log(response);
        console.log(`${repo} deleted!`);
      })
      .catch(() => {
        console.error(`Error deleting ${repo}...`);
      });
  });
}

export default deleteRepos;
