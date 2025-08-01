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
 
import { useState, useEffect } from 'react';

import { type EditorAPI } from '@coze-editor/editor/preset-universal';
import { type ViewUpdate } from '@codemirror/view';

import { useLatest, isSkipSelectionChangeUserEvent } from '../utils';

interface Selection {
  anchor: number;
  head: number;
  from: number;
  to: number;
}

function isSameSelection(a?: Selection, b?: Selection) {
  if (!a && !b) {
    return true;
  }

  return (
    a &&
    b &&
    a.anchor === b.anchor &&
    a.head === b.head &&
    a.from === b.from &&
    a.to === b.to
  );
}

function useSelection(editor: EditorAPI | undefined) {
  const [selection, setSelection] = useState<Selection | undefined>();

  const selectionRef = useLatest(selection);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const view = editor.$view;

    function updateSelection(update?: ViewUpdate) {
      // 忽略 replaceTextByRange 导致的 selection change（效果：不触发 selection 变更，进而不显示推荐面板）
      if (update?.transactions.some(tr => isSkipSelectionChangeUserEvent(tr))) {
        setSelection(undefined);
        return;
      }

      const { from, to, anchor, head } = view.state.selection.main;
      const newSelection = { from, to, anchor, head };
      if (isSameSelection(newSelection, selectionRef.current)) {
        return;
      }

      setSelection({ from, to, anchor, head });
    }

    function handleSelectionChange(e: { update: ViewUpdate }) {
      updateSelection(e.update);
    }

    function handleFocus() {
      updateSelection();
    }

    editor.$on('selectionChange', handleSelectionChange);
    editor.$on('focus', handleFocus);

    return () => {
      editor.$off('selectionChange', handleSelectionChange);
      editor.$off('focus', handleFocus);
    };
  }, [editor]);

  return selection;
}

export { useSelection };
