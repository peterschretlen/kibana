/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { schema } from '@kbn/config-schema';
import { boomify, isBoom } from 'boom';
import {
  CustomHttpResponseOptions,
  ResponseError,
  SavedObject,
  SavedObjectsFindResponse,
} from 'kibana/server';
import {
  CaseRequest,
  CaseResponse,
  CasesFindResponse,
  CaseAttributes,
  CommentResponse,
  CommentsResponse,
  CommentAttributes,
} from '../../../common/api';

import { SortFieldCase } from './types';

export const transformNewCase = ({
  createdDate,
  newCase,
  full_name,
  username,
}: {
  createdDate: string;
  newCase: CaseRequest;
  full_name?: string;
  username: string;
}): CaseAttributes => ({
  comment_ids: [],
  created_at: createdDate,
  created_by: { full_name, username },
  updated_at: null,
  updated_by: null,
  ...newCase,
});

interface NewCommentArgs {
  comment: string;
  createdDate: string;
  full_name?: string;
  username: string;
}
export const transformNewComment = ({
  comment,
  createdDate,
  full_name,
  username,
}: NewCommentArgs): CommentAttributes => ({
  comment,
  created_at: createdDate,
  created_by: { full_name, username },
  updated_at: null,
  updated_by: null,
});

export function wrapError(error: any): CustomHttpResponseOptions<ResponseError> {
  const boom = isBoom(error) ? error : boomify(error);
  return {
    body: boom,
    headers: boom.output.headers,
    statusCode: boom.output.statusCode,
  };
}

export const transformCases = (
  cases: SavedObjectsFindResponse<CaseAttributes>,
  countOpenCases: number,
  countClosedCases: number
): CasesFindResponse => ({
  page: cases.page,
  per_page: cases.per_page,
  total: cases.total,
  cases: flattenCaseSavedObjects(cases.saved_objects),
  count_open_cases: countOpenCases,
  count_closed_cases: countClosedCases,
});

export const flattenCaseSavedObjects = (
  savedObjects: SavedObjectsFindResponse<CaseAttributes>['saved_objects']
): CaseResponse[] =>
  savedObjects.reduce((acc: CaseResponse[], savedObject: SavedObject<CaseAttributes>) => {
    return [...acc, flattenCaseSavedObject(savedObject, [])];
  }, []);

export const flattenCaseSavedObject = (
  savedObject: SavedObject<CaseAttributes>,
  comments: Array<SavedObject<CommentAttributes>> = []
): CaseResponse => ({
  id: savedObject.id,
  version: savedObject.version ?? '0',
  comments: flattenCommentSavedObjects(comments),
  ...savedObject.attributes,
});

export const transformComments = (
  comments: SavedObjectsFindResponse<CommentAttributes>
): CommentsResponse => ({
  page: comments.page,
  per_page: comments.per_page,
  total: comments.total,
  comments: flattenCommentSavedObjects(comments.saved_objects),
});

export const flattenCommentSavedObjects = (
  savedObjects: SavedObjectsFindResponse<CommentAttributes>['saved_objects']
): CommentResponse[] =>
  savedObjects.reduce((acc: CommentResponse[], savedObject: SavedObject<CommentAttributes>) => {
    return [...acc, flattenCommentSavedObject(savedObject)];
  }, []);

export const flattenCommentSavedObject = (
  savedObject: SavedObject<CommentAttributes>
): CommentResponse => ({
  id: savedObject.id,
  version: savedObject.version ?? '0',
  ...savedObject.attributes,
});

export const sortToSnake = (sortField: string): SortFieldCase => {
  switch (sortField) {
    case 'status':
      return SortFieldCase.status;
    case 'createdAt':
    case 'created_at':
      return SortFieldCase.createdAt;
    case 'updatedAt':
    case 'updated_at':
      return SortFieldCase.updatedAt;
    default:
      return SortFieldCase.createdAt;
  }
};

export const escapeHatch = schema.object({}, { allowUnknowns: true });
