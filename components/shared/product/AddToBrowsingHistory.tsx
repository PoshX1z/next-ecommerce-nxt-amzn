"use client";
import useBrowsingHistory from "@/hooks/useBrowsingHistory";
import { useEffect } from "react";

const AddToBrowsingHistory = ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const { addItem } = useBrowsingHistory();
  useEffect(() => {
    console.log("addItem({ id, category })");
    addItem({ id, category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
export default AddToBrowsingHistory;
