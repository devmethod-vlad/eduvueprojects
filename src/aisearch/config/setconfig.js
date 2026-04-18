import {app_config_dev} from "@/aisearch/config/config-dev";
import {app_config_prod} from "@/aisearch/config/config-prod";

// dev prod
let prodVar = 'dev';

let app_config;

if(prodVar === 'prod') {
    app_config = app_config_prod;
}
else if (prodVar === 'dev'){
    app_config = app_config_dev;
}

export {app_config}