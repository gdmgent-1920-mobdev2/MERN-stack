import { default as React, useCallback, useEffect, useState} from 'react';
import { useApi } from '../../services';

const PostList = ({children, onReadMore, ...rest }) => {
  const { findAllPosts } = useApi();
  const [ posts, setPosts ] = useState();

  const initFetch = useCallback(
    () => {
      const fetchPosts = async () => {
        const data = await findAllPosts();
        setPosts(data);
      }

      fetchPosts();
    },
    [findAllPosts],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch]);
  
  const handleReadMore = (ev, postId) => {
    ev.preventDefault();
    if (typeof onReadMore === 'function') {
      onReadMore(postId);
    }
  };

  return (
    <div className="post-list">
      {posts && posts.map((post, index) => (
        <article key={post._id}>
          <h1>{post.title}</h1>
          <div>{post.synopsis}</div>
          <button onClick={ev => handleReadMore(ev, post._id)}>Read more...</button>
        </article>
      ))}
    </div>
  );
};

export default PostList;