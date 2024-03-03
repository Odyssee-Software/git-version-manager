import * as fs from 'fs';
import * as path from 'path';

export const cwdPath = (process.env.PWD ? process.env.PWD : process.cwd());

export type VersionManagerConfig = {
  "git-config" : {
    "user-name" : string;
    "user-email" : string;
    "user-token" : string;
  },
  "meta" : {
    "author-name" : string;
    "author-email" : string;
  },
  "OTAP-branches" : {
    "development" : string;
    "test" : string;
    "acceptance" : string;
    "production" : string;
  }
}

export const versionManagerConfig = (() => {

  let defaultConfig:VersionManagerConfig = {
    "git-config" : {
      "user-name" : null,
      "user-email" : null,
      "user-token" : null
    },
    "meta" : {
      "author-name" : null,
      "author-email" : null
    },
    "OTAP-branches" : {
      "development" : "development",
      "test" : "test",
      "acceptance" : "acceptance",
      "production" : "production"
    }
  };

  console.log({ message : 'version-manager.json loading' });

  let configurationFilePath = path.join( cwdPath , 'version-manager.json' );
  let isFileExist = fs.existsSync( configurationFilePath );

  if(!isFileExist){
    console.log({ message : 'version-manager.json is not existing' });
    return defaultConfig;
  }

  console.log({ message : 'version-manager.json found' });
  return {
    ...defaultConfig,
    ...JSON.parse(fs.readFileSync( configurationFilePath , 'utf-8' ))
  }

})()