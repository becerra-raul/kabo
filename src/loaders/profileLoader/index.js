import React from "react";
import ContentLoader from "react-content-loader";
const ProfileLoader = (props) => (
  <div>
    <div className="flex flex-wrap py-x">
      <div className="container pb-4 mb-4 bg-white p-4 md:m-6 rounded-xl flex-initial inline-block w-accountdetail-card">
        <ContentLoader width="100%" height="500px">
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="container pb-4 mb-4 bg-white p-4 md:m-6 rounded-xl flex-initial inline-block w-accountdetail-card">
        <ContentLoader width="100%" height="500px">
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
      <div className="container pb-4 mb-4 bg-white p-4 md:m-6 rounded-xl flex-initial inline-block w-accountdetail-card">
        <ContentLoader width="100%" height="500px">
          <rect rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </div>
    </div>
  </div>
);

export default ProfileLoader;
