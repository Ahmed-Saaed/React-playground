import React, {useState, useEffect} from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setrepos] = useState(mockRepos);
  const [followers, setfollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({show: false, msg: ''});

  const searchGithubUser = async (user) => {
    toggleError();
    setisLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );

    if (response) {
      const {login, followers_url} = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        const [repos, followers] = results;

        if (repos.status === 'fulfilled') {
          setrepos(repos.value.data);
        }
        if (followers.status === 'fulfilled') {
          setfollowers(followers.value.data);
        }
      });

      setGithubUser(response.data);
    } else {
      toggleError(true, 'there is no user match your search');
    }
    checkRequests();
    setisLoading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({data}) => {
        let {
          rate: {remaining},
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // throw an error
          toggleError(
            true,
            'sorry you have no more requests , try again in 1 hour'
          );
        }
      })
      .catch((error) => console.log(error));
  };

  function toggleError(show = false, msg = '') {
    setError({show, msg});
  }
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export {GithubProvider, GithubContext};
