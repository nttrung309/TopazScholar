import React from "react";
import { Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const renderRoute = (router) => {
  const DynamicComponent = router.element;
  const LayoutComponent = router.layout;

  if (LayoutComponent && DynamicComponent) {
    return (
      <Route
        key={router.path}
        path={router.path}
        element={
          <LayoutComponent>
            <React.Suspense
              fallback={
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              }
            >
              <DynamicComponent />
            </React.Suspense>
          </LayoutComponent>
        }
      />
    );
  } // Nếu layout === null
  else
    return (
      <Route
        key={router.path}
        path={router.path}
        element={
          <React.Suspense
            fallback={
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            }
          >
            <DynamicComponent />
          </React.Suspense>
        }
      />
    );

  // return(
  //     <Route
  //         key={router.path}
  //         path={router.path}
  //         element={
  //             <React.Suspense fallback={<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}>
  //                 <DynamicComponent/>
  //             </React.Suspense>
  //         }
  //     />
  // )
};

const useRouter = ({ routers, privateRoute }) => {
  return React.useMemo(() => {
    return {
      views: routers.map((router) => renderRoute(router)),
      routes: routers,
    };
  }, [routers, privateRoute]);
};

export default useRouter;
