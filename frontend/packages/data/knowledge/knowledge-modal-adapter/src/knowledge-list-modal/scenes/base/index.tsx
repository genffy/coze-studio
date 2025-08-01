/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
import { type UnitType } from '@coze-data/knowledge-resource-processor-core';
import {
  useKnowledgeListModal as useKnowledgeListModalBase,
  type UseKnowledgeListModalParams,
} from '@coze-data/knowledge-modal-base';

import { useCreateKnowledgeModalV2 } from '../../../create-knowledge-modal-v2/scenes/base';

// 直接使用原始参数类型，不需要创建新的接口
export const useKnowledgeListModal = (
  params: Omit<UseKnowledgeListModalParams, 'createKnowledgeModal'>,
) => {
  const { onClickAddKnowledge, beforeCreate, projectID } = params;

  // 创建知识库的modal
  const createKnowledgeModal = useCreateKnowledgeModalV2({
    projectID,
    onFinish: (datasetId: string, type: UnitType, shouldUpload: boolean) => {
      onClickAddKnowledge?.(datasetId, type, shouldUpload);
      createKnowledgeModal.close();
    },
    beforeCreate,
  });

  // 将createKnowledgeModal传递给base组件
  return useKnowledgeListModalBase({
    ...params,
    createKnowledgeModal,
  });
};
