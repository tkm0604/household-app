import { Box, Button } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale/ja";
import { jaJP } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addMonths, set } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };
  //先月ボタンを押した処理
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    console.log("前の月は:", previousMonth);
    setCurrentMonth(previousMonth);
  };
  //来月ボタンを押した処理
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handlePreviousMonth}
            color={"error"}
            variant={"contained"}
          >
            先月
          </Button>
          <DatePicker
            onChange={handleDateChange}
            value={currentMonth}
            label="年月を選択"
            sx={{ mx: 2, backgroundColor: "white" }}
            views={["year", "month"]}
            format="yyyy年MM月"
            slotProps={{ calendarHeader: { format: "yyyy年MM月" } }}
          />
          <Button
            onClick={handleNextMonth}
            color={"primary"}
            variant={"contained"}
          >
            来月
          </Button>
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default MonthSelector;
