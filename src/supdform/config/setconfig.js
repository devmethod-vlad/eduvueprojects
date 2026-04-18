import {app_config_dev} from "@/supdform/config/config-dev";
import {app_config_prod} from "@/supdform/config/config-prod";

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