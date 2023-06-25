import * as React from "react";
import { getPaths } from "@/utils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "@/components/Link";

const BreadCrumbs = () =>
  {
    const pathname = usePathname();
    const pathSegments = getPaths(pathname);
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ position: "absolute", top: -30 }}
      >
        {pathSegments.map((segment) => (
          <Link href={segment.path} key={segment.path}>
            {segment.name}
          </Link>
        ))}
      </Breadcrumbs>
    );
  };

export default BreadCrumbs;
