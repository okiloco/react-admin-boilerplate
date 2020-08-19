// in src/App.js
import React from "react";
import { Admin, Resource, mergeTranslations } from "react-admin";
import { createHashHistory } from "history";
import { restClient, authClient } from "ra-data-feathers";
import Api from "./utils/Api";
import englishMessages from "ra-language-english";
import treeEnglishMessages from "ra-tree-language-english";
/* import UserList from "./pages/users/UserList"; */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
const Default = () => (<>Feature Component</>);
//const App = () => <Admin dataProvider={dataProvider} />;
const getRoutes = (routes, parent) => {
  return routes.map(route => {
    if (parent && !route.list) {
      route.list = parent.list || Default;
    } else {
      if (!route.children)
        route.list = route.list || Default;
    }
    if (typeof route.children != "undefined")
      return getRoutes(route.children, route);
    return <Resource {...route} />
  })
}
const App = () => (
  <Admin
    dataProvider={restClient(Api, restClientOptions)}
    authProvider={authClient(Api, authClientOptions)}
    history={history}
    appLayout={Layout}
    locale="en"
  >
    {
      getRoutes(routes)
    }
  </Admin>
);
export default App;
