import { useState } from "react";
import Box from "@mui/material/Box";
import { Buffer } from "buffer";
import { ScrambleText } from "./utils/ScrambleText";
import {
  Button,
  Divider,
  Drawer,
  Fab,
  Skeleton,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import UsernameTextField from "./components/Textfield";
import RepoChip from "./components/RepoChip";
import ReadmeDialog from "./components/ReadmeDialog";
import CustomSnackbar from "./components/CustomSnackbar";
import HistoryIcon from "@mui/icons-material/History";
import DrawerCardList from "./components/CardList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { addHistory } from "./redux/historySlice";
import { fetchReposFromGithub, fetchReadmeFromGithub } from "./utils/services";

export default function App() {
  // REPO GITHUB
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [readme, setReadme] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  // MODAL
  const [openModal, setOpenModal] = useState(false);
  // LOADING
  const [isLoading, setisLoading] = useState(false);
  // SNACKBAR
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  // DRAWER
  const [openDrawer, setOpenDrawer] = useState(false);
  // REDUX
  const dispatch = useDispatch();
  const historyList = useSelector(
    (state: RootState) => state.history.historyList
  );

  // STYLING
  const buttonSubmitStyle = {
    backgroundColor: "#00ffcc",
    color: "#2C3E50",
    fontWeight: "bold",
    fontFamily: "'Inter', sans-serif",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  };

  // FUNCTIONS
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const fetchRepos = async () => {
    if (!username) return;
    setisLoading(true);
    const result = await fetchReposFromGithub(username);
    if ("error" in result) {
      setMessageSnackbar(result.error);
      setOpenSnackbar(true);
    } else {
      setRepos(result);
      setReadme("");
      setSelectedRepo(null);
    }
    setTimeout(() => {
      setisLoading(false);
    }, 300);
  };

  const fetchReadme = async (repoName: string) => {
    const result = await fetchReadmeFromGithub(username, repoName);
    if (typeof result === "string") {
      setReadme(result);
      setSelectedRepo(repoName);
      setOpenModal(true);
    } else {
      setMessageSnackbar(result.error);
      setOpenSnackbar(true);
    }
    dispatch(
      addHistory({
        account: username,
        repo: repoName,
      })
    );
  };

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpenDrawer(isOpen);
  };

  return (
    <Box className="container-start">
      <ScrambleText text="Github Project Viewer" duration={1000} />
      <Divider
        sx={{
          borderColor: "#FA8072",
          borderBottomWidth: 5,
        }}
      />

      <Box className="margin-divider-small" />
      <UsernameTextField
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
      />

      <Box className="margin-divider-small" />

      <Box className="container-center">
        <Button
          variant="contained"
          sx={buttonSubmitStyle}
          onClick={() => fetchRepos()}
        >
          Search Repo
        </Button>

        <div className="container-fab">
          <Fab
            aria-label="add"
            onClick={toggleDrawer(true)}
            sx={{
              backgroundColor: "#2C3E50",
              color: "#00ffcc",
              "&:hover": {
                backgroundColor: "#1a252f",
              },
            }}
          >
            <HistoryIcon />
          </Fab>
        </div>
      </Box>

      <Box className="margin-divider-small">
        {repos.length > 0 && (
          <Typography variant="h4">Repositories:</Typography>
        )}
        <Box className="base-container-chip">
          {isLoading ? (
            <Box className="container-skeleton">
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
      </Box>

      {/*  DRAWER*/}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250,
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            color: "#fff",
          },
        }}
      >
        <DrawerCardList title="History" dataList={historyList} />
      </Drawer>

      {/*  SNACKBAR*/}

      <CustomSnackbar
        open={openSnackbar}
        onClose={handleClose}
        message={messageSnackbar}
        severity="error"
      />

      {/*  MODAL README*/}

      <ReadmeDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        repoName={selectedRepo}
        content={readme}
      />
      {/* IMAGE BACKGROUND */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"
        className="img-background"
        alt="Background"
      />
    </Box>
  );
}
