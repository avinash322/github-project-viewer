import { useState } from "react";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Buffer } from "buffer";
import { ScrambleText } from "./utils/ScrambleText";
import {
  Button,
  Divider,
  Skeleton,
  Snackbar,
  type SnackbarCloseReason,
} from "@mui/material";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import UsernameTextField from "./components/Textfield";
import RepoChip from "./components/RepoChip";

export default function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [readme, setReadme] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const fetchRepos = async () => {
    if (username == "") {
      return;
    }

    setisLoading(true);
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    setRepos(data);
    setReadme("");
    setSelectedRepo(null);
    setTimeout(() => {
      setisLoading(false);
    }, 300);
  };

  const fetchReadme = async (repoName: any) => {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`
    );
    const data = await res.json();
    if (!data.content) {
      setOpen(true);
    } else {
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      setReadme(content);
      setSelectedRepo(repoName);
      setOpenModal(true);
    }
  };

  return (
    <Box
      sx={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
        <ScrambleText text="Github Project Viewer" duration={1000} />

        <Divider
          sx={{
            borderColor: "#FA8072",
            borderBottomWidth: 5,
          }}
        />

        <Box sx={{ marginTop: 10 }}></Box>
        <UsernameTextField
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />

        <Box sx={{ marginTop: 10 }}></Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00ffcc",
              color: "#2C3E50",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
            onClick={() => fetchRepos()}
          >
            Search Repo
          </Button>
        </Box>

        <Box sx={{ marginTop: 10 }}>
          <div style={{ marginTop: 20 }}>
            {repos.length > 0 && <h2>Repositories:</h2>}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 2,
              }}
            >
              {isLoading ? (
                <Box sx={{ maxWidth: 900, width: "100%", mx: "auto" }}>
                  <Skeleton variant="rounded" height={50} width="40%" />
                  <Box sx={{ mt: 1 }} />
                  <Skeleton variant="rounded" height={50} width="70%" />
                  <Box sx={{ mt: 1 }} />
                  <Skeleton variant="rounded" height={50} width="100%" />
                </Box>
              ) : (
                repos.map((repo: any) => (
                  <RepoChip
                    key={repo.id}
                    repoId={repo.id}
                    repoName={repo.name}
                    onClick={fetchReadme}
                  />
                ))
              )}
            </Box>
          </div>
        </Box>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            backgroundColor: "#FA8072",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
        >
          File README tidak ada
        </Alert>
      </Snackbar>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            backgroundColor: "#B0E0E6",
            color: "#2C3E50",
            fontWeight: "bold",
            position: "relative",
          }}
        >
          README: {selectedRepo}
          <IconButton
            onClick={() => setOpenModal(false)}
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
            children={readme}
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
    </Box>
  );
}
