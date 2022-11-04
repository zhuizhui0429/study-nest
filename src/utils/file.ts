export function getRandomFileName(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.');
  const name = fileName.slice(0, dotIndex);
  const ext = fileName.slice(dotIndex + 1);
  return `${name}-${Math.random().toString(32).slice(-6)}.${ext}`;
}
/**
 *
 * @param fileName 文件名
 * @returns 获取文件后缀名
 */
export function getFileExt(fileName: string) {
  return fileName.slice(fileName.lastIndexOf('.') + 1);
}
/**
 *
 * @param mimeType 文件的mimetype
 * @return 文件应该的存储类型
 */
type storageType = 'images' | 'videos' | 'files';
export function getStorageType(mimeType: string): storageType {
  const type = mimeType.split('/')[0];
  if (type === 'image') {
    return 'images';
  } else if (type === 'video') {
    return 'videos';
  }
  return 'files';
}
