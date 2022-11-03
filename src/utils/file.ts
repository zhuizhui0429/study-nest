export function getRandomFileName(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.');
  const name = fileName.slice(0, dotIndex);
  const ext = fileName.slice(dotIndex + 1);
  return `${name}-${Math.random().toString(32).slice(-6)}.${ext}`;
}
