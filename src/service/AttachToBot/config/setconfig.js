import {attachbot_config_prod} from "@/service/AttachToBot/config/config-prod";
import {attachbot_config_dev} from "@/service/AttachToBot/config/config-dev";

let prodVar = true;

let attachbot_config;

if (prodVar){
    attachbot_config = attachbot_config_prod;
}
else{
    attachbot_config = attachbot_config_dev;
}

export {attachbot_config}