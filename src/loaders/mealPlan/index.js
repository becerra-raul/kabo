import React from "react";
import ContentLoader from "react-content-loader";
const MealsPlageLoader = (props) => (
  <div className="w-full flex flex-col py-9 items-center bg-recipeGray">
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 w-full md:w-4/5 gap-10">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
        <div className="rounded-xl md:h-40 w-full mb-4 flex md:flex-row flex-col overflow-hidden">
          <ContentLoader width="100%">
            <rect rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
      </div>
    </div>
  </div>
);

export default MealsPlageLoader;
