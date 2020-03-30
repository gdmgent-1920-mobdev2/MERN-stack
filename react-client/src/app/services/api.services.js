import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  const findAllPosts = async (query = null) => {
    let url = `${BASE_URL}/posts`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    return response.json();
  }

  const findPost = async (id) => {
    let url = `${BASE_URL}/posts/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const createPost = async (post) => {
    let url = `${BASE_URL}/posts/create`;
    const response = await fetch(url);
    return response.json();
  }

  const storePost = async (post) => {
    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/create`;
    const response = await fetch(url, options);
    return response.json();
  }

  const editPost = async (post) => {
    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/${post._id}/edit`;
    const response = await fetch(url, options);
    return response.json();
  }

  const updatePost = async (post) => {
    const options = {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/${post._id}`;
    const response = await fetch(url, options);
    return response.json();
  }

  const deletePost = async (id, mode = 0) => {
    const options = {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(`${BASE_URL}/posts/${id}?mode=${mode}`, options);
    return await response.json();
  }

  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
    <ApiContext.Provider value={{ deletePost, findAllPosts, findPost }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}