import { cwdPath } from '../preload';
import { Git, createGit } from "../git";
import * as fs from 'fs';
import * as path from 'path';
import { default as find } from 'find';
import validator from 'validator';
import { SubModuleItem } from './subModuleMap';

export type SubModuleTreeItem = SubModuleItem & {
  submodules : SubModuleTree
}

export type SubModuleTree = Map<string , SubModuleTreeItem>;

/**
 * Cette fonction TypeScript génère de manière asynchrone une arborescence de sous-modules au sein d'un
 * référentiel Git.
 * @param {Git}  - La fonction `subModuleTree` est une fonction asynchrone qui appartient à une classe
 * Git. Il renvoie une promesse qui se résout en un objet `SubModuleTree`.
 * @returns La fonction `subModuleTree` renvoie une `Promise` qui se résout en une `Map` contenant des
 * informations sur les sous-modules dans un référentiel Git. La carte contient des paires clé-valeur
 * où la clé est le nom du sous-module et la valeur est un objet avec les propriétés `cwd` (répertoire
 * de travail actuel), `module` (instance Git du sous-module), `moduleName` (nom du sous-module) et `
 * sous-modules
 */
export async function subModuleTree( this:Git ):Promise<SubModuleTree>{

  let result = new Map();

  let submodulePaths = (await this.subModule([ "foreach" , 'pwd' ])).split('\n').filter(x => x).reduce(( result , path ) => {
    if(fs.existsSync( path ))result.push(path);
    return result;
  } , [])

  let submodules = await submodulePaths.reduce(async ( result:[string , SubModuleTreeItem][] , modulePath ) => {

    let moduleName = path.basename( modulePath );
    let subGitModule = createGit( modulePath );

    (await result).push([
      moduleName ,
      {
        cwd : modulePath,
        module : subGitModule,
        moduleName,
        submodules : await subGitModule.subModuleTree()
      }
    ]);

    return result;

  } , []);

  result = new Map( submodules );

  console.log({ submodules })

  return result;

}