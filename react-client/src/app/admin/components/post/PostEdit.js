import React, { Fragment, useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useApi } from '../../../services';

const PostEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  const [postForm, setPostForm] = useState({
    txtTitle: '',
    txtSynopsis: '',
    txtBody: '',
    ddlCategory: ''
  });

  useEffect(() => {
    if (viewModel && viewModel.post) {
      setPostForm({
        txtTitle: viewModel.post.title,
        txtSynopsis: viewModel.post.synopsis,
        txtBody: viewModel.post.body,
        ddlCategory: viewModel.post._categoryId
      });
    }
  }, [viewModel])

  const handleSubmit = (ev) => {
    ev.preventDefault();

    onSave({
      title: postForm.txtTitle,
      synopsis: postForm.txtSynopsis,
      body: postForm.txtBody,
      _categoryId: postForm.ddlCategory
    });
  }

  const handleInputChange = (ev) => {
    setPostForm({
      ...postForm,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSelectChange = (ev) => {
    console.log(ev);
    setPostForm({
      ...postForm,
      [ev.target.name]: ev.target.options[ev.target.selectedIndex].value
    });
  }
  
  return (
    <div className={className}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
  <h6 className="m-0 font-weight-bold text-primary">{!!viewModel && !!viewModel.post ? <Fragment>Update the post: {viewModel.post.title}</Fragment> : <Fragment>Create a new post</Fragment>}</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtTitle">Title</label>
              <input type="text" className="form-control" id="txtTitle" name="txtTitle" required value={postForm['txtTitle']} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtSynopsis">Synopsis</label>
              <textarea className="form-control" id="txtSynopsis" name="txtSynopsis" rows="3" required value={postForm['txtSynopsis']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="txtBody">Body</label>
              <textarea className="form-control" id="txtBody" name="txtBody" rows="10" required value={postForm['txtBody']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ddlCategory">Category</label>
              <select className="form-control" id="ddlCategory" name="ddlCategory"  onChange={handleSelectChange} value={postForm['ddlCategory']}>
                {viewModel && viewModel.categories && viewModel.categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
              {viewModel && viewModel.categories ?
                (<Select options={viewModel.categories.map(cat => { return { label: cat.name, value: cat._id}})} onChange={handleSelectChange} />)
                : ''
              }              
            </div>
            <button type="submit" className="btn btn-primary">Save post</button>
          </form>          
        </div>
      </div>
    </div>
  );
};

export default PostEdit;