import {app_config} from "@/massincidents/config/setconfig";

export const disclaimer = `
<p>Данная страница содержит <b>список проблем и предложений</b>, зафиксированных технической поддержкой ЕМИАС.</p>
<p>Если ваша проблема или предложение находится в списке, нажмите кнопку&nbsp;&nbsp;&nbsp;<span class="incident-inline-icon"><img alt="кнопка" src="`+ app_config.apiUrl + app_config.disclaimerImgUrl +`"/></span></p>
`