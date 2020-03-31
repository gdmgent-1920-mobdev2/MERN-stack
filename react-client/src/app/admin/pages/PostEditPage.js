import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Routes from '../../routes';
import { PostEdit } from '../components';
import { useApi } from '../../services';

const PostEditPage = ({ children }) => {
  const { id } = useParams();
  const { editPostViewModel, updatePost } = useApi();
  const [ postViewModel, setPostViewModel ] = useState(null);

  let history = useHistory();

  useEffect(() => {
    const fetchPostViewModel = async () => {        
      const data = await editPostViewModel(id);
      setPostViewModel(data);
    }

    fetchPostViewModel();    
  }, [editPostViewModel]);

  const handleOnUpdate = async (post) => {
    const updatedPost = await updatePost(post);

    history.push(Routes.BACKOFFICE_POSTS);
  }
  
  return (
    <div className="container">
      <div className="row">
        <PostEdit className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-edit" viewModel={postViewModel} onUpdate={handleOnUpdate} />
      </div>
    </div>
  )
};
export default PostEditPage;