import React ,{useState,useEffect} from "react";
import moment from "moment";
import axios from "axios";
import { Helmet } from "react-helmet";
import AppBarDrawer from "../../Components/AppbarDrawer";
import {Avatar,Card,CardContent,CardActions,CssBaseline,Grow,Grid,Chip,Divider,Button,Box,Toolbar,Typography,Paper,List,ListItemButton,ListItemAvatar} from "@mui/material"
import FiberNewIcon from "@mui/icons-material/FiberNew";

const drawerWidth = 240;

const Dashboard = () => {
  const [quizName,setQuizName] = useState();
  const [quizOpenTime,setQuizOpenTime] =  useState();
  const [quizCloseTime,setQuizCloseTime] =  useState();
  const [apiData, setApiData] = useState([]);

//All quizlst
  const getAllQuiz = async () => {
   const requestData = {
     orgCode : "STLIND"
   };
   try {
     const response = await axios.post(`http://localhost:5000/api/v1/quiz`,requestData);
     console.log(response.data);
     setQuizName(response.data.result[0].quiz_name);
     setQuizOpenTime(response.data.result[0].quiz_open_date_time);
     setQuizCloseTime(response.data.result[0].quiz_close_date_time);
     console.log(response.data.result[0].quiz_name);

   } catch (error) {
     console.log(error);
   }
 }
//loading data in card
 const loadData = async () => {
  const requestData = {
    orgCode: "medicaps"
  };
  try {
    const response = await axios.post(`http://localhost:5000/api/v1/fetch`, requestData);
    setApiData(response.data.result);
  } catch (error) {
    console.log(error);
  }
};

const getTotalExaminationCount = () => "0"+ apiData.length;

const getSyncedExaminationCount = () => "0"+apiData.filter(item => item.is_examfetch === "YES").length;

const getNotSyncedExaminationCount = () => "0"+apiData.filter(item => item.is_examfetch === "NO").length;

const getTotalMCQSAQCount = () => "0" + apiData.filter(item => item.question_type === "MCQSAQ").length;

const getTotalLAQCount = () => "0" + apiData.filter(item => item.question_type === "LAQ").length;

useEffect(() => {
  getAllQuiz();
  loadData();
}, []);

  return (
    <div>
      <Helmet>
        <title>Total Assesment | Dashboard</title>
      </Helmet>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: '#f2f7ff' }}
      >
        <CssBaseline />
        <AppBarDrawer />
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0 0" }}
          {...(true ? { timeout: 1000 } : {})}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <Grid container spacing={2} justifyContent="center"  >
              {/* Exam Fetch Count */}
              <Grid item lg={4} xs={3} md={4} sm={4}>
                  <Card sx={{ borderTop: 2, borderColor: '#0066cc' }}>
            <Typography
              sx={{
                background: "linear-gradient(to right, #0066cc 0%, #F06292 100%)",
                color: "white",
                padding: "10px",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Exam Fetch Count
            </Typography>
            <CardContent sx={{ m: 1 }}>
              <Grid container justifyContent="center">
                <Grid item lg={10} xs={9}>
                  <Typography
                    component="div"
                    fontWeight="bold"
                    variant="h7"
                    textAlign="left"
                  >
                    Total Examination
                  </Typography>
                </Grid>
                <Grid item lg={2} xs={3} >
                  <Chip
                    label={getTotalExaminationCount()}
                    size="small"
                    style={{
                      borderRadius: "15px",
                      margin: "2px",
                      backgroundColor: "#0D47A1",
                      color: "white",
                      float: "right"
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item lg={10} xs={9} >
                  <Typography
                    component="div"
                    fontWeight="bold"
                    variant="h7"
                    textAlign="left"
                  >
                    Synced Examination
                  </Typography>
                </Grid>
                <Grid item lg={2} xs={3}>
                  <Chip
                    label={getSyncedExaminationCount()}
                    size="small"
                    style={{
                      borderRadius: "15px",
                      margin: "2px",
                      backgroundColor: "#2E7D32",
                      color: "white",
                      float: "right"
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item lg={10} xs={9} >
                  <Typography
                    component="div"
                    fontWeight="bold"
                    variant="h7"
                    textAlign="left"
                  >
                    Not Synced Examination
                  </Typography>
                </Grid>
                <Grid item lg={2} xs={3} >
                  <Chip
                    label={getNotSyncedExaminationCount()}
                    size="small"
                    style={{
                      borderRadius: "15px",
                      margin: "2px",
                      backgroundColor: "#FF6D00",
                      color: "white",
                      float: "right"
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Grid container justifyContent="center">
                <Grid item lg={3} xs={10}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      background: "linear-gradient(to right, #0066cc 0%, #F06292 100%)",
                      color: "white", textAlign: "center"
                    }}
                  >
                    <span style={{ fontSize: "9px" }}>Know More</span>
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
            <Divider />
                  </Card>
              </Grid>
              {/* Exam Type Count */}
              <Grid item lg={4} xs={3} md={4} sm={4}>
            <Card sx={{ borderTop: 2, borderColor: '#388E3C' }}>
  <Typography
    sx={{
      background:
        "linear-gradient(to right, #006699 0%,  #388E3C 100%)",
      color: "white",
      padding: "10px",
      fontWeight: "bold",
      textAlign: "center"

    }}
  >
    Exam Type Count
  </Typography>
  <CardContent sx={{ m: 1 }}>
    <Grid container justifyContent="center">
      <Grid item lg={10} xs={9}>
        <Typography
          component="div"
          fontWeight="bold"
          variant="h7"
          textAlign="left"
        >
          Total Examination
        </Typography>
      </Grid>
      <Grid item lg={2} xs={3} >
        <Chip
           label={getTotalExaminationCount()}
          size="small"
          style={{
            borderRadius: "15px",
            margin: "2px",
            backgroundColor: "#0D47A1",
            color: "white",
            float: "right"
          }}
        />
      </Grid>
    </Grid>
    <Grid container justifyContent="center">
      <Grid item lg={10} xs={9} >
        <Typography
          component="div"
          fontWeight="bold"
          variant="h7"
          textAlign="left"

        >
      Total MCQ + SAQ
        </Typography>
      </Grid>
      <Grid item lg={2} xs={3}>
        <Chip label={getTotalMCQSAQCount()} 
        size="small" style={{ borderRadius: "15px", margin: "2px", backgroundColor: "#2E7D32", color: "white", float: "right" }}/>
      </Grid>
    </Grid>
    <Grid container justifyContent="center">
      <Grid item lg={10} xs={9} >
        <Typography component="div" fontWeight="bold" variant="h7" textAlign="left" >  Total LAQ </Typography>
      </Grid>
      <Grid item lg={2} xs={3} >
        <Chip
          label={getTotalLAQCount()}
          size="small"
          style={{
            borderRadius: "15px",
            margin: "2px",
            backgroundColor: "#FF6D00",
            color: "white",
            float: "right"

          }}
        />
      </Grid>
    </Grid>
  </CardContent>
  <Divider />
  <CardActions>
    <Grid container justifyContent="center">
      <Grid item lg={3} xs={10}>
        <Button
          size="small"
          variant="contained"
          sx={{
            background:
              "linear-gradient(to right, #0066cc 0%, #388E3C 100%)",
            color: "white", textAlign: "center"
          }}
        >
         <span style={{fontSize:"9px"}}>Know More</span> 
        </Button>
      </Grid>
    </Grid>
  </CardActions>

            </Card>
              </Grid>
              {/* Exam Sync Count */}
              <Grid item lg={4} xs={3} md={4} sm={4}>
                <Card sx={{ borderTop: 2, borderColor: ' #000099 ' }}>
                  <Typography
                    sx={{
                      background:
                        " linear-gradient(to right, #000099 0%, #FFFF8D 100%)",
                      color: "white",
                      padding: "10px",
                      fontWeight: "bold",
                      textAlign: "center"

                    }}
                  >
                    Exam Scheduled Count
                  </Typography>
                  <CardContent sx={{ m: 1 }}>
                    <Grid container justifyContent="center">
                      <Grid item lg={10} xs={9}>
                        <Typography
                          component="div"
                          fontWeight="bold"
                          variant="h7"
                          textAlign="left"
                        >
                          Today's Exam
                        </Typography>
                      </Grid>
                      <Grid item lg={2} xs={3} >
                        <Chip
                          label="01"
                          size="small"
                          style={{
                            borderRadius: "15px",
                            margin: "2px",
                            backgroundColor: "#0D47A1",
                            color: "white",
                            float: "right"
                          }}
                       />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                      <Grid item lg={10} xs={9} >
                        <Typography
                          component="div"
                          fontWeight="bold"
                          variant="h7"
                          textAlign="left"

                        >
                          Week's Exam
                        </Typography>
                      </Grid>
                      <Grid item lg={2} xs={3}>
                        <Chip
                          label="01"
                          size="small"
                          style={{
                            borderRadius: "15px",
                            margin: "2px",
                            backgroundColor: "#2E7D32",
                            color: "white",
                            float: "right"

                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                      <Grid item lg={10} xs={9} >
                        <Typography
                          component="div"
                          fontWeight="bold"
                          variant="h7"
                          textAlign="left"

                        >
                          Month's Exam
                        </Typography>
                      </Grid>
                      <Grid item lg={2} xs={3} >
                        <Chip
                          label="01"
                          size="small"
                          style={{
                            borderRadius: "15px",
                            margin: "2px",
                            backgroundColor: "#FF6D00",
                            color: "white",
                            float: "right"

                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Grid container justifyContent="center">
                      <Grid item lg={3} xs={10}>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            background:
                              "linear-gradient(to right, #0066cc 0%, #FFFF8D 100%)",
                            color: "white", textAlign: "center"
                          }}
                        >
                         <span style={{fontSize:"9px"}}>Know More</span> 
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <br />

              {/* Exam Details */}
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item lg={12} xs={12}  md={12} sm={12}>
                  <Typography
                    variant="h6"
                    color="#000099"
                    fontFamily="revert"
                    fontWeight="bold"
                    textAlign="left"
                  >
                    Today's Exam Details
                    <span sx={{ mt: 3 }}>

                      <FiberNewIcon
                        className="blink"
                        sx={{ color: "#E64A19", fontSize: "30px" }}
                      />
                    </span>
                  </Typography>
                  <br />
                  <Paper elevation={6}>
                    <Card>
                      <CardContent>
                        <List
                          className="ListItem"
                          dense
                          sx={{
                            mt: 1,
                            width: "100%",
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                          }}
                        >
                          <Grid container>
                            <Grid item lg={1} xs={1} md={1} sm={1}>
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={``}
                                    src="https://media.glassdoor.com/sqll/503743/silicon-techlab-squarelogo-1643983959442.png"
                                  />
                                </ListItemAvatar>
                              </ListItemButton>
                            </Grid>
                            <Grid item lg={3} xs={5} md={5} sm={5} sx={{ mt: 1 }}>
                              <Typography variant="h7" >
                                {quizName}
                              </Typography>
                            </Grid>
                            <Grid item lg={3} xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                <b>Exam Starts:</b> {moment(quizOpenTime).format("DD MMM YYYY HH:mm")}
                              </Typography>
                            </Grid>
                            <Grid item lg={3} xs={2}  md={2} sm={2} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                <b>Exam Finish:</b> {moment(quizCloseTime).format("DD MMM YYYY HH:mm")}
                              </Typography>
                            </Grid>
                            <Grid item lg={2} xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Button
                                className="button"
                                size="small"
                                variant="contained"
                                color="primary"
                              >
                                <span> More Details </span>
                              </Button>
                            </Grid>
                          </Grid>
                        </List>
                        <List
                          className="ListItem"
                          dense
                          sx={{
                            mt: 1,
                            width: "100%",
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                          }}
                        >
                          <Grid container style={{borderBlockColor:"#03A9F4 "}}>
                            <Grid item lg={1} xs={1} md={1} sm={1}>
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={``}
                                    src={`https://upload.wikimedia.org/wikipedia/en/e/ec/Official_logo_of_Biju_Patanaik_University_of_Technology.png`}
                                  />
                                </ListItemAvatar>
                              </ListItemButton>
                            </Grid>
                            <Grid item lg={3} xs={5} md={5} sm={5} sx={{ mt: 1 }}>
                              <Typography variant="h7" >
                                Common Entrance Exam (2022)
                              </Typography>
                            </Grid>
                            <Grid item lg={3} xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                <b>Exam Starts:</b> 15 Jan 2023 16:00
                              </Typography>
                            </Grid>
                            <Grid item lg={3} xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                <b>Exam Finish:</b> 15 Jan 2023 18:00
                              </Typography>
                            </Grid>
                            <Grid item lg={2} xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Button
                                className="button"
                                size="small"
                                variant="contained"
                                color="primary"
                              >
                                <span>More Details</span>
                              </Button>
                            </Grid>
                          </Grid>
                        </List>
                        <List
                          className="ListItem"
                          dense
                          sx={{
                            mt: 1,
                            width: "100%",
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                          }}
                        >
                          <Grid container>
                            <Grid item lg={1} xs={1} md={1} sm={1}>
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={``}
                                    src={`https://upload.wikimedia.org/wikipedia/en/9/90/Orissa_University_of_Agriculture_and_Technology_logo.png`}
                                  />
                                </ListItemAvatar>
                              </ListItemButton>
                            </Grid>
                            <Grid item lg={3} xs={5} md={5} sm={5} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                Final Semester Exam OUAT (2022)
                              </Typography>
                            </Grid>
                            <Grid item lg={3}  xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                <b>Exam Starts:</b> 17 Jan 2023 16:00
                              </Typography>
                            </Grid>
                            <Grid item lg={3}  xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Typography variant="h7">
                                <b>Exam Finish:</b>15 Jan 2023 18:00
                              </Typography>
                            </Grid>
                            <Grid item lg={2}  xs={2} md={2} sm={2} sx={{ mt: 1 }}>
                              <Button
                                className="button"
                                size="small"
                                variant="contained"
                                color="primary"
                              >
                                <span>More Details</span>
                              </Button>
                            </Grid>
                          </Grid>
                        </List>
                      </CardContent>
                    </Card>
                  </Paper>

                </Grid>
              </Grid>
            </div>
          </Box>
        </Grow>
      </Box>

    </div>
  );
};

export default Dashboard;
