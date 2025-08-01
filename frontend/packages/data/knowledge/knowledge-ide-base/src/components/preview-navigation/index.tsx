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
 
import { type DataSetInfo } from '@coze-arch/bot-api/memory';
import { type Dataset } from '@coze-arch/bot-api/knowledge';
import { UIBreadcrumb } from '@coze-studio/components';
import { Layout } from '@coze-arch/coze-design';

import styles from './index.module.less';

export interface KnowledgePreviewNavigationProps {
  datasetInfo: Dataset;
}
export const KnowledgePreviewNavigation = ({
  datasetInfo,
}: KnowledgePreviewNavigationProps) => (
  <Layout.Header
    className={styles.header}
    breadcrumb={
      <UIBreadcrumb
        showTooltip={{ width: '160px' }}
        className={styles.breadcrumb}
        datasetInfo={datasetInfo as unknown as DataSetInfo}
        compact={false}
      />
    }
  ></Layout.Header>
);
