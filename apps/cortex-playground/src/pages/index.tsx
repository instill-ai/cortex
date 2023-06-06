import { Root } from "@/components/Root";

const IndexPage = () => {
  return (
    <Root>
      <div className="bg-semantic-bg-secondary mx-auto w-[400px] flex flex-col p-10">
        <p className="mb-10 mx-auto text-semantic-fg-primary product-button-button-1">
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
