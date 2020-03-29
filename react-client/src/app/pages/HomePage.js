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
      <SlantContainer shape={2} angle={5} color={'purple-700'}>
        <PostList className="post-list" amount={3} onReadMore={handlePostReadMore} />
      </SlantContainer>
    </div>
  );
};

export default HomePage;