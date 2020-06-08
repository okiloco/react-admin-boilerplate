// in src/App.js
import React from "react";
import { Admin, Resource, mergeTranslations } from "react-admin";
import { createHashHistory } from "history";
import { restClient, authClient } from "ra-data-feathers";
import Api from "./utils/Api";
import englishMessages from "ra-language-english";
import treeEnglishMessages from "ra-tree-language-english";
/* import UserList from "./pages/users/UserList"; */
import ShowCities from "./pages/cities/ShowCities";
import Cities from "./pages/cities/Cities";
import routes from "./routes.js";
import Layout from "./layouts/Layout";
const messages = {
  en: mergeTranslations(englishMessages, treeEnglishMessages),
};

const restClientOptions = {
  usePatch: true,
};

const authClientOptions = {
  storageKey: "feathers-jwt",
  authenticate: { strategy: "local" },
  permissionsKey: "permissions",
  permissionsField: "roles",
  redirectTo: "/login",
};
const history = createHashHistory();
//const App = () => <Admin dataProvider={dataProvider} />;
const App = () => (
  <Admin
    dataProvider={restClient(Api, restClientOptions)}
    authProvider={authClient(Api, authClientOptions)}
    history={history}
    appLayout={Layout}
    /* i18nProvider={i18nProvider} */
    locale="en"
  >
    {
      routes.map(route => (<Resource {...route} />))
    }
  </Admin>
);
export default App;
