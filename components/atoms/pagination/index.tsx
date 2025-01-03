import { Pagination, PaginationProps } from "antd";
import React from "react";

const AtomPagination: React.FC<PaginationProps> = ({
  ...props
}) => {
  return (
    <Pagination
      {...props}
    />
  );
};

export default AtomPagination;