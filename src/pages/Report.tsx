import { PartyModeRounded } from "@mui/icons-material";
import { Box, Typography, Stack, Paper } from "@mui/material";
import React from "react";
import TransactionTable from "../components/TransactionTable";
import CategoryChart from "../components/CategoryChart";
import MonthSelector from "../components/MonthSelector";
import BarChart from "../components/BarChart";

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Report = ({ currentMonth, setCurrentMonth }: ReportProps) => {
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <MonthSelector
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </Box>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={1}>
          <Paper sx={commonPaperStyle}>
            <CategoryChart />
          </Paper>
        </Box>
        <Box flex={2}>
          <Paper sx={commonPaperStyle}>
            <BarChart />
          </Paper>
        </Box>
      </Box>
      <Box>
        <TransactionTable />
      </Box>
    </Box>
  );
};

export default Report;
