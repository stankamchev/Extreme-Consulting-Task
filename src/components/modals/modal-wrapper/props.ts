import { ModalProps } from "@mui/material/Modal";
import { ReactNode } from "react";

export interface ModalWrapperProps {
  children: ReactNode;
  open: ModalProps["open"];
  togglePostState: (...args: any[]) => void;
}
