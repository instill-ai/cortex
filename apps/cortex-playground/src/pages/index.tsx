import { Root } from "@/components/Root";
import { useLayoutEffect } from "react";

const IndexPage = () => {
  useLayoutEffect(() => {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, []);

  return (
    <Root>
      <div className="bg-semantic-bg-secondary mx-auto w-[400px] flex flex-col p-10">
        <p className="font-medium text-3xl font-ibm-plex-sans mb-10 mx-auto text-semantic-fg-primary">
          Hello
        </p>

        <button
          className="font-sans text-semantic-fg-primary"
          onClick={() => {
            const currentTheme = localStorage.getItem("instill-console-theme")
              ? localStorage.getItem("instill-console-theme")
              : null;

            if (currentTheme === "dark") {
              document.documentElement.setAttribute("data-theme", "light");
              localStorage.setItem("instill-console-theme", "light");
            } else {
              document.documentElement.setAttribute("data-theme", "dark");
              localStorage.setItem("instill-console-theme", "dark");
            }
          }}
        >
          Theme switch
        </button>
      </div>
    </Root>
  );
};

export default IndexPage;
