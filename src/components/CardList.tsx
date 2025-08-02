import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";

interface DrawerCardListProps {
  title?: string;
  dataList: {
    account: string;
    repo: string;
  }[];
}

const textStyle = {
  fontFamily: '"Inter", sans-serif',
  wordWrap: "break-word",
  overflowWrap: "break-word",
  whiteSpace: "normal",
};

const DrawerCardList: React.FC<DrawerCardListProps> = ({
  title = "History",
  dataList,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontFamily: '"Inter", sans-serif' }}
      >
        {title}
      </Typography>

      {dataList.map((item, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            backgroundColor: "#34495e",
            color: "#ecf0f1",
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={textStyle}>
              {item.account}
            </Typography>
            <Divider
              sx={{
                borderColor: "#FA8072",
                borderBottomWidth: 1,
              }}
            />
            <Typography variant="body2" color="grey.500" sx={textStyle}>
              {item.repo}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DrawerCardList;
