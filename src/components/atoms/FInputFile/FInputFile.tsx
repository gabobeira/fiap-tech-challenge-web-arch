import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ButtonProps, styled } from "@mui/material";
import { FButton } from "../FButton/FButton";

interface FInputFileProps {
  innerText?: string;
  options?: ButtonProps;
  onUploadFile?: (files: FileList) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function FInputFile(props: FInputFileProps) {
  const { onUploadFile } = props;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && onUploadFile) {
      onUploadFile(files);
      event.target.value = "";
      event.target.files = null;
    }
  };

  return (
    <FButton
      innerText={props.innerText}
      options={{
        component: "label",
        variant: "outlined",
        startIcon: <CloudUploadIcon />,
      }}
    >
      <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
    </FButton>
  );
}
