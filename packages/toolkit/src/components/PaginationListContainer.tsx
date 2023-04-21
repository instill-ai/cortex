import cn from "clsx";
import * as React from "react";
import { BasicTextField, SolidButton } from "@instill-ai/design-system";
import { Nullable } from "../lib";

export type PaginationListContainerProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  currentPage: number;
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: Nullable<string>;
  setSearchTerm: React.Dispatch<React.SetStateAction<Nullable<string>>>;
  disabledSearchField: boolean;
  marginBottom?: string;
};

export const PaginationListContainer = ({
  title,
  description,
  children,
  currentPage,
  setCurrentPage,
  totalPage,
  searchTerm,
  setSearchTerm,
  disabledSearchField,
  marginBottom,
}: PaginationListContainerProps) => {
  return (
    <div className={cn("flex w-full flex-col", marginBottom)}>
      <div className="flex flex-row border-x border-t border-instillGrey20 bg-white py-5 px-6">
        <div className="my-auto mr-auto flex flex-col">
          <h2 className="text-[#101828] text-instill-h2">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="ml-auto">
          <BasicTextField
            id="searchTerm"
            label={null}
            value={searchTerm}
            placeholder={`Search ${title.toLowerCase()}`}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value.trim())
            }
            disabled={disabledSearchField}
          />
        </div>
      </div>
      {children}
      <div className="flex flex-row border-x border-b border-instillGrey20 py-5 px-6">
        <p className="my-auto mr-auto">{`Page ${
          totalPage === 0 ? 0 : currentPage + 1
        } of ${totalPage}`}</p>
        {totalPage > 1 ? (
          <div className="flex flex-row gap-x-3">
            <SolidButton
              onClickHandler={() => setCurrentPage((state) => (state -= 1))}
              disabled={currentPage - 1 >= 0 ? false : true}
              type="button"
              color="white"
            >
              Previous
            </SolidButton>
            <SolidButton
              onClickHandler={() => setCurrentPage((state) => (state += 1))}
              disabled={currentPage + 1 < totalPage ? false : true}
              type="button"
              color="white"
            >
              Next
            </SolidButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};
