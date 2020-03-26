import { default as React} from 'react';

import { useApi } from '../services';
import { PostList } from '../components';

const HomePage = ({children}) => {
  return (
    <div className="post-list">
      <PostList />
    </div>
  );
};

export default HomePage;