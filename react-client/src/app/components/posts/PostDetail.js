import { default as React, Fragment } from 'react';

const PostDetail = ({ post }) => {
  return (
    <Fragment>
      {!!post
        ? <Fragment>
            <article className="post--detail">
              <h1 className="post__title">{post.title}</h1>
              <div className="post__synopsis">{post.synopsis}</div>
              <div className="post__body" dangerouslySetInnerHTML={{
                __html: post.body
              }}></div>
            </article>
          </Fragment>
        : <Fragment></Fragment>
      }
    </Fragment>
  );
};

export default PostDetail;