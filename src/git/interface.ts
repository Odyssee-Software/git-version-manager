import { SimpleGit } from "simple-git";
import { VersionManagerConfig } from '../preload';

import { SubModuleTree } from '../controllers/subModuleTree';
import { SubModuleMap } from '../controllers/subModuleMap';

export interface IGit extends Partial<SimpleGit>{

  subModuleTree():Promise<SubModuleTree>;
  subModuleMap():Promise<SubModuleMap>;
  ensureOTAP(config:VersionManagerConfig):Promise<void>;

}