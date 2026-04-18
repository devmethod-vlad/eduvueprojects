import {app_config_dev} from "@/glossary/config/config-dev";
import {app_config_prod} from "@/glossary/config/config_prod";

let prodVar = false;
let app_config;

prodVar ? app_config = app_config_prod : app_config = app_config_dev

export {app_config}