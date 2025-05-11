import React, { use, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ExpenseCategory,
  IncomeCategory,
  Transaction,
  TransactionType,
} from "../types";
import { get } from "http";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);
// interface CategoryChartProps {
//   monthlyTransactions: Transaction[];
//   isLoading: boolean;
// }

const CategoryChart = () =>
  // {
  // monthlyTransactions,
  // isLoading,
  // }: CategoryChartProps
  {
    const { isLoading } = useAppContext();
    const monthlyTransactions = useMonthlyTransactions();
    const [selectedType, setSelectedType] =
      useState<TransactionType>("expense");
    const handleChange = (e: SelectChangeEvent<TransactionType>) => {
      setSelectedType(e.target.value as TransactionType);
    };
    const theme = useTheme();

    const categorySums = monthlyTransactions
      .filter((transaction) => transaction.type === selectedType)
      .reduce<Record<IncomeCategory | ExpenseCategory, number>>(
        (acc, transaction) => {
          if (!acc[transaction.category]) {
            acc[transaction.category] = 0;
          }
          acc[transaction.category] += transaction.amount;
          return acc;
        },
        {} as Record<IncomeCategory | ExpenseCategory, number>
      );
    console.log("categorySumsは:", categorySums);

    const categoryLabels = Object.keys(categorySums) as (
      | IncomeCategory
      | ExpenseCategory
    )[];
    const categoryValues = Object.values(categorySums);

    console.log("categoryLabelsは:", categoryLabels);
    console.log("categoryValuesは:", categoryValues);

    const options = {
      // maintainAspectRatio: true,
      responsive: true,
    };

    const IncomeCategoryColor: Record<IncomeCategory, string> = {
      給与: theme.palette.incomeCategoryColor.給与,
      副収入: theme.palette.incomeCategoryColor.副収入,
      お小遣い: theme.palette.incomeCategoryColor.お小遣い,
    };

    const ExpenseCategoryColor: Record<ExpenseCategory, string> = {
      食費: theme.palette.expenseCategoryColor.食費,
      日用品: theme.palette.expenseCategoryColor.日用品,
      住居費: theme.palette.expenseCategoryColor.住居費,
      交際費: theme.palette.expenseCategoryColor.交際費,
      娯楽費: theme.palette.expenseCategoryColor.娯楽費,
      交通費: theme.palette.expenseCategoryColor.交通費,
    };

    const getCategoryColor = (
      category: IncomeCategory | ExpenseCategory
    ): string => {
      if (selectedType === "income") {
        return IncomeCategoryColor[category as IncomeCategory];
      } else {
        return ExpenseCategoryColor[category as ExpenseCategory];
      }
    };

    const data: ChartData<"pie"> = {
      labels: categoryLabels,
      datasets: [
        {
          data: categoryValues,
          // backgroundColor: [
          //   "rgba(255, 99, 132, 0.2)",
          //   "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
          // ],
          backgroundColor: categoryLabels.map((category) =>
            getCategoryColor(category)
          ),

          borderColor: categoryLabels.map((category) =>
            getCategoryColor(category)
          ),

          borderWidth: 1,
        },
      ],
    };

    return (
      <>
        <FormControl>
          <InputLabel id="type=select-label">収支の種類</InputLabel>
          <Select
            labelId="type=select-label"
            id="type=select"
            label="収支の種類"
            fullWidth
            value={selectedType}
            onChange={handleChange}
          >
            <MenuItem value="income">収入</MenuItem>
            <MenuItem value="expense">支出</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%", // 親要素の幅を超えないように制限
            maxHeight: "400px", // 高さを制限
            overflow: "hidden", // はみ出しを隠す
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : monthlyTransactions.length > 0 ? (
            <Pie data={data} options={options} />
          ) : (
            <Typography>データがありません。</Typography>
          )}
        </Box>
      </>
    );
  };

export default CategoryChart;
