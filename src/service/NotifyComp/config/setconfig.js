import {notify_config_dev} from "@/service/NotifyComp/config/config-dev";
import {notify_config_prod} from "@/service/NotifyComp/config/config-prod";

let prodVar = true;

let notify_config;

if (prodVar){
    notify_config = notify_config_prod;
}
else{
    notify_config = notify_config_dev;
}

export {notify_config}