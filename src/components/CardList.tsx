import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface DrawerCardListProps {
  title?: string;
  dataList: {
    account: string;
    repo: string;
  }[];
}

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
            <Typography
              variant="body1"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            >
              {item.account}
            </Typography>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{ fontFamily: '"Inter", sans-serif' }}
            >
              {item.repo}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DrawerCardList;
