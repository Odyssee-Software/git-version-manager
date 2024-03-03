import { IGit } from "./interface";
import { SimpleGit } from "simple-git";

export type Git = SimpleGit & Partial<SimpleGit> & IGit &Partial<IGit>;