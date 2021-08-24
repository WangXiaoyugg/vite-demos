import { Switch, Route, Link } from "react-router-dom";

const pages = import.meta.globEager("./pages/*.jsx");

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default,
  };
});

export function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Switch>
        {routes.map(({ path, component: RouteComp }) => {
          return (
            <Route key={path} path={path} exact>
              <RouteComp />
            </Route>
          );
        })}
      </Switch>
    </div>
  );
}

// export default {};
