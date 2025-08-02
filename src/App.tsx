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

export default function App() {
  // STATES
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [readme, setReadme] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      setOpenSnackbar(true);
    } else {
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      setReadme(content);
      setSelectedRepo(repoName);
      setOpenModal(true);

      dispatch(
        addHistory({
          account: username,
          repo: repoName,
        })
      );
    }
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
        message="File README tidak ada"
        severity="error"
      />

      {/*  MODAL README*/}

      <ReadmeDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        repoName={selectedRepo}
        content={readme}
      />
    </Box>
  );
}
