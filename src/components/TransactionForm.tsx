import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { JSX, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory } from "../types";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import DiversityIcon from "@mui/icons-material/Diversity2";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { cu } from "@fullcalendar/core/internal-common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Scheme, transactionScheme } from "../validations/scheme";
interface TransactionFormProps {
  onCloseForm: () => void; // 閉じる関数を受け取る
  isEntryDrawerOpen: boolean; // フォームの開閉状態を受け取る
  currentDay: string;
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: ExpenseCategory | IncomeCategory;
  icon: JSX.Element;
}
const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "住居費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <DiversityIcon fontSize="small" /> },
    { label: "娯楽費", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
  ];

  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <AddBusinessIcon fontSize="small" /> },
    { label: "お小遣い", icon: <SavingsIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(expenseCategories); // カテゴリの状態を管理

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<Scheme>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(transactionScheme), // Zodスキーマを使用してバリデーションを行う
  });
  console.log("errors:", errors); // エラーをコンソールに表示
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type); // フォームの値を更新
  };

  const currentType = watch("type"); // watchを使用して、フォームの値を監視
  useEffect(() => {
    setValue("date", currentDay); // 日付を現在の日付に設定
  }, [currentDay]);

  useEffect(() => {
    const newCategories =
      currentType === "income" ? incomeCategories : expenseCategories;
    setCategories(newCategories); // カテゴリを更新
  }, [currentType]);

  const onSubmit = (data: any) => {
    console.log("Dataerror:", data); // フォームのデータをコンソールに表示
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  onClick={() => incomeExpenseToggle("income")}
                  color="primary"
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date} // エラーがある場合はtrue
                helperText={errors.date?.message} // エラーメッセージを表示
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.category} // エラーがある場合はtrue
                helperText={errors.category?.message} // エラーメッセージを表示
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
                {categories.map((category) => (
                  <MenuItem value={category.label} key={category.label}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
                {/* 収入カテゴリ */}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount} // エラーがある場合はtrue
                helperText={errors.amount?.message} // エラーメッセージを表示
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0; //numberに変換
                  field.onChange(newValue);
                  console.log(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content} // エラーがある場合はtrue
                helperText={errors.content?.message} // エラーメッセージを表示
                {...field}
                label="内容"
                type="text"
              />
            )}
          />
          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
