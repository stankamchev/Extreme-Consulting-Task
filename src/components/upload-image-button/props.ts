export interface UploadImageButtonProps {
  id: string;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  buttonText: string;
  startIcon: JSX.Element;
}
