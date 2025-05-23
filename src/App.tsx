import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import { NoMatch } from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { format, set } from "date-fns";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/Schema";
import { AppContextProvider } from "./context/AppContext";

//firestoreエラーかどうかを判定する型ガード
// function isFireStoreError(
//   err: unknown
// ): err is { code: string; message: string } {
//   return typeof err === "object" && err !== null && "code" in err;
// }

function App() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);



  // //取引を保存する処理
  // const handleSaveTransaction = async (transaction: Schema) => {
  //   console.log("保存する取引は:", transaction);
  //   try {
  //     //firestoreにデータ保存
  //     const docRef = await addDoc(collection(db, "Transactions"), transaction);
  //     console.log("Document written with ID: ", docRef.id);
  //     const newTransaction = {
  //       id: docRef.id,
  //       ...transaction,
  //     } as Transaction;
  //     console.log("新しい取引は:", newTransaction);
  //     setTransactions((prevTransaction) => [
  //       ...prevTransaction,
  //       newTransaction,
  //     ]);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestoreのエラーは:", err);
  //     } else {
  //       console.error("一般的なエラーは:", err);
  //     }
  //   }
  // };

  // //削除処理
  // const handelDeleteTransaction = async (
  //   transactionIds: string | readonly string[]
  // ) => {
  //   try {
  //     const idsToDelete = Array.isArray(transactionIds)
  //       ? transactionIds
  //       : [transactionIds];

  //     for (const id of idsToDelete) {
  //       await deleteDoc(doc(db, "★Transactions", id));
  //     }
  //     //firestoreからデータ削除
  //     const filteredTransactions = transactions.filter(
  //       (transaction) => !idsToDelete.includes(transaction.id)
  //     );

  //     console.log("削除した取引は:", filteredTransactions);
  //     setTransactions(filteredTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestoreのエラーは:", err);
  //     } else {
  //       console.error("一般的なエラーは:", err);
  //     }
  //   }
  // };
  // //更新処理
  // const handleUpdateTransaction = async (
  //   transaction: Schema,
  //   transactionId: string
  // ) => {
  //   try {
  //     //firestoreのデータを更新する処理
  //     const docRef = doc(db, "Transactions", transactionId);
  //     // Set the "capital" field of the city 'DC'
  //     await updateDoc(docRef, transaction);
  //     //フロント更新
  //     const updatedTransactions = transactions.map((t) =>
  //       t.id === transactionId ? { ...t, ...transaction } : t
  //     ) as Transaction[];
  //     console.log("更新した取引は:", updatedTransactions);
  //     setTransactions(updatedTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestoreのエラーは:", err);
  //     } else {
  //       console.error("一般的なエラーは:", err);
  //     }
  //   }
  // };

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                    // monthlyTransactions={monthlyTransactions}
                    // setCurrentMonth={setCurrentMonth}
                    // onSaveTransaction={handleSaveTransaction}
                    // onDeleteTransaction={handelDeleteTransaction}
                    // onUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/report"
                element={
                  <Report
                    // currentMonth={currentMonth}
                    // setCurrentMonth={setCurrentMonth}
                    // monthlyTransactions={monthlyTransactions}
                    // isLoading={isLoading}
                    // onDeleteTransaction={handelDeleteTransaction}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
