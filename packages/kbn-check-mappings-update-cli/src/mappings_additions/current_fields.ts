/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { readFile, writeFile } from 'fs/promises';
import Path from 'path';
import { FieldListMap } from '@kbn/core-saved-objects-base-server-internal';

const CURRENT_FIELDS_FILE_PATH = Path.resolve(__dirname, '../../current_fields.json');

export const readCurrentFields = async (): Promise<FieldListMap> => {
  try {
    const fileContent = await readFile(CURRENT_FIELDS_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
};

export const writeCurrentFields = async (fieldMap: FieldListMap) => {
  await writeFile(CURRENT_FIELDS_FILE_PATH, JSON.stringify(fieldMap, null, 2) + '\n', 'utf-8');
};
