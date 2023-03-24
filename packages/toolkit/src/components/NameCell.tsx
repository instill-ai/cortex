import { FC } from "react";
import cn from "clsx";
import Link from "next/link";
import type { ResourceState } from "../lib";

import { StateIcon } from "./StateIcon";

export type NameCellProps = {
  state: ResourceState;
  width: string;
  name: string;
  link: string;
};

export const NameCell: FC<NameCellProps> = ({ state, width, name, link }) => {
  return (
    <td>
      <div className={cn("flex flex-row gap-x-2.5", width)}>
        <div className="flex min-h-8 min-w-8">
          <StateIcon
            state={state}
            width="w-[18px]"
            height="h-[18px]"
            position="m-auto"
          />
        </div>
        <Link href={link}>
          <h3 className="text-instill-h3 line-clamp-1">{name}</h3>
        </Link>
      </div>
    </td>
  );
};
