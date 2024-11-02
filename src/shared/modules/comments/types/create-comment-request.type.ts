import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/request.type.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
