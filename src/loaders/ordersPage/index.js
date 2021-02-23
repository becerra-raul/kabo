import React from "react";
import ContentLoader from "react-content-loader";
const OrdersLoader = (props) => (
  <div>
    <div className="flex gap-2 md:gap-3 justify-center flex-wrap max-w-2xl">
      <div className="w-72 mx-2">
        <ContentLoader
        >
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="w-72 mx-2">
        <ContentLoader
        >
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="w-72 mx-2">
        <ContentLoader
        >
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="w-72 mx-2">
        <ContentLoader
        >
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="w-72 mx-2">
        <ContentLoader
        >
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="w-72 mx-2">
        <ContentLoader
        >
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
    </div>
  </div>
);

export default OrdersLoader;
