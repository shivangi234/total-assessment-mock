import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import DataTable from "react-data-table-component";

import {
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,Chip
} from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";

const Demo = () => {
  const [showDataTable, setShowDataTable] = useState(false);
  const [questionType, setQuestionType] = useState("All");
  const [questionStatus, setQuestionStatus] = useState("All");

  const [apiData, setApiData] = useState();

  const loadData = async () => {
    const requestData = {
      orgCode: "medicaps",
      question_type: "LAQ",
      is_examfetch: "NO",
      quiz_open_date_time: "2023-11-07 10:00:00",
      quiz_close_date_time: "2023-11-13 17:00:00",
    };
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/quizlist`, requestData);
        console.log(response.data.result);
        setApiData(response.data.result);
        setQuestionType(response.data.result[0].question_type);
        console.log(response.data.result[0].question_type);
    } catch (error) {
        console.log(error);
    }
  };
  //  Styles for table data
 const customStyles = {
    rows: {
      style: { minHeight: "40px" },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#0D47A1",
        color: "white",
        minHeight: "35px",
        fontSize: "15px",
      },
    },
    cells: {
      style: { paddingLeft: "8px", paddingRight: "8px" },
    },
  };
  const columns=[
    {
        name: "Sl no",
        selector: (_, index) => index + 1, // Display the index + 1 as Sl no
        width: "6%",
        style:"font-size:15px"
      },
    {
        name: "Name",
        selector: (row) => row.quiz_name,
        width: "25%",
        style:"font-size:15px"
      },
      {
        name: "Open Date",
        selector: (row) => moment(row.quiz_open_date_time).format("DD-MMM -YYYY h:mm A"),
        width: "15%",
        style:"font-size:15px"
      },
      {
        name: "Close Date",
        selector: (row) => moment(row.quiz_close_date_time).format("DD-MMM -YYYY h:mm A"),
        width: "15%",
        style:"font-size:15px"
      },
      {
        name: "Exam Status",
        selector: (row) =>
          row.is_examfetch === "NO" ? (
            <Chip label="Not Fetched" variant="outlined" color="warning" />
          ) : (
            <Chip label="Fetched" variant="outlined" color="success" />
          ),
        style: "font-size:15px",
      },
      {
        name: "Photo Status",
        selector: (row) =>
          row.photo_fetched_on === null ? (
            <Chip label="Not Fetched" variant="outlined" color="warning" />
          ) : (
            <Chip label="Fetched" variant="outlined" color="success" />
          ),
        style: "font-size:15px",
      },
      {
        name: "Action Buttons ",
        cell: (row) => (
          <>
            <Button
              variant="contained"
              size="small"
              color="warning"
              onClick={() => {
                // setOpen(true);
              }}
            >
              Fetch
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={() => {
                // setOpenUpdate(true);
              }}
            >
              Update
            </Button>
          </>
        ),
        width: "20%",
      },
  ]


useEffect(() => {
    loadData();
}, [])

  //Button Click Function Showdatatable
  const showResults = () => {
    setShowDataTable(true);
  };
  const handleChange = (e) => {
    setQuestionType(e.target.value);
  };
  const handleChangeStatus = (event) => {
    setQuestionStatus(event.target.value);
  };
  return (
    <div>
      <Box sx={{ "& > :not(style)": { mt: 3, width: "100%", height: 120 } }}>
        <Paper elevation={18}>
          <Card>
            <CardContent sx={{ margin: "15px" }}>
              <Grid container spacing={2}>
                {/* Question Type */}
                <Grid item lg={2} sm={2} md={2} xs={2}>
                  <FormControl fullWidth sx={{ minWidth: 140 }}>
                    <InputLabel id="question_type">Exam Type</InputLabel>
                    <Select
                      fullWidth
                      labelId="question_type"
                      id="question_type"
                      label="QuestionType"
                      onChange={handleChange}
                      name="question_type"
                      value={questionType}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={"LAQ"}>LAQ</MenuItem>
                      <MenuItem value={"MCQ + LAQ"}>MCQ + SAQ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Start Date */}
                <Grid item lg={2} sm={2} md={2} xs={2}>
                  <FormControl fullWidth sx={{ minWidth: 140 }}>
                    <TextField
                      onChange={handleChange}
                      id="start_date"
                      name="start_date"
                      label="Start Date"
                      type="date"
                      defaultValue=''
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                {/* End Date */}
                <Grid item lg={2} sm={2} md={2} xs={2}>
                  <FormControl fullWidth sx={{ minWidth: 140 }}>
                    <TextField
                      name="end_date"
                      onChange={handleChange}
                      id="end_date"
                      label="End Date"
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                {/* Quiz status */}
                <Grid item lg={2} sm={2} md={2} xs={2}>
                  <FormControl fullWidth sx={{ minWidth: 140 }}>
                    <InputLabel id="question_type">Status</InputLabel>
                    <Select
                      fullWidth
                      labelId="status"
                      id="status"
                      label="Satus"
                      onChange={handleChangeStatus}
                      name="status"
                      value={questionStatus}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={"Fetched"}>Fetched</MenuItem>
                      <MenuItem value={"Not Fetched"}>Not Fetched</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={1} sm={1} md={1} xs={1}></Grid>
                {/* View button */}
                <Grid item lg={3} sm={3} md={3} xs={3}>
                  <Box sx={{ float: "right", mt: 0.4 }}>
                    <Button
                      sx={{
                        padding: "13px 52px 13px 52px",
                        backgroundColor: "#0288D1",
                      }}
                      size="medium"
                      variant="contained"
                      onClick={showResults}
                    >
                      <TableViewIcon />
                      View
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Show data */}
          {showDataTable ? (
            <Paper elevation={8}>
              <Grid container sx={{ mt: 2 }} justifyContent="center">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card sx={{ overflowY: "auto" }}>
                    <CardContent>
                      <DataTable
                          customStyles={customStyles}
                          columns={columns}
                          data={apiData}
                        fixedHeaderScrollHeight="100px"
                        highlightOnHover
                        pagination
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            ""
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default Demo;
