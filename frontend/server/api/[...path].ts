import { getRequestURL, proxyRequest } from "h3";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const path = event.context.params?.path || "";
  const search = getRequestURL(event).search;
  const target = `${config.apiBase}/${path}${search}`.replace(/([^:]\/)\/+/g, "$1");

  return proxyRequest(event, target);
});
