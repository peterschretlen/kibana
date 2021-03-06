/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SavedObjectsType } from 'src/core/server';

export const CASE_SAVED_OBJECT = 'cases';

export const caseSavedObjectType: SavedObjectsType = {
  name: CASE_SAVED_OBJECT,
  hidden: false,
  namespaceAgnostic: false,
  mappings: {
    properties: {
      comment_ids: {
        type: 'keyword',
      },
      created_at: {
        type: 'date',
      },
      created_by: {
        properties: {
          username: {
            type: 'keyword',
          },
          full_name: {
            type: 'keyword',
          },
        },
      },
      description: {
        type: 'text',
      },
      title: {
        type: 'keyword',
      },
      status: {
        type: 'keyword',
      },
      tags: {
        type: 'keyword',
      },
      updated_at: {
        type: 'date',
      },
      updated_by: {
        properties: {
          username: {
            type: 'keyword',
          },
          full_name: {
            type: 'keyword',
          },
        },
      },
    },
  },
};
