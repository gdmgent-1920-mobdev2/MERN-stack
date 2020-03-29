import { default as React} from 'react';
import { useHistory } from 'react-router';

import { PostListPaged } from '../components';
import * as Routes from '../routes';

const PostsPage = ({children}) => {
  const history = useHistory();

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <div>
      <PostListPaged className="post-list" paged={{limit: 6, skip: 1}} onReadMore={handlePostReadMore} />
    </div>
  );
};

export default PostsPage;