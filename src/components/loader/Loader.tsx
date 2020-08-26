import React, { useEffect, useState } from "react";

import { createPortal } from "react-dom";

type Props = {
  isLoading: boolean;
};

const Loader: React.FC<Props> = ({ isLoading }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        <div className="loader">Loading {`${isLoading}`}</div>,
        document.body
      )
    : null;
};

export default Loader;
