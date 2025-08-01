import { Chip } from "@mui/material";

interface RepoChipProps {
  repoId: number;
  repoName: string;
  onClick: (repoName: string) => void;
}

export default function RepoChip({ repoId, repoName, onClick }: RepoChipProps) {
  return (
    <Chip
      key={repoId}
      label={repoName}
      onClick={() => onClick(repoName)}
      clickable
      sx={{
        backgroundColor: "#00ffcc",
        color: "#2C3E50",
        fontWeight: 500,
        fontSize: 14,
        fontFamily: "'Inter', sans-serif",
        px: 1.5,
        py: 1,
        "&:hover": {
          backgroundColor: "#FA8072",
        },
      }}
    />
  );
}
