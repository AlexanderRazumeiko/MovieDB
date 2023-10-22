"use client";
import { Pagination } from "@mui/material";
import styles from "./PageList.module.scss";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PageList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const handleChange = (value: number) => {
    router.push(`${pathname}/${value}`);
  };

  return (
    <div className={styles.page_list_container}>
      <Pagination
        className={styles.page_list_items}
        count={10}
        defaultPage={Number(page) || 1}
        shape="rounded"
        size="large"
        color="primary"
        onChange={(e, value) => handleChange(value)}
      />
    </div>
  );
};

export default PageList;
