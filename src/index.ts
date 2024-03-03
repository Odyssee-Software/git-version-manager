import { cwdPath , GIT_CREDENTIALS , versionManagerConfig } from './preload';
import { createGit } from './git';

export async function main(){

  console.log({ versionManagerConfig })

  let git = createGit(cwdPath);
  git.env({ GIT_CREDENTIALS })
  let moduleList = await git.subModuleMap();

  let otap = await git.ensureOTAP( versionManagerConfig );

}

export default main;