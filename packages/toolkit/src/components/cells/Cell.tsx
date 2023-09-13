import cn from "clsx";
import { Nullable } from "../../lib";

export type CellProps = {
  width: Nullable<string>;
  padding: string;
  children: React.ReactNode;
};

export const Cell = ({ width, children, padding }: CellProps) => {
  return (
    <td>
      <div className={cn("flex flex-row gap-x-2", width, padding)}>
        {/* {link ? (
          <Link className="w-4/5" href={link}>
            <h3 className="truncate text-instill-h3 hover:underline">{name}</h3>
          </Link>
        ) : (
          <h3 className="truncate text-instill-h3 hover:underline">{name}</h3>
        )} */}
        {children}
      </div>
    </td>
  );
};
