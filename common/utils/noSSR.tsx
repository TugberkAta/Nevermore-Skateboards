"use client";

import { ReactNode, useLayoutEffect, useState } from "react";

const DefaultOnSSR: React.FC = () => null;

export const NoSSR: React.FC<{ children: ReactNode; onSSR?: ReactNode }> = ({
  children,
  onSSR = <DefaultOnSSR />,
}) => {
  const [onBrowser, setOnBrowser] = useState(false);
  useLayoutEffect(() => {
    setOnBrowser(true);
  }, []);
  return <>{onBrowser ? children : onSSR}</>;
};
