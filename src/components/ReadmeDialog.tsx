// components/ReadmeDialog.tsx
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface ReadmeDialogProps {
  open: boolean;
  onClose: () => void;
  repoName: string | null;
  content: string;
}

const ReadmeDialog: React.FC<ReadmeDialogProps> = ({
  open,
  onClose,
  repoName,
  content,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          backgroundColor: "#B0E0E6",
          color: "#2C3E50",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        README: {repoName}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#2C3E50",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <ReactMarkdown
          children={content}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0000CD", textDecoration: "underline" }}
              />
            ),
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReadmeDialog;
