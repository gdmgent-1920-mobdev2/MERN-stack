import { default as React} from 'react';
import { useHistory } from 'react-router';

import { PostList, SlantContainer } from '../components';
import * as Routes from '../routes';

const HomePage = ({children}) => {
  const history = useHistory();

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <div>
      <SlantContainer shape={2} color={'black-400'}>
        <PostList className="post-list" onReadMore={handlePostReadMore} />
      </SlantContainer>
    </div>
  );
};

export default HomePage;