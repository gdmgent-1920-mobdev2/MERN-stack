import { default as React, useCallback, useEffect, useState} from 'react';
import { useApi } from '../../services';

const PostListPaged = ({children, paged, onReadMore, ...rest }) => {
  const { findAllPosts } = useApi();
  const [ posts, setPosts ] = useState();
  const [ pagination, setPagination ] = useState({
    limit: paged.limit,
    page: paged.skip,
    pages: 1,
    total: 1
  });
  const [ currentPageIndex, setCurrentPageIndex ] = useState(1);

  const initFetch = useCallback(
    () => {
      const fetchPosts = async () => {
        const data = await findAllPosts({
          limit: pagination.limit,
          skip: currentPageIndex
        });
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
    [findAllPosts, currentPageIndex, pagination.limit],
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
          <div>{post._categoryId}</div>
          <button onClick={ev => handleReadMore(ev, post._id)}>Read more...</button>
        </article>
      ))}
      {posts && pagination.page < pagination.pages ? <button onClick={ev => handleLoadMore(ev, pagination.page + 1)}>Meer laden...</button> : ''}
    </div>
  );
};

export default PostListPaged;