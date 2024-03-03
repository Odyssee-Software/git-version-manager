import { cwdPath , versionManagerConfig } from './preload';
import { createGit } from './git';

export async function main(){

  console.log({ versionManagerConfig })

  let git = createGit(cwdPath);
  let moduleList = await git.subModuleMap();

  let otap = await git.ensureOTAP( versionManagerConfig );

}

export default main;