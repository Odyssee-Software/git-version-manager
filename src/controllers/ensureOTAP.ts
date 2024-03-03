import { VersionManagerConfig } from "../preload";
import { Git } from "../git";
import { randomUUID } from 'crypto';
import { BranchSummary } from "simple-git";

async function createBranch( git:Git , branch:BranchSummary , branchName:string ){

  let checkout = await git.checkoutBranch( branchName , `origin/${branch.current}` );
  console.log({ checkout });
  let add = await git.add('.');
  console.log({ add });
  let commit = await git.commit(`${randomUUID()}-auto-init`);
  console.log({ commit });
  let push = await git.push( `origin` , branchName );
  console.log({ push });

}

export async function ensureOTAP( this:Git , config:VersionManagerConfig ){

  let result = await this.branch();
  let { branches } = result;
  let otap = config["OTAP-branches"]

  if( !branches["development"] )await createBranch( this , result , otap["development"] );
  // if( !branches["test"] )
  // if( !branches["acceptance"] )
  // if( !branches["production"] )

  console.log({ result })

}