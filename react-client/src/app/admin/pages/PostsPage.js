import React, { Fragment, useState } from 'react';
import { PostList } from '../../admin/components';

const PostsPage = ({ children }) => {

  return (
    <div className="pol">
      <div className="container">
        <div className="row">
          <PostList className="col-12 col-sm-12 col-md-12 col-lg-12 ol-xl-6 post-list" limit={10} skip={1}  />
        </div>
      </div>
    </div>
  )
};
export default PostsPage;