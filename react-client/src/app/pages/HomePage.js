import { default as React} from 'react';
import { useHistory } from 'react-router';

import { useApi } from '../services';
import { PostList } from '../components';
import * as Routes from '../routes';

const HomePage = ({children}) => {
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

export default HomePage;