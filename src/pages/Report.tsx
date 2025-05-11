import { PartyModeRounded } from "@mui/icons-material";
import { Box, Typography, Stack, Paper } from "@mui/material";
import React from "react";
import TransactionTable from "../components/TransactionTable";
import CategoryChart from "../components/CategoryChart";
import MonthSelector from "../components/MonthSelector";
import BarChart from "../components/BarChart";
import { Transaction } from "../types";

// interface ReportProps {
//   currentMonth: Date;
//   setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
//   monthlyTransactions: Transaction[];
//   isLoading: boolean;
//   onDeleteTransaction: (
//     transactionId: string | readonly string[]
//   ) => Promise<void>;
// }

const Report = (
//   {
//   currentMonth,
//   setCurrentMonth,
//   monthlyTransactions,
//   isLoading,
//   onDeleteTransaction,
// }: ReportProps
) => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <MonthSelector
          // currentMonth={currentMonth}
          // setCurrentMonth={setCurrentMonth}
        />
      </Box>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={1}>
          <Paper sx={commonPaperStyle}>
            {/*円グラフを表示するコンポーネント */}
            <CategoryChart
              // monthlyTransactions={monthlyTransactions}
              // isLoading={isLoading}
            />
          </Paper>
        </Box>
        <Box flex={2}>
          <Paper sx={commonPaperStyle}>
            {/*棒グラフを表示するコンポーネント */}
            <BarChart
              // monthlyTransactions={monthlyTransactions}
              // isLoading={isLoading}
            />
          </Paper>
        </Box>
      </Box>
      <Box>
        <TransactionTable
          // monthlyTransactions={monthlyTransactions}
          // onDeleteTransaction={onDeleteTransaction}
        />
      </Box>
    </Box>
  );
};

export default Report;
