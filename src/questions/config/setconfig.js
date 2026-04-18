import {app_config_dev} from "@/questions/config/config-dev";
import {app_config_prod} from "@/questions/config/config-prod";
import {app_config_test} from "@/questions/config/config-test";

// dev prod test
let prodVar = 'prod';

// let componentName = "Questions";
let componentName = "QuestionsWebApp";
// let componentName = "AnonymViewerWebApp";
// let componentName = "AuthWebApp";


let app_config;

if(prodVar === 'prod') {
    app_config = app_config_prod;
}
else if (prodVar === 'dev'){
    app_config = app_config_dev;
}
else if (prodVar === 'test'){
    app_config = app_config_test;
}

let isWebApp = true;

if (componentName === "QuestionsWebApp"
    || componentName === "AnonymViewerWebApp"
    || componentName === "AuthWebApp"
)
{
    isWebApp = true;
}

app_config.isWebApp = isWebApp;

app_config.componentName = componentName

export {app_config}