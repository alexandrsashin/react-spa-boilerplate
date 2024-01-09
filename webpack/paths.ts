import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

export default {
  appBuild: resolveApp('build'), // Prod built files end up here
  appHtml: resolveApp('public/index.html'), // html file,
  appIndexTsx: resolveApp('src/index.tsx'), // Main entry point
  appSrc: resolveApp('src') // App source
};
