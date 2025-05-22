import { Box, BoxProps, Modal, Typography } from "@mui/material";
import styles from "./FModal.styles";

export interface FModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  styleOptions?: BoxProps["sx"];
}

export function FModal({
  title,
  children,
  isOpen,
  handleClose,
  styleOptions,
}: FModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...styles.modalContent, ...styleOptions }}>
        {Boolean(title) && (
          <Typography
            variant="h1"
            fontWeight={600}
            sx={{ marginBottom: "24px" }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
}
