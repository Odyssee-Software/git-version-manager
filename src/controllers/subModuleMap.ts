import { Git } from "../git";
import * as fs from 'fs';
import * as path from 'path';
import { SubModuleTree } from './subModuleTree';

export type SubModuleItem = {
  cwd : string;
  module : Git,
  moduleName : string,
}

export type SubModuleMap = Map<string , SubModuleItem>;

/**
 * La fonction `subModuleMap` dans TypeScript génère de manière asynchrone une carte plate de
 * sous-modules à partir d'une arborescence de sous-modules obtenue à partir d'un référentiel Git.
 * @param {Git}  - Cet extrait de code est une fonction asynchrone nommée « subModuleMap » qui est une
 * méthode d'une classe « Git ». Il ne prend aucun argument et renvoie une « Promesse » qui se résout
 * en un « SubModuleMap ».
 * @returns La fonction `subModuleMap` renvoie une promesse qui se résout en une `Map` contenant des
 * paires clé-valeur où la clé est une chaîne représentant le nom du module et la valeur est un objet
 * avec les propriétés `cwd`, `module` et `moduleName `.
 */
export async function subModuleMap( this:Git ):Promise<SubModuleMap>{

  function flatSubModule( tree:SubModuleTree ):[string , SubModuleItem][]{
    let result = [...tree.values()].reduce(( result:[string , SubModuleItem][] , item ) => {

      result.push([
        item.moduleName,
        {
          cwd : item.cwd,
          module : item.module,
          moduleName : item.moduleName
        }
      ])

      if(item.submodules && item.submodules.size > 0){
        let flat = flatSubModule( item.submodules );
        for(let x of flat){ result.push( x ) };
      }

      return result;
    } , []);
    return result;
  }

  let tree = await this.subModuleTree();
  let flat = flatSubModule( tree );

  return new Map(flat);

}