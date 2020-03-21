import * as React from "react";

import { Main } from "../pages/Main";

export const App = () => {
  return (
    <WithPagination>
      <Page name="/">
        <Main />
      </Page>
      <Page name="/bp">Seite für die Bundespolizei</Page>
    </WithPagination>
  );
};

/* Pagination */
type IPage = "/" | "/bp";

const PageContext = React.createContext<{ page: IPage; setPage(p: IPage): void }>({ page: "/", setPage() {} });

export const WithPagination = ({ children }: React.PropsWithChildren<{}>) => {
  const [page, _setPage] = React.useState<IPage>(window.location.pathname as IPage);

  React.useEffect(() => {
    window.addEventListener("popstate", e => {
      _setPage(e.state.page || "");
    });
  }, []);

  function setPage(newPage: IPage) {
    console.log("page", newPage);
    window.history.pushState({ page }, "Grenzexpress", newPage);
    _setPage(newPage);
  }
  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
};

export const Page = ({ children, name }: React.PropsWithChildren<{ name: IPage }>) => {
  const { page } = React.useContext(PageContext);
  if (page !== name) return null;
  return <>{children}</>;
};

export const Link = ({ to, children }: React.PropsWithChildren<{ to: IPage }>) => {
  const { setPage } = React.useContext(PageContext);
  return <span onClick={() => setPage(to)}>{children}</span>;
};
