import cn from "clsx";
import { ConnectorVisibility, Nullable } from "../../lib";

export type VisibilityCellProps = {
  width: Nullable<string>;
  visibility: ConnectorVisibility;
  padding: string;
};

export const VisibilityCell = ({
  visibility,
  width,
  padding,
}: VisibilityCellProps) => {
  return (
    <td>
      <div className={cn("flex flex-row gap-x-2", width, padding)}>
        <p className="my-auto flex text-instillGrey90 text-instill-body">
          {visibility}
        </p>
      </div>
    </td>
  );
};
