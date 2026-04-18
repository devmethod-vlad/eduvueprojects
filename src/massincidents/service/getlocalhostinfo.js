import {app_config} from "@/massincidents/config/setconfig";

async function getLocalHostInfo(appStore){
    console.log("getLocalHostInfo");
    if (app_config.fakeLocalAuth){
        // console.log("getLocalHostInfo enable fakeLocalAuth");

        appStore.localHostInfo.login = app_config.fakeLocalLogin;
        appStore.localHostInfo.armipaddr = app_config.fakeLocalIpAddr;
        appStore.isUserFromArm = true;
    }
    else {
        try{
            let localResp = await fetch('https://localhost');

            let answer = await localResp.json();

            // console.log("localHostServiceAuth answer : ", answer);

            appStore.localHostInfo.login = await answer['user'];
            appStore.localHostInfo.armnetaddr = await answer['armnetaddr'];
            appStore.localHostInfo.hostname = await answer['hostname'];
            appStore.localHostInfo.armipaddr = await answer['armipaddr'];
            appStore.localHostInfo.armdefgw = await answer['armdefgw'];
            appStore.localHostInfo.armnetmask = await answer['armnetmask'];

            appStore.isUserFromArm = true;

            if(appStore.$state.localHostInfo.armipaddr !== ''){
                    appStore.userip = appStore.$state.localHostInfo.armipaddr;
            }
        }
        catch (e) {
            console.log(e);
            console.log('error fetch https://localhost: ');
            return {'status':'error'};
        }
    }
}
export {getLocalHostInfo}