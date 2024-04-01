import React, { useEffect, useState, } from "react";
import AppBarDrawer from "../../Components/AppbarDrawer";
import SwipeableViews from "react-swipeable-views";
import {
  Autocomplete,
  Button,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  TextField,
  FormControl
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

//Icons
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

//select functions
//Subject Functions
const Subjects = [
  { label: "Aptitude" },
  { label: "Reasoning" },
  { label: "English" },
];

//Position Functions
const Position = [
  { label: "FRESHER" },
  { label: "SOFTWARE DEVELOPER" },
  { label: "INDUSTRY TRAINING" },
];
//Month Functions
const Month = [
  { label: "2019-20" },
  { label: "2020-21" },
  { label: "2021-22" },
  { label: "2022-23" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const drawerWidth = 240;

const Dashboard = () => {
  //States
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  //Show ResultCard function
  const [showDataCardMCQ, setShowDataCardMCQ] = useState(true);
  const [showDataCardLAQ, setShowDataCardLAQ] = useState(false);
  const [showDataCardBoth, setShowDataCardBoth] = useState(false);
//select autocomplete
const [selectSubject,setSelectSubject] = useState("Apptitude");
const [selectPosition,setSelectPosition] = useState("FRESHER");
const [selectMonth,setSelectMonth] = useState("2019-20");




  //Tab function
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //Showdatatable
  const showResultCardMCQ = () => {
    setShowDataCardMCQ(true);
  };
  const showResultCardLAQ = () => {
    setShowDataCardLAQ(true);
  };
  const showResultCardBoth = () => {
    setShowDataCardBoth(true);
  };
useEffect(() => {
  setSelectSubject();
setSelectPosition();
setSelectMonth();

}, [])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#E1F5FE",
          height: "200vh",
        }}
      >
        <CssBaseline />

        <AppBarDrawer />
        <Box
          component="main"
          sx={{
            flexGrow: 2,
            p: 3,
            width: { sm: `calc(200% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                mt: 3,
                width: "100%",
                height: 320,
              },
            }}
          >
            <Paper elevation={1}>
              <Card>
                <CardContent>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label="MCQ"
                      onClick={() => {
                        setShowDataCardMCQ(true);
                        setShowDataCardLAQ(false);
                        setShowDataCardBoth(false);
                      }}
                      {...a11yProps(0)}
                      sx={{ fontWeight: "bold" }}
                    />
                    <Tab
                      label="LAQ"
                      onClick={() => {
                        setShowDataCardLAQ(true);
                        setShowDataCardBoth(false);
                        setShowDataCardMCQ(false);
                      }}
                      {...a11yProps(1)}
                      sx={{ fontWeight: "bold" }}
                    />
                    <Tab
                      label="MCQ & SAQ"
                      onClick={() => {
                        setShowDataCardBoth(true);
                        setShowDataCardLAQ(false);
                        setShowDataCardMCQ(false);
                      }}
                      {...a11yProps(2)}
                      sx={{ fontWeight: "bold" }}
                    />
                  </Tabs>

                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    {/* MCQ Tab */}
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <Paper elevation={3}>
                        <Box sx={{ height: "250px" }}>
                          <Grid container spacing={0} sx={{ padding: "20px" }}>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Subject:
                                  <Autocomplete
                                    disablePortal
                                    value={selectSubject}
                                    id="combo-box-demo"
                                    options={Subjects}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select subject"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Position:
                                  <Autocomplete
                                    disablePortal
                                    value={selectPosition}
                                    id="combo-box-demo"
                                    options={Position}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select subject"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Month/Year:
                                  <Autocomplete
                                    disablePortal
                                    value={selectMonth}
                                    id="combo-box-demo"
                                    options={Month}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select Month/Year"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid container sx={{ mt: 3 }}>
                              <Grid item lg={4}>
                                <FormControl>
                                  <Box>
                                    <Typography
                                    component="span"
                                      variant="h7"
                                      fontWeight="bold"
                                      color="#3F51B5"
                                    >
                                      Start Date:
                                      <br />
                                      <TextField
                                        onChange={handleChange}
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        sx={{ width: 300 }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </FormControl>
                              </Grid>

                              <Grid item lg={4}>
                                <FormControl>
                                  <Box>
                                    <Typography
                                      variant="h7"
                                      component="span"
                                      fontWeight="bold"
                                      color="#3F51B5"
                                    >
                                      End Date:
                                      <br />
                                      <TextField
                                        name="end_date"
                                        onChange={handleChange}
                                        id="end_date"
                                        type="date"
                                        sx={{ width: 300 }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </FormControl>
                              </Grid>
                              <Grid item lg={3}>
                                <Box sx={{ mt: 3 }}>
                                  <Button
                                    size="large"
                                    variant="contained"
                                    onClick={showResultCardMCQ}
                                    startIcon={<InsertDriveFileIcon />}
                                    sx={{
                                      backgroundColor: "#2979FF",
                                      padding: "8px 121px",
                                      color: "white",
                                    }}
                                  >
                                    View&nbsp;Result
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </TabPanel>
                    {/* LAQ Tab */}
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      <Paper elevation={3}>
                        <Box sx={{ height: "250px" }}>
                          <Grid container spacing={0} sx={{ padding: "20px" }}>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  LAQ Subject:
                                  <Autocomplete
                                    value={selectSubject}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Subjects}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select subject"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Position:
                                  <Autocomplete
                                    value={selectPosition}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Position}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select subject"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Month/Year:
                                  <Autocomplete
                                    disablePortal
                                    value={selectMonth}
                                    id="combo-box-demo"
                                    options={Month}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select Month/Year"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid container sx={{ mt: 3 }}>
                              <Grid item lg={4}>
                                <FormControl>
                                  <Box>
                                    <Typography
                                      variant="h7"
                                      component="span"
                                      fontWeight="bold"
                                      color="#3F51B5"
                                    >
                                      Start Date:
                                      <br />
                                      <TextField
                                        onChange={handleChange}
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        sx={{ width: 300 }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </FormControl>
                              </Grid>

                              <Grid item lg={4}>
                                <FormControl>
                                  <Box>
                                    <Typography
                                      variant="h7"
                                      component="span"
                                      fontWeight="bold"
                                      color="#3F51B5"
                                    >
                                      End Date:
                                      <br />
                                      <TextField
                                        name="end_date"
                                        onChange={handleChange}
                                        id="end_date"
                                        type="date"
                                        sx={{ width: 300 }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </FormControl>
                              </Grid>
                              <Grid item lg={3}>
                                <Box sx={{ mt: 3 }}>
                                  <Button
                                    size="large"
                                    variant="contained"
                                    onClick={showResultCardLAQ}
                                    startIcon={<InsertDriveFileIcon />}
                                    sx={{
                                      backgroundColor: "#2979FF",
                                      padding: "8px 121px",
                                      color: "white",
                                    }}
                                  >
                                      View&nbsp;Result
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </TabPanel>
                    {/* MCQ & SAQ Tab */}
                    <TabPanel value={value} index={2} dir={theme.direction}>
                      <Paper elevation={3}>
                        <Box sx={{ height: "250px" }}>
                          <Grid container spacing={0} sx={{ padding: "20px" }}>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  MCQ + SAQ Subject:
                                  <Autocomplete
                                  value={selectSubject}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Subjects}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select subject"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Position:
                                  <Autocomplete
                                    disablePortal
                                    value={selectPosition}
                                    id="combo-box-demo"
                                    options={Position}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select subject"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={4}>
                              <Box>
                                <Typography
                                  variant="h7"
                                  component="span"
                                  fontWeight="bold"
                                  color="#3F51B5"
                                >
                                  Month/Year:
                                  <Autocomplete
                                     value={selectMonth}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={Month}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select Month/Year"
                                      />
                                    )}
                                  />
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid container sx={{ mt: 3 }}>
                              <Grid item lg={4}>
                                <FormControl>
                                  <Box>
                                    <Typography
                                      variant="h7"
                                      component="span"
                                      fontWeight="bold"
                                      color="#3F51B5"
                                    >
                                      Start Date:
                                      <br />
                                      <TextField
                                        onChange={handleChange}
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        sx={{ width: 300 }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </FormControl>
                              </Grid>

                              <Grid item lg={4}>
                                <FormControl>
                                  <Box>
                                    <Typography
                                      variant="h7"
                                      component="span"
                                      fontWeight="bold"
                                      color="#3F51B5"
                                    >
                                      End Date:
                                      <br />
                                      <TextField
                                        name="end_date"
                                        onChange={handleChange}
                                        id="end_date"
                                        type="date"
                                        sx={{ width: 300 }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </FormControl>
                              </Grid>
                              <Grid item lg={3}>
                                <Box sx={{ mt: 3 }}>
                                  <Button
                                    size="large"
                                    variant="contained"
                                    onClick={showResultCardBoth}
                                    startIcon={<InsertDriveFileIcon />}
                                    sx={{
                                      backgroundColor: "#2979FF",
                                      padding: "8px 121px",
                                      color: "white",
                                    }}
                                  >
                                  View&nbsp;Result
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </TabPanel>

                    {/* The  Card main Content */}
                  </SwipeableViews>
                {showDataCardMCQ ? (
                    <>
                    {/* <Fade left> */}
                    <Box sx={{ m: 3 }}>
                        <Grid container>
                          <Grid item lg={12}>
                            <Paper elevation={4}>
                              <Card>
                                <Typography variant="h6"
                                  sx={{
                                    backgroundColor: "primary.main",
                                    height: "40px",
                                    padding: "10px",
                                    color: "white",
                                  }}
                                >
                                  1) demo_09_09_22 | 09-Sep-2022 10:00 AM TO
                                  11-Sep-2022 12:00 AM
                                </Typography>
                                <CardContent sx={{ margin: "5px" }}>
                                  <Typography>
                                    <b>SUBJECTS:</b>15AC5T [5/5]
                                  </Typography>
                                  <Typography>
                                    <b>EXAMINEE:</b> 5
                                  </Typography>
                                  <Typography>
                                    <b>STATUS:</b>Published
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 3 }}
                                  >
                                    <Button
                                      color="success"
                                      variant="contained"
                                      startIcon={<ThumbUpAltIcon />}
                                    >
                                      Preview Result
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      startIcon={<GroupsIcon />}
                                    >
                                      Manage Room
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<ControlCameraIcon />}
                                      sx={{
                                        backgroundColor: "#2979FF",
                                        color: "white",
                                      }}
                                    >
                                      Control Center
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Paper>
                            <Paper elevation={4}>
                              <Card sx={{ mt: 3 }}>
                                <Typography variant="h6"
                                  sx={{
                                    backgroundColor: "primary.main",
                                    height: "40px",
                                    padding: "10px",
                                    color: "white",
                                  }}
                                >
                                  2) demo_23_09_22 | 09-Sep-2022 10:00 AM TO
                                  11-Sep-2022 10:00 AM
                                </Typography>
                                <CardContent sx={{ margin: "5px" }}>
                                  <Typography>
                                    <b>SUBJECTS: </b>15AC5T [5/5]
                                  </Typography>
                                  <Typography>
                                    <b>EXAMINEE:</b> 5
                                  </Typography>
                                  <Typography>
                                    <b>STATUS:</b> Published
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 3 }}
                                  >
                                    <Button
                                      color="success"
                                      variant="contained"
                                      startIcon={<ThumbUpAltIcon />}
                                    >
                                      Preview Result
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      startIcon={<GroupsIcon />}
                                    >
                                      Manage Room
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<ControlCameraIcon />}
                                      sx={{
                                        backgroundColor: "#2979FF",
                                        color: "white",
                                      }}
                                    >
                                      Control Center
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    {/* </Fade> */}
                      
                    </>
                  ) : (
                    ""
                  )}

                {showDataCardLAQ ? (
                    <>
                    {/* <Fade right> */}
                    <Box sx={{ m: 3 }}>
                        <Grid container>
                          <Grid item lg={12}>
                            <Paper elevation={4}>
                              <Card>
                                <Typography variant="h6"
                                  sx={{
                                    background: "#0277BD",
                                    height: "40px",
                                    padding: "10px",
                                    color: "white",
                                  }}
                                >
                                  LAQ 1) demo_09_09_22 | 09-Sep-2022 10:00 AM TO
                                  11-Sep-2022 12:00 AM
                                </Typography>
                                <CardContent sx={{ margin: "5px" }}>
                                  <Typography>
                                    <b>SUBJECTS:</b>15AC5T [5/5]
                                  </Typography>
                                  <Typography>
                                    <b>EXAMINEE:</b> 5
                                  </Typography>
                                  <Typography>
                                    <b>STATUS:</b>Published
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 3 }}
                                  >
                                    <Button
                                      color="success"
                                      variant="contained"
                                      startIcon={<ThumbUpAltIcon />}
                                    >
                                      Preview Result
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      startIcon={<GroupsIcon />}
                                    >
                                      Manage Room
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<ControlCameraIcon />}
                                      sx={{
                                        backgroundColor: "#2979FF",
                                        color: "white",
                                      }}
                                    >
                                      Control Center
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Paper>
                            <Paper elevation={4}>
                              <Card sx={{ mt: 3 }}>
                                <Typography variant="h6"
                                  sx={{
                                    background: "#0277BD",
                                    height: "40px",
                                    padding: "10px",
                                    color: "white",
                                  }}
                                >
                                  2) demo_23_09_22 | 09-Sep-2022 10:00 AM TO
                                  11-Sep-2022 10:00 AM
                                </Typography>
                                <CardContent sx={{ margin: "5px" }}>
                                  <Typography>
                                    <b>SUBJECTS: </b>15AC5T [5/5]
                                  </Typography>
                                  <Typography>
                                    <b>EXAMINEE:</b> 5
                                  </Typography>
                                  <Typography>
                                    <b>STATUS:</b> Published
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 3 }}
                                  >
                                    <Button
                                      color="success"
                                      variant="contained"
                                      startIcon={<ThumbUpAltIcon />}
                                    >
                                      Preview Result
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      startIcon={<GroupsIcon />}
                                    >
                                      Manage Room
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<ControlCameraIcon />}
                                      sx={{
                                        backgroundColor: "#2979FF",
                                        color: "white",
                                      }}
                                    >
                                      Control Center
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    {/* </Fade> */}
                   
                    </>
                  ) : (
                    ""
                  )}

                {showDataCardBoth? (
                    <>
                   
                     <Box sx={{ m: 3 }}>
                        <Grid container>
                          <Grid item lg={12}>
                            <Paper elevation={4}>
                              <Card>
                                <Typography variant="h6"
                                  sx={{
                                    background: "#0277BD",
                                    height: "40px",
                                    padding: "10px",
                                    color: "white",
                                  }}
                                >
                                  MCQ + SAQ 1) demo_09_09_22 | 09-Sep-2022 10:00 AM TO
                                  11-Sep-2022 12:00 AM
                                </Typography>
                                <CardContent sx={{ margin: "5px" }}>
                                  <Typography>
                                    <b>SUBJECTS:</b>15AC5T [5/5]
                                  </Typography>
                                  <Typography>
                                    <b>EXAMINEE:</b> 5
                                  </Typography>
                                  <Typography>
                                    <b>STATUS:</b>Published
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 3 }}
                                  >
                                    <Button
                                      color="success"
                                      variant="contained"
                                      startIcon={<ThumbUpAltIcon />}
                                    >
                                      Preview Result
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      startIcon={<GroupsIcon />}
                                    >
                                      Manage Room
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<ControlCameraIcon />}
                                      sx={{
                                        backgroundColor: "#2979FF",
                                        color: "white",
                                      }}
                                    >
                                      Control Center
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Paper>
                            <Paper elevation={4}>
                              <Card>
                                <Typography variant="h6"
                                  sx={{
                                    background: "#0277BD",
                                    height: "40px",
                                    padding: "10px",
                                    color: "white",
                                  }}
                                >
                                  MCQ + SAQ 2) demo_09_09_22 | 09-Sep-2022 10:00 AM TO
                                  11-Sep-2022 12:00 AM
                                </Typography>
                                <CardContent sx={{ margin: "5px" }}>
                                  <Typography>
                                    <b>SUBJECTS:</b>15AC5T [5/5]
                                  </Typography>
                                  <Typography>
                                    <b>EXAMINEE:</b> 5
                                  </Typography>
                                  <Typography>
                                    <b>STATUS:</b>Published
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 3 }}
                                  >
                                    <Button
                                      color="success"
                                      variant="contained"
                                      startIcon={<ThumbUpAltIcon />}
                                    >
                                      Preview Result
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      startIcon={<GroupsIcon />}
                                    >
                                      Manage Room
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<ControlCameraIcon />}
                                      sx={{
                                        backgroundColor: "#2979FF",
                                        color: "white",
                                      }}
                                    >
                                      Control Center
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Card>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
