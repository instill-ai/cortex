import React from "react";

// Solution from https://stackoverflow.com/questions/62846043/react-js-useeffect-with-window-resize-event-listener-not-working

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: null,
    height: null,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
