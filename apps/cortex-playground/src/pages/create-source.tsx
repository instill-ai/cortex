import { Root } from "@/components/Root";
import { CreateSourceForm } from "@instill-ai/toolkit";
import { useRouter } from "next/router";

const CreateSourcePage = () => {
  const router = useRouter();

  return (
    <Root>
      <div className="w-[1200px]">
        <CreateSourceForm
          onCreate={(init) => {
            init();
            router.push("/sources");
          }}
          accessToken={null}
          width="w-full"
          enabledQuery={true}
        />
      </div>
    </Root>
  );
};

export default CreateSourcePage;
