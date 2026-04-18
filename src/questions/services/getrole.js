import {app_config} from "@/questions/config/setconfig";

function getRoleInfo(roleid){
    for (const [key, value] of Object.entries(app_config.BASE_ROLE)) {
        if (Number(value.id) === Number(roleid)){
            return [key, value.show_name];
        }
    }
    return null;
}

export {getRoleInfo}