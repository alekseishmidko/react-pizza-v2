import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundcolor="#f3f3f3"
      foregroundcolor="#ecebeb"
    >
      <circle cx="134" cy="134" r="125" />
      <rect x="0" y="279" rx="10" ry="10" width="280" height={23} />
      <rect x="0" y="326" rx="10" ry="10" width="280" height={88} />
      <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
      <rect x="185" y="427" rx="10" ry="10" width="1" height="30" />
    </ContentLoader>
  );
};

export default Skeleton;
