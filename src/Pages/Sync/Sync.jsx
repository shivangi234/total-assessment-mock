import React, { useState,useEffect } from "react";
import AppBarDrawer from "../../Components/AppbarDrawer";

import DataTable from "react-data-table-component";
import { Helmet } from "react-helmet";
import axios from "axios";

import {Button,Box,Card,CardContent,CssBaseline,Chip,Grid,IconButton,Paper,Toolbar,Typography,TextField,ButtonGroup,Modal,FormControl,InputLabel,MenuItem,Select,
InputAdornment,Stack,Divider,LinearProgress,LinearProgressProps} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import NoteIcon from "@mui/icons-material/Note";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import LockIcon from "@mui/icons-material/Lock";
import TableViewIcon from "@mui/icons-material/TableView";


//MODAL Styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #616161",
  boxShadow: 24,
  p: 4,
};

//ProgressBar Function
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const drawerWidth = 240;

const Dashboard = () => {
 const [countries,setCountries] = useState([]);

//  Api call
 const getCountries = async () => {
  try {
    const response = await axios.get(`https://restcountries.com/v2/all`);
    setCountries(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
 }

 const columns = [
  {
    name: "Sl No",
    selector: (row) => <p>1</p>,
    width: "6%",
    style:"font-size:10px"
  },
  {
    name: "Quiz Name",
    selector: (row) => <p>React + Node Test</p>,
    width: "20%",
  }, {
    name: "Quiz Open Date",
    selector: (row) => <p>26-12-2023</p>,
  }, {
    name: "Quiz Close Date",
    selector: (row) =>  <p>28-12-2023</p>,
  }, {
    name: "Exam Status",
    selector: (row) => <Chip label="Fetched" variant="outlined"  color="success"/>,
  }, {
    name: "Photo Status",
    selector: (row) =><Chip label=" Not Fetched" variant="outlined"  color="warning"/>,
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
            setOpen(true);
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
            setOpenUpdate(true);
          }}
        >
          Update
        </Button>
      </>
    ),
    width: "20%",
  },
 ]
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
  //States 
  const [progressBarsyncquiz, setProgressBarsyncquiz] = useState(false);
  const [progressBarfetchphoto, setprogressBarfetchphoto] =useState(false);
  const [progressBarupdateresult, setprogressBarupdateresult] =useState(false);
  const [btnState3, setBtnState3] = useState(false);    //Reupdte result button state
  const [progress, setProgress] = useState(0);
  const [authorization, setAuthorization] = useState(0);

  // for progress bar (Static)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);


  //States for Fetch {/* Fetch Exam and Photo */}
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);


  //States for Update
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  //States for Update Attendance
  const [updateAttendance, setUpdateAttendance] = React.useState(false);
  const handleOpenAttendance = () => setUpdateAttendance(true);
  const handleCloseAttendance = () => setUpdateAttendance(false);

  //Button Click State
  const [showDataTable, setShowDataTable] = useState(false);


  const [questionType,setQuestionType] = useState("All");
  const [questionStatus,setQuestionStatus] = useState("All");
  //Methods
  const handleChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleChangeStatus = (event) => {
    setQuestionStatus(event.target.value);
  };
  
  //Button Click Function Showdatatable
  const showResults = () => {
    setShowDataTable(true);
  };
  //showing progressbar Exam sync
  const showProgress = () => {
    setProgressBarsyncquiz(true);
  };
  //showing progressbar Photo
  const showProgress2 = () => {
    setprogressBarfetchphoto(true);
  };
  //Result Update
  const showProgress3 = () => {
    setBtnState3(true);
    setprogressBarupdateresult(true);
  };
  //Authorization
  const syncExam = () => {
    setAuthorization(true);
  };
  useEffect(()=>{
    getCountries();
    },[]);
  
  return (
    <>
      <Helmet>
        <title>Total Assesment | Sync</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          height: "200vh",
          backgroundColor: "#f2f7ff",
        }}
      >
        <CssBaseline />
        <AppBarDrawer />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(200% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
      {/* Appbar */}
          <Box>
            <Card sx={{p:1}}>
              <Grid container>
                <Grid item lg={2}>
                <Typography variant="h5" fontFamily="sans-serif" fontWeight="bold" >Sync r</Typography>
                </Grid>
                <Grid item lg={8}></Grid>
                <Grid item lg={2}>
                <Typography variant="h5" fontFamily="sans-serif"  textAlign="right" >Home <span style={{fontSize:"18px", color:"#9E9E9E"}}> Sync </span> </Typography>
                </Grid>
              </Grid>
              </Card>
          </Box>
      {/* selection section */}
          <Box sx={{ "& > :not(style)": {  mt: 3, width: "100%", height: 120 }}}>
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
                          <MenuItem value={"MCQ"}>MCQ</MenuItem>
                          <MenuItem value={"LAQ"}>LAQ</MenuItem>
                          <MenuItem value={"MCQ + LAQ"}>MCQ + LAQ</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  {/* Start Date */}
                    <Grid item lg={2} sm={2} md={2} xs={2}>
                    <FormControl fullWidth sx={{  minWidth: 140 }}>
                        <TextField
                          onChange={handleChange}
                          id="start_date"
                          name="start_date"
                          label="Start Date"
                          type="date"
                          defaultValue="2017-05-24"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                  {/* End Date */}
                    <Grid item lg={2} sm={2} md={2} xs={2}>
                      <FormControl fullWidth sx={{minWidth: 140 }}>
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
                      <Box sx={{float:"right",mt:0.4}}>
                      <Button sx={{padding: "13px 52px 13px 52px",backgroundColor:"#0288D1"}}
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
                    <Grid item lg={12} md={12}  sm={12} xs={12}>
                      <Card sx={{overflowY:"auto"}}>
                          <CardContent>
                            <DataTable
                              customStyles={customStyles}
                              columns={columns}
                              data={countries}
                              fixedHeaderScrollHeight="100px"
                              highlightOnHover
                              pagination
                              progressComponent={
                                <CircularProgress color="inherit" />
                              }
                              subHeaderComponent={
                                    <SearchIcon />
                              }
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
        </Box>
      </Box>

      {/* Fetch Exam and Photo */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* Fetch Data Header */}
        <Box sx={style}>
          <Grid container>
            <Grid item lg={2} sm={2} md={2} xs={2}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "black" }}
              >
                Fetch Data
              </Typography>
            </Grid>
            <Grid item lg={8} sm={8} md={8} xs={8}></Grid>
            <Grid item lg={2} sm={2} md={2} xs={2}>
              <Box sx={{ textAlign: "right",mb:1 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon size="small" />
                  close
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider />
          {/* Card Content - Fetch exam part */}
          <Card sx={{ mt: 3 }}>
            <Typography 
            component="div"
              sx={{
                background: "#0D47A1",
                height: "40px",
                padding: "10px",
                color: "white",
              }}
            >
              <Chip
                label="1"
                variant="contained"
                size="small"
                color="primary"
              />
              &nbsp; Exam Fetch
            </Typography>
            <CardContent sx={{ margin: "5px" }}>
              <Grid container>
                <Grid item lg={10} sm={10} md={10} xs={10}>
                  <Typography variant="h7" component="div" float="left">
                    <span style={{ fontWeight: "bold" }}>Exam Name:-</span>
                    &nbsp;&nbsp;
                    React + Node Test - ( 2023 - 2024 )
                  </Typography>
                </Grid>
                <Grid item lg={2} sm={2} md={2} xs={2}>
                    <Button
                      color="success"
                      variant="contained"
                      onClick={syncExam}
                    >
                      <DownloadForOfflineIcon />
                      &nbsp; Fetch Exam
                    </Button>
                </Grid>
              </Grid>
              {authorization ? (
                <Grid container justifyContent="center" spacing={2} sx={{mt:0.1}}>
                  <Grid item lg={3} sm={3} md={3} xs={3}>
                    <TextField
                      placeholder=" Enter Exam Sync Password"
                      variant="outlined"
                      size="small"
                      float="center"
                      type="password"
                      name="password"
                      id="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon fontSize="small" color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={3} sm={3} md={3} xs={3}>
                    <Button 
                      variant="contained"
                      float="center"
                      color="info"
                      size="medium"
                      fullWidth
                      onClick={showProgress}
                    >
                      <TelegramIcon />
                      &nbsp; Submit
                    </Button>{" "}
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
              {progressBarsyncquiz ? (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <LinearProgressWithLabel 
                 value={progress}
                  />
                </Box>
              ) : (
                <></>
              )}
            </CardContent>
            <br />
          </Card>
          {/* Card Content -Photo Fetch part */}
          <Card sx={{ mt: 3 }}>
            <Typography 
                component="div"
              sx={{
                background: "#0D47A1",
                height: "40px",
                padding: "10px",
                color: "white",
              }}
            >
              <Chip
                label="2"
                variant="contained"
                size="small"
                color="primary"
              />
              &nbsp; Photo Fetch
            </Typography>
            <CardContent sx={{ margin: "5px" }}>
              <Grid container>
                <Grid item lg={10} sm={10} md={10} xs={10}>
                  <Typography variant="h7" component="div" float="left">
                    <span style={{ fontWeight: "bold" }}>Exam Name:-</span>
                    &nbsp;
                  React + Node Test ( 2023 - 2024 )
                  </Typography>
                </Grid>
                <br />

                <Grid item lg={2} sm={2} md={2} xs={2}>
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={showProgress2}
                    >
                      <DownloadForOfflineIcon />
                      &nbsp; Fetch Photo
                    </Button>
                </Grid>
              </Grid>
              {progressBarfetchphoto ? (
                <Box sx={{ width: "100%" ,mt:2}}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </Box>
      </Modal>


      {/* Update  Result and Attendance  */}

      <Modal
        open={openUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          {/* Update Data Header */}
        <Box sx={style}>
          <Grid container>
            <Grid item lg={2} sm={2} md={2} xs={2}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "black" }}
              >
                Update Data
              </Typography>
            </Grid>
            <Grid item lg={8} sm={8} md={8} xs={8}></Grid>
            <Grid item lg={2} sm={2} md={2} xs={2}>
              <Box sx={{ textAlign: "right",mb:1 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleCloseUpdate}
                >
                  <CloseIcon size="small" />
                  close
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider />

          <Card sx={{ mt: 3 }}>
            <Typography
                component="div"
              sx={{
                background: "#0D47A1",
                height: "40px",
                padding: "10px",
                color: "white",
              }}
            >
              <Chip
                label="1"
                variant="contained"
                size="small"
                color="primary"
              />
              &nbsp; Update Result
            </Typography>
            <CardContent sx={{ margin: "5px" }}>
              <Grid container>
                <Grid item lg={10} sm={10} md={10} xs={10}>
                  <Typography variant="h7" component="div" float="left">
                    <span style={{ fontWeight: "bold" }}>Exam Name:-</span>
                    &nbsp;
                    React + Node Test ( 2023 - 2024 )
                  </Typography>
                  <br />

                  <Stack direction="row" spacing={2}>
                    <Typography component="span"
                    style={{ fontWeight: "bold" }}>
                      Examine Assigned -
                      <Chip
                        label="120"
                        variant="contained"
                        size="small"
                        color="primary"
                      />
                    </Typography>

                    <Typography 
                    component="span"
                    style={{ fontWeight: "bold" }}>
                      Examine Attempt -
                      <Chip
                        label="100"
                        variant="contained"
                        size="small"
                        color="success"
                      />
                    </Typography>

                    <Typography 
                    component="span"
                    style={{ fontWeight: "bold" }}>
                      Examine Absent -
                      <Chip
                        label="20"
                        variant="contained"
                        size="small"
                        color="warning"
                      />
                    </Typography>

                    <br />
                  </Stack>
                </Grid>

                <Grid item lg={2} sm={2} md={2} xs={2}>
                  {btnState3 ? (
                    <Button
                      color="warning"
                      variant="contained"
                      style={{ fontSize: "11px" }}
                    >
                      <DownloadForOfflineIcon />
                      &nbsp; Reupdate Result{" "}
                    </Button>
                  ) : (
                    <Button
                      color="info"
                      variant="contained"
                      onClick={showProgress3}
                      style={{ fontSize: "13px" }}
                    >
                      <DownloadForOfflineIcon />
                      &nbsp; Update Result
                    </Button>
                  )}
                </Grid>
              </Grid>

              <br />
              {progressBarupdateresult ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
              ) : (
                ""
              )}
            </CardContent>
            <br />
          </Card>
          <Card sx={{ mt: 3 }}>
            <Typography
            component="div"
              sx={{
                background: "#0D47A1",
                height: "40px",
                padding: "10px",
                color: "white",
              }}
            >
              <Chip
                label="2"
                variant="contained"
                size="small"
                color="primary"
              />
              &nbsp; Update Attendance
            </Typography>
            <CardContent sx={{ margin: "5px" }}>
              <Grid container>
                <Grid item lg={10} sm={10} md={10} xs={10}>
                  <Typography variant="h7" component="div" float="left">
                    <span style={{ fontWeight: "bold" }}>Exam Name:-</span>
                    &nbsp;
                    React + Node Test ( 2023 - 2024 )
                  </Typography>
                  <Typography
                    variant="h7"
                    component="div"
                    float="left"
                    sx={{ mt: 1 }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      Attendance Status:-
                    </span>
                    &nbsp;
                    <Chip
                      label="Not Updated"
                      variant="outlined"
                      size="small"
                      color="error"
                    />
                  </Typography>
                </Grid>
                <Grid item lg={2} sm={2} md={2} xs={2}>
                <Button
                    color="warning"
                    variant="contained"
                    onClick={handleOpenAttendance}
                  ><DriveFolderUploadRoundedIcon />&nbsp;
                    Attendance
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      {/* Card content Update Attendance */}
        <Modal
          open={updateAttendance}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ marginTop: "290px" }}
        >
          <Grid container justifyContent="center">
            <Grid item lg={8} sm={8} md={8} xs={8}>
              <Box>
                <Card sx={{ mt: 1 }}>
                  <Typography
                  component="div"
                    sx={{
                      background: "#0D47A1",
                      height: "40px",
                      padding: "5px",
                      color: "white",
                    }}
                  >
                    <IconButton>
                      <NoteIcon sx={{ color: "white" }} fontSize="small" />
                    </IconButton>
                    Attendance Form Download and Upload
                    <Chip
                      style={{ backgroundColor: "white", float: "right" }}
                      variant="contained"
                      label="❌"
                      size="small"
                      onClick={handleCloseAttendance}
                    />
                  </Typography>

                  <CardContent sx={{ margin: "5px" }}>
                    <Grid container>
                      <Grid item lg={10}>
                        <Typography variant="h7" component="div" float="left">
                          &nbsp; Step 1. Download: Attendance Template
                        </Typography>
                        <Typography variant="h7" component="div" float="left">
                          &nbsp; Step 2. Take a printout of downloaded template
                        </Typography>
                        <Typography variant="h7" component="div" float="left">
                          &nbsp; Step 3. Collect Signature of Students
                        </Typography>
                        <Typography variant="h7" component="div" float="left">
                          &nbsp; Step 4. Browse and upload.
                        </Typography>
                        <br />
                      </Grid>
                      <Grid container>
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <ButtonGroup>
                          <Button
                            variant="contained"
                            disabled
                            style={{ width: "110px" }}
                          ></Button>

                          <Button style={{ color: "#757575" }}>
                            <input type="file" />
                            <FolderCopyIcon />
                            &nbsp;{" "}
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      </Grid>
                     <Grid container>
                     <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Button color="info" variant="contained" size="medium">
                          <FileUploadIcon /> Upload
                        </Button>
                        &nbsp;
                      </Grid>
                     </Grid>
                      
                      <Grid item lg={6} sm={6} md={6} xs={6}></Grid>
                      <Typography
                        sx={{ fontSize: "14px",mt:0.6 }}
                        component="div"
                        float="left"
                        color="primary"
                      >
                        File with following extensions are allowed: .doc, .docx,
                        .pdf, .xlsx, .jpg, .png, .jpeg File must be less than
                        10MB.
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Modal>
    </>
  );
};

export default Dashboard;
