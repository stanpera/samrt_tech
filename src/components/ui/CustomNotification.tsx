"use client";
import { useSnackbar } from "@/context/SnackbarContext";
import { cn } from "@/lib/utils";
import SnackbarInfo from "../icons/SnackbarIcon";
import Exit from "../icons/Exit";
import { useEffect } from "react";
import { useCallback } from "react";

const CustomNotification = () => {
  const { snackbar, setSnackbar } = useSnackbar();
  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  }, [setSnackbar]);

  useEffect(() => {
    if (snackbar.show) {
      const timer = setTimeout(() => {
        handleSnackbarClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [snackbar.show, handleSnackbarClose]);

  if (!snackbar.show) return null;

  return (
    <div
      className={cn(
        ` flex justify-between items-center p-4.5 my-3 mx-10 transform transition-opacity duration-300 bg-${snackbar.variant} text-white rounded-md`,
        {
          "opacity-100 visible": snackbar.show,
          "opacity-0 invisible": !snackbar.show,
        }
      )}
    >
      <div className="flex gap-6">
        <SnackbarInfo className="size-7.5" variant={snackbar.variant} />
        <p className="text-xl font-medium text-white">{snackbar.message}</p>
      </div>
      <div
        className="hover:bg-black/20 rounded-full cursor-pointer"
        onClick={handleSnackbarClose}
      >
        <Exit className="size-7.5 text-white-content" />
      </div>
    </div>
  );
};

export default CustomNotification;
