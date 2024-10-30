import { Container } from 'inversify';
import { Component } from '../../const.js';
import { CommentService } from './comment-service.interface.js';
import { DefaultCommentService } from './default-comment.service.js';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
