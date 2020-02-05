/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
  ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS,
  IndexPatternMissingIndices,
  validateIndexPattern,
  getFromSavedObject,
  isDefault,
} from './lib';
import { getRoutes } from './utils';
import { flattenHitWrapper, formatHitProvider } from './index_patterns';

export const indexPatterns = {
  ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS,
  IndexPatternMissingIndices,
  validate: validateIndexPattern,
  getRoutes,
  getFromSavedObject,
  flattenHitWrapper,
  formatHitProvider,
  isDefault,
};

export { Field, FieldList } from './fields';

// TODO: figure out how to replace IndexPatterns in get_inner_angular.
export {
  IndexPattern,
  IndexPatterns,
  IndexPatternsContract,
  TypeMeta,
  AggregationRestrictions,
} from './index_patterns';
