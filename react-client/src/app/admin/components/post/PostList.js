import { default as React, useEffect, useState } from 'react';
import { default as classnames } from 'classnames';
import { NavLink } from 'react-router-dom';

import $ from 'jquery'; 

import * as Routes from '../../../routes';
import { useApi } from '../../../services/';
import { useToast } from '../../services';

import PostsTable from './PostsTable';

import './PostList.scss';


const PostList = ({children, className, limit = 10, skip = 1}) => {  
  const { deletePost, findAllPosts } = useApi();
  const { addToast } = useToast();
  const [ posts, setPosts ] = useState();
  const [ currentPageIndex, setCurrentPageIndex ] = useState(skip);
  const [ pagination, setPagination ] = useState({
    limit,
    page: skip,
    pages: 1,
    total: 1
  });
  const [ postToDelete, setPostToDelete ] = useState(null);

  useEffect(() => {
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

    if (postToDelete === null) {
      fetchPosts();
    }
    
  }, [currentPageIndex, postToDelete]);

  const handlePage = (ev, pageIndex) => {
    ev.preventDefault();

    setCurrentPageIndex(pageIndex);
  }

  const handleDelete = (postId, mode) => {
    setPostToDelete({
      post: posts.find(post => post.id == postId),
      mode,
    });
    
    $('#confirmModal').modal('show');
  }

  const handleDeleteConfirm = () => {
    const deleted = deletePost(postToDelete.post.id, postToDelete.mode);

    addToast({
      title: `Admin: Post`,
      message: `Succesfully deleted the post with id ${postToDelete.post.id} and title ${postToDelete.post.title}`
    });

    $('#confirmModal').modal('hide');

    setPostToDelete(null);
  }

  return (
    <div className={className}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Posts</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <PostsTable posts={posts} onDelete={handleDelete}  />
          </div>          
        </div>
        <div className="card-footer">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {(pagination.page > 1) ? (<li className="page-item"><a className="page-link" href="#" onClick={ev => handlePage(ev, pagination.page - 1)}>Previous</a></li>) : ''}
              {
                Array(pagination.pages).fill(true).map((item, index) => (
                  <li key={index} className={classnames('page-item', (pagination.page === index + 1) ? 'active' : '' )}><a className="page-link" href="#" onClick={ev => handlePage(ev, index + 1)}>{index + 1}</a></li>
                ))
              }
              {(pagination.page !== pagination.pages) ? (<li className="page-item"><a className="page-link" href="#" onClick={ev => handlePage(ev, pagination.page + 1)}>Next</a></li>) : ''}                
            </ul>
          </nav>
        </div>
      </div>
      <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={ev => handleDeleteConfirm(ev)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;