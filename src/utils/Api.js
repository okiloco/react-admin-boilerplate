import feathers from "@feathersjs/feathers";
import restFeathers from "@feathersjs/rest-client";
import feathersAuthClient from "@feathersjs/authentication-client";

import { URL_BASE, URL_AUTHENTICATION } from "../constants";
const api = feathers();
const restClient = restFeathers(URL_BASE);
const authClient = feathersAuthClient({
  header: "Authorization",
  path: "/authentication",
  jwtStrategy: "jwt",
  entity: "user",
  service: "users",
  storage: window.localStorage,
});
api.configure(restClient.fetch(window.fetch.bind(window)));
api.configure(authClient);

export const galleryService = api.service("gallery");
export const CategoriesService = api.service("categories");
export const get_service = (service) => api.service(service);

export default api;
