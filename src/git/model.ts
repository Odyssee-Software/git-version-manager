import { IGit } from './interface';
import { Git } from "./type";
import { simpleGit , SimpleGitOptions } from "simple-git";

// Controller //
import { subModuleTree , SubModuleTree } from '../controllers/subModuleTree';
import { subModuleMap } from '../controllers/subModuleMap';
import { ensureOTAP } from '../controllers/ensureOTAP';

/**
 * La fonction `createGit` crée un objet Git avec les propriétés supplémentaires `subModuleTree` et
 * `subModuleMap`.
 * @param {string} [baseDir] - Le paramètre `baseDir` dans la fonction `createGit` est un paramètre
 * facultatif qui spécifie le répertoire de base où les opérations Git seront effectuées. Si aucun
 * `baseDir` n'est fourni, les opérations Git seront effectuées dans le répertoire de travail actuel.
 * @param [options] - Le paramètre `options` dans la fonction `createGit` est de type
 * `Partial<SimpleGitOptions>`, ce qui signifie qu'il s'agit d'un objet qui peut contenir un
 * sous-ensemble de propriétés définies dans l'interface `SimpleGitOptions`. Cela vous permet de
 * transmettre des options de configuration spécifiques pour l'instance Git en cours de création
 * @returns La fonction `createGit` renvoie un objet qui est une combinaison du résultat de l'appel de
 * `simpleGit(baseDir, options)` et de l'ajout de propriétés supplémentaires. 
 * L'objet renvoyé est ensuite converti en type « Git ».
 */
export function createGit(baseDir?: string, options?: Partial<SimpleGitOptions>):Git{

  return Object.assign( simpleGit( baseDir , options )  , {
    subModuleTree,
    subModuleMap,
    ensureOTAP
  } as IGit) as Git;

}