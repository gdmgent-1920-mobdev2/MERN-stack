import { default as React, useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router';
import { useApi } from '../services';

import { PostDetail } from '../components';

const PostDetailPage = ({children}) => {
  const { id } = useParams();
  const { findPost } = useApi();
  const [ post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await findPost(id);
      setPost(data);
    };

    fetchPost();

    return () => {
      // no cleanup
    }
  }, [id]);

  return (
    <Fragment>
      <PostDetail post={post} />
    </Fragment>
  );
};

export default PostDetailPage;