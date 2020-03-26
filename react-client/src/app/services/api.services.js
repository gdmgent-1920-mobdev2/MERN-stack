import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  const findAllPosts = async () => {
    let url = `${BASE_URL}/posts`;
    const response = await fetch(url);
    return response.json();
  }

  const findPost = async (postId) => {
    let url = `${BASE_URL}/posts/${postId}`;
    const response = await fetch(url);
    return response.json();
  }

  return (
    <ApiContext.Provider value={{ findAllPosts, findPost }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}