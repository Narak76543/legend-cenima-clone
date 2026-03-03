import { proxyRequest } from "h3";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const path = event.context.params?.path || "";
  const target = `${config.apiBase}/${path}`.replace(/([^:]\/)\/+/g, "$1");

  return proxyRequest(event, target);
});
