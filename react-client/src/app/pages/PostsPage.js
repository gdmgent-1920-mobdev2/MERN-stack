import { default as React} from 'react';
import { useHistory } from 'react-router';

import { PostList } from '../components';
import * as Routes from '../routes';

const PostsPage = ({children}) => {
  const history = useHistory();

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <div>
      <PostList className="post-list" onReadMore={handlePostReadMore} />
    </div>
  );
};

export default PostsPage;