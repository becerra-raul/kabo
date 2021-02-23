import React from "react";
import ContentLoader from "react-content-loader";
const HomeLoader = (props) => (
  <div>
    <ContentLoader speed={2} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" width="100%" {...props}>
      <rect x="0" y="0" width="100%" height="100px" />
    </ContentLoader>
    <div className="grid md:grid-cols-3 gap-5 md:gap-4 xl:gap-10 grid-cols-1">
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" height="47.9" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="47.99" />
        </ContentLoader>

        <div className="py-8 px-5 relative">
          <div className="w-full flex justify-between font-semibold text-base mb-14 md:flex-col xl:flex-row">
            <div className="flex">
              <ContentLoader width="100%" height={600} backgroundColor="#F5F5F5" foregroundColor="#DBDBDB" {...props}>
                <rect x="102" y="69" rx="3" ry="3" width="102" height="7" />
                <rect x="92" y="47" rx="3" ry="3" width="178" height="6" />
                <circle cx="48" cy="63" r="18" />
                <rect x="95" y="95" rx="3" ry="3" width="178" height="6" />
                <rect x="105" y="169" rx="3" ry="3" width="102" height="7" />
                <rect x="95" y="147" rx="3" ry="3" width="178" height="6" />
                <circle cx="51" cy="163" r="18" />
                <rect x="52" y="285" rx="3" ry="3" width="2" height="20" />
                <circle cx="53" cy="259" r="18" />
                <circle cx="54" cy="327" r="18" />
              </ContentLoader>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <ContentLoader speed={2} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" width="100%" {...props}>
            <rect x="0" y="0" width="100%" height="47.99" />
          </ContentLoader>
        </div>
      </div>
      <div>
        <ContentLoader speed={2} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" width="100%" {...props}>
          <rect x="0" y="0" width="100%" height="47.99" />
        </ContentLoader>
      </div>
    </div>
  </div>
);

export default HomeLoader;
