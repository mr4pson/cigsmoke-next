import { useState } from "react";
import { TypeUseModal } from "./types";

export function useModal(): TypeUseModal {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return {
    modalIsOpen,
    handleClose,
    handleOpen,
  }
};
