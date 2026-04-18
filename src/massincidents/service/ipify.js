import {app_config} from "@/massincidents/config/setconfig";

// ipify.js
async function fetchPublicIpSoft(opts) {
    const timeoutMs = (opts && typeof opts.timeoutMs === "number") ? opts.timeoutMs : 1500;
    const cache = (opts && opts.cache) ? opts.cache : "no-store";

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(app_config.checkIpUrl, {
            method: "GET",
            signal: controller.signal,
            cache,
        });

        if (!res.ok) return null;

        const data = await res.json();

        const ip = (data && typeof data.ip === "string") ? data.ip.trim() : "";
        if (!ip) return null;

        const isV4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
        const isV6ish = /^[0-9a-fA-F:]+$/.test(ip) && ip.includes(":");

        return (isV4 || isV6ish) ? ip : null;
    } catch (e) {
        // сеть/блокировки/CORS/таймаут/abort — всё превращаем в null
        return null;
    } finally {
        window.clearTimeout(timer);
    }
}
export { fetchPublicIpSoft };
