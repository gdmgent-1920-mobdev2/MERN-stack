import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';
import { NavLink } from 'react-router-dom';

import * as Routes from '../../../routes';

const PostsTable = ({children, posts, onDelete}) => {

  const handleDelete = (event, postId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(postId, deleteMode);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Synopsis</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts && posts.map(post => (
          <tr
            key={post.id}
          >
            <td>
              CHKB
            </td>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>
              {moment(posts._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a className={classnames(post._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" href="#" onClick={ev => handleDelete(ev, post.id, post._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a aria-label="delete-forever" href="#" onClick={ev => handleDelete(ev, post.id, 'delete')}><i className="fas fa-trash"></i></a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;