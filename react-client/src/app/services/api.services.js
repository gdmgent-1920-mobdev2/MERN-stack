import { default as React, useEffect, useState, useContext, createContext } from 'react';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = '/api';

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