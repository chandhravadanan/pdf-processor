import fs from 'fs';
import path from 'path';
import { FILES_DIR } from './constants';

export const checkAndcreateFilesDir = () => {
  const dirPath = path.join(process.cwd(), FILES_DIR);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

export const getFullPath = (fileName: string) => {
  return path.join(process.cwd(), FILES_DIR, fileName);
}
