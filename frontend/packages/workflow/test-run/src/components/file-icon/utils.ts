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
 
import mime from 'mime-types';
import {
  IconCozFileAudio,
  IconCozFileCode,
  IconCozFilePptx,
  IconCozFileDocx,
  IconCozFileTxt,
  IconCozFileZip,
  IconCozFileXlsx,
  IconCozFileVideo,
  IconCozFileOther,
  IconCozFilePdf,
  IconCozFileCsv,
} from '@coze-arch/coze-design/illustrations';

import { PREVIEW_IMAGE_TYPE } from './constants';

const codeExtensions = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'html',
  'htm',
  'css',
  'scss',
  'sass',
  'less',
  'py',
  'java',
  'c',
  'cpp',
  'h',
  'hpp',
  'cs',
  'go',
  'rb',
  'php',
  'swift',
  'kt',
  'kts',
  'sql',
  'pl',
  'sh',
  'bash',
  'rs',
  'dart',
  'scala',
  'yaml',
  'yml',
  'json',
];

function isCodeFile(extension: string) {
  return codeExtensions.includes(extension);
}

function isAudioFile(extension: string) {
  const mimeType = mime.lookup(extension);
  return mimeType ? mimeType.startsWith('audio/') : false;
}

function isVideoFile(extension: string) {
  const mimeType = mime.lookup(extension);
  return mimeType ? mimeType.startsWith('video/') : false;
}

const ICON_MAP = {
  // ppt
  ppt: IconCozFilePptx,
  pptx: IconCozFilePptx,
  // doc
  doc: IconCozFileDocx,
  docx: IconCozFileDocx,
  pdf: IconCozFilePdf,
  // txt
  txt: IconCozFileTxt,
  // zip
  zip: IconCozFileZip,
  rar: IconCozFileZip,
  // excel
  xls: IconCozFileXlsx,
  xlsx: IconCozFileXlsx,
  csv: IconCozFileCsv,
  // code
  code: IconCozFileCode,
  // video
  video: IconCozFileVideo,
  // audio
  audio: IconCozFileAudio,
};

export const getIconByExtension = (extension: string) => {
  let fileIcon = ICON_MAP[extension] ?? IconCozFileOther;
  if (isAudioFile(extension)) {
    fileIcon = ICON_MAP.audio;
  } else if (isVideoFile(extension)) {
    fileIcon = ICON_MAP.video;
  } else if (isCodeFile(extension)) {
    fileIcon = ICON_MAP.code;
  }

  return fileIcon;
};

/** 获取文件名后缀 */
export function getFileExtension(name?: string) {
  if (!name) {
    return '';
  }
  const index = name.lastIndexOf('.');
  return name.slice(index + 1).toLowerCase();
}

export const isImageFile = (name: string) => {
  const ext = getFileExtension(name);
  return PREVIEW_IMAGE_TYPE.includes(ext);
};
