import { default as React, useCallback, useEffect, useState} from 'react';
import { useApi } from '../../services';

const PostListPaged = ({children, onReadMore, ...rest }) => {
  const { findAllPosts } = useApi();
  const [ posts, setPosts ] = useState();
  const [ pagination, setPagination ] = useState({
    limit: 5,
    page: 1,
    pages: 1,
    total: 1
  });
  const [ currentPageIndex, setCurrentPageIndex ] = useState(1);

  const initFetch = useCallback(
    () => {
      const options = {
        limit: pagination.limit,
        skip: currentPageIndex
      }
      const fetchPosts = async () => {
        const data = await findAllPosts(options);
        setPosts(data.docs);
        setPagination({
          limit: data.limit,
          page: data.page,
          pages: data.pages,
          total: data.total
        });
      }

      fetchPosts();
    },
    [findAllPosts, currentPageIndex],
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

  const handleLoadMore = (ev, pageIndex) => {
    ev.preventDefault();
    setCurrentPageIndex(pageIndex);
  }

  return (
    <div className="post-list">
      {posts && posts.map((post, index) => (
        <article key={post._id}>
          <h1>{post.title}</h1>
          <div>{post.synopsis}</div>
          <button onClick={ev => handleReadMore(ev, post._id)}>Read more...</button>
        </article>
      ))}
      {posts && pagination.page < pagination.pages ? <button onClick={ev => handleLoadMore(ev, pagination.page + 1)}>Meer laden...</button> : ''}
    </div>
  );
};

export default PostListPaged;