import {app_config_dev} from "@/projects/config/config-dev";
import {app_config_prod} from "@/projects/config/config-prod";
import {app_config_test} from "@/projects/config/config-test";
import {auth_config_prod} from "@/projects/config/auth-config-prod";
import {auth_config_dev} from "@/projects/config/auth-config-dev";
import {auth_config_test} from "@/projects/config/auth-config-test";

// prod  dev  test
let prodVar = 'dev';

let isWebApp = false;

let app_config;

let auth_config;

if (prodVar === 'test'){
    app_config = app_config_test;
    auth_config = auth_config_test;
}
else if (prodVar === 'dev'){
    app_config = app_config_dev;
    auth_config = auth_config_dev;
}
else if (prodVar === 'prod'){
    app_config = app_config_prod;
    auth_config = auth_config_prod;
}

app_config.isWebApp = isWebApp;
auth_config.isWebApp = isWebApp;

export {app_config, auth_config}