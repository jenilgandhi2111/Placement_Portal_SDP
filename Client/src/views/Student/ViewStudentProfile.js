import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import UseFetch from '../../Utilities/UseFetch';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import ParseDate from '../../Utilities/ParseDate'
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack
} from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import { IconInfoCircle, IconX, IconPlus } from '@tabler/icons';

function ViewStudentProfile() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '2%',
        p: 4
    };

    function createData(key, value) {
        if (value == undefined) {
            value = 'Not Defined!';
        }
        return { key, value };
    }

    const student_id = useLocation().pathname.split('/')[3];

    const { required_data, loading } = UseFetch('/student/getOneStudentInAdmin/' + student_id, 'GET');

    let student_details, rows;

    if (!loading) {
        student_details = required_data['data'];
        // console.log(required_data["data"])
        rows = [
            createData('Student ID', student_details['Student_ID']),
            createData('FirstName', student_details['FirstName']),
            createData('MiddleName', student_details['MiddleName']),
            createData('LastName', student_details['LastName']),
            createData('Admission type', student_details['Admission_type']),
            createData('Cast category', student_details['Cast_category']),
            createData('Gender', student_details['Gender']),
            createData('DOB', student_details['DOB']),
            createData('SSC Percentage', student_details['SSC_Percentage']),
            createData('SSC Percentile', student_details['SSC_Percentile']),
            createData('SSC Board', student_details['SSC_Board']),
            createData('SSC School', student_details['SSC_School']),
            createData('HSC Percentage', student_details['HSC_Percentage']),
            createData('HSC Percentile', student_details['HSC_Percentile']),
            createData('HSC Board', student_details['HSC_Board']),
            createData('HSC School', student_details['HSC_School']),
            createData('IsD2D', student_details['IsD2D']),
            createData('Diploma Result CPI', student_details['Diploma_Result_CPI']),
            createData('Diploma Result Percentage', student_details['Diploma_Result_Percentage']),
            createData('Diploma College Name', student_details['Diploma_College_Name']),
            createData('Diploma University', student_details['Diploma_University']),
            createData('Sem 1 SPI', student_details['Sem_1_SPI']),
            createData('Sem 2 SPI', student_details['Sem_2_SPI']),
            createData('Sem 3 SPI', student_details['Sem_3_SPI']),
            createData('Sem 4 SPI', student_details['Sem_4_SPI']),
            createData('Sem 5 SPI', student_details['Sem_5_SPI']),
            createData('Sem 6 SPI', student_details['Sem_6_SPI']),
            createData('Sem 7 SPI', student_details['Sem_7_SPI']),
            createData('Sem 8 SPI', student_details['Sem_8_SPI']),
            createData('Current CPI', student_details['Current_CPI']),
            createData('Enrollment year', student_details['Enrollment_year']),
            createData('Passed out year', student_details['Passed_out_year']),
            createData('Email ID', student_details['Email_ID']),
            createData('Contact No 1', student_details['Contact_No_1']),
            createData('Contact No 2', student_details['Contact_No_2']),
            createData('Address', student_details['Address']),
            createData('City', student_details['City']),
            createData('Pin Code', student_details['Pin_Code']),
            createData('Current semester', student_details['Current_semester']),
            createData('Career Preference', student_details['Career_Preference']),
            // createData("CV Upload", student_details["CV_Upload"]),
            // createData("Student Photo", student_details["Student_Photo"]),
            createData('Branch Id', student_details['Branch_Id'])
        ];
    }

    const [skillDetails, setSkillDetails] = useState(undefined);
    const [studentInternships, setStudentInternships] = useState(undefined);
    // fetch skills details
    useEffect(async () => {
        let response = undefined;
        response = await fetch('/skillsandachievements/getSkillsAndAchievementsInAdmin/' + student_id);
        if (response != undefined) {
            let jsonData = undefined;
            jsonData = await response.json();
            // console.log(jsonData)
            if (jsonData != undefined) {
                let data = jsonData['data'];
                console.log(data[0])
                setSkillDetails(data[0]);
                // console.log(skillDetails)

                let response1 = undefined
                response1 = await fetch("/StudentAchievementsInternships/getStudentAchievementsInternshipsByStudentIDInAdmin/" + student_id)

                if(response1 != undefined)
                {
                    let internshipsData = undefined
                    internshipsData = await response1.json()
                    console.log(internshipsData)

                    if(internshipsData != undefined)
                    {
                        let data = internshipsData["data"]
                        if(data == "Student Internship Record Not Found!")
                        {
                            setStudentInternships(undefined)
                        }
                        else
                        {
                            setStudentInternships(data)
                        }

                        
                    }
                }
            }
        }
    }, []);

    return (
        <>
            <MainCard title="Student Profile">
                {loading ? (
                    ''
                ) : (
                    <>
                        
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h5">{row.key}</Typography>
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow key="CV_Upload" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">CV Upload</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {student_details === undefined ? (
                                                'Wait Loading....'
                                            ) : (
                                                <>
                                                    <a
                                                        target="blank"
                                                        style={{ 'text-decoration': 'none', cursor: 'pointer' }}
                                                        href={
                                                            'http://localhost:8000' +
                                                            student_details['CV_Upload'].split('.')[1] +
                                                            '.' +
                                                            student_details['CV_Upload'].split('.')[2]
                                                        }
                                                    >
                                                        {student_details === undefined ? (
                                                            'Wait Loading....'
                                                        ) : (
                                                            <>
                                                                <Chip
                                                                    label={'View CV'}
                                                                    // variant="outlined"
                                                                    color="primary"
                                                                    clickable
                                                                />
                                                            </>
                                                        )}
                                                    </a>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key="Student_Photo" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">Student Photo</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {student_details === undefined ? (
                                                'Wait Loading....'
                                            ) : (
                                                <>
                                                    <a
                                                        target="blank"
                                                        style={{ 'text-decoration': 'none', cursor: 'pointer' }}
                                                        href={
                                                            'http://localhost:8000' +
                                                            student_details['Student_Photo'].split('.')[1] +
                                                            '.' +
                                                            student_details['Student_Photo'].split('.')[2]
                                                        }
                                                    >
                                                        {student_details === undefined ? (
                                                            'Wait Loading....'
                                                        ) : (
                                                            <>
                                                                <Chip
                                                                    label={'View Photo'}
                                                                    // variant="outlined"
                                                                    color="primary"
                                                                    clickable
                                                                />
                                                            </>
                                                        )}
                                                    </a>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <MainCard title="Student Skills">
                            <Grid direction="row" spacing={1}>
                                {skillDetails == undefined
                                    ? ''
                                    : skillDetails['Skills'] == ''
                                    ? ''
                                    : skillDetails['Skills'].split(',').map((elem) => {
                                          return (
                                              <Chip
                                                  style={{ margin: '1%' }}
                                                  icon={IconInfoCircle}
                                                  variant="outlined"
                                                  color="primary"
                                                //   onDelete={() => handleDelete(elem)}
                                                  label={elem}
                                              />
                                          );
                                      })}
                            </Grid>
                        </MainCard>
                        <br />
                        <MainCard title="Internships">
                            {studentInternships == undefined
                            ? ""
                            :
                            studentInternships.map((e) => {
                                return (
                                    <>
                                        <SubCard>
                                            
                                            <Grid container>
                                                <Grid item fullWidth>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs = {12} md={6}>
                                                        <Typography variant='h4'>Company:  </Typography>
                                                        </Grid>
                                                        <Grid item xs = {12} md={6}>
                                                        <Typography> {e.Company_Name}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                    
                                            </Grid>
                                            <br/>
                                            <Grid container>
                                                <Grid item>
                                                    <Grid container spacing={2}>
                                                        <Grid item>
                                                        <Typography variant='h4'>Start Date:  </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                        <Typography> {e.Start_Date}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <Grid container>
                                                <Grid item>
                                                    <Grid container spacing={2}>
                                                        <Grid item>
                                                        <Typography variant='h4'>End Date:  </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                        <Typography> {e.End_Date}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </SubCard>
                                    </>
                                )
                            })

                            }
                            
                        </MainCard>
                    </>
                )}
            </MainCard>
        </>
    );
}

export default ViewStudentProfile;