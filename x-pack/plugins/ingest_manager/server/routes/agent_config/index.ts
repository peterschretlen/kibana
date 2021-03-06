/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { IRouter } from 'kibana/server';
import { PLUGIN_ID, AGENT_CONFIG_API_ROUTES } from '../../constants';
import {
  GetAgentConfigsRequestSchema,
  GetOneAgentConfigRequestSchema,
  CreateAgentConfigRequestSchema,
  UpdateAgentConfigRequestSchema,
  DeleteAgentConfigsRequestSchema,
  GetFullAgentConfigRequestSchema,
} from '../../types';
import {
  getAgentConfigsHandler,
  getOneAgentConfigHandler,
  createAgentConfigHandler,
  updateAgentConfigHandler,
  deleteAgentConfigsHandler,
  getFullAgentConfig,
} from './handlers';

export const registerRoutes = (router: IRouter) => {
  // List
  router.get(
    {
      path: AGENT_CONFIG_API_ROUTES.LIST_PATTERN,
      validate: GetAgentConfigsRequestSchema,
      options: { tags: [`access:${PLUGIN_ID}-read`] },
    },
    getAgentConfigsHandler
  );

  // Get one
  router.get(
    {
      path: AGENT_CONFIG_API_ROUTES.INFO_PATTERN,
      validate: GetOneAgentConfigRequestSchema,
      options: { tags: [`access:${PLUGIN_ID}-read`] },
    },
    getOneAgentConfigHandler
  );

  // Create
  router.post(
    {
      path: AGENT_CONFIG_API_ROUTES.CREATE_PATTERN,
      validate: CreateAgentConfigRequestSchema,
      options: { tags: [`access:${PLUGIN_ID}-all`] },
    },
    createAgentConfigHandler
  );

  // Update
  router.put(
    {
      path: AGENT_CONFIG_API_ROUTES.UPDATE_PATTERN,
      validate: UpdateAgentConfigRequestSchema,
      options: { tags: [`access:${PLUGIN_ID}-all`] },
    },
    updateAgentConfigHandler
  );

  // Delete
  router.post(
    {
      path: AGENT_CONFIG_API_ROUTES.DELETE_PATTERN,
      validate: DeleteAgentConfigsRequestSchema,
      options: { tags: [`access:${PLUGIN_ID}-all`] },
    },
    deleteAgentConfigsHandler
  );

  // Get one full agent config
  router.get(
    {
      path: AGENT_CONFIG_API_ROUTES.FULL_INFO_PATTERN,
      validate: GetFullAgentConfigRequestSchema,
      options: { tags: [`access:${PLUGIN_ID}-read`] },
    },
    getFullAgentConfig
  );
};
