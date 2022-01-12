import React from 'react'
import { Button } from '@material-ui/core';
import MainCard from '../../ui-component/cards/MainCard'
import { Typography } from '@mui/material'
import useFetch from '../../Utilities/useFetch';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ParseDate from '../../Utilities/ParseDate';
import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import { useHistory } from "react-router-dom";

function ViewSingleAnnoucement() {

    function createData(key, value) {
        if (value == undefined) {
            value = "Not Defined!"
        }
        return { key, value };
    }

    let history = useHistory();

    function handleEdit(id) {
        console.log(id);
        history.push('/announcement/edit_announcement/' + id)
    }

    const location = useLocation().pathname;
    const id = location.split("/")[3]

    const { required_data, loading } = useFetch("/annoucement/getAnnoucement/" + id, "GET")

    let announcement_details, rows;
    if (!loading) {

        announcement_details = required_data["data"][0];
        rows = [
            // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData("Date of Announcement", ParseDate.ParseDate(announcement_details["Date_of_announcement"])),
            createData("Date of Visit", ParseDate.ParseDate(announcement_details["Date_of_Visit"])),
            createData("Registration Deadline", ParseDate.ParseDate(announcement_details["Registration_Deadline"], true)),
            createData("Eligible Branches", announcement_details["Eligible_Branches"]),
            createData("Passed out year", ParseDate.getYear(announcement_details["Passed_out_year"])),
            createData("Job Role", announcement_details["Job_Role"]),
            createData("Salary", announcement_details["Salary"]),
            createData("Job Location", announcement_details["Job_Location"]),
            createData("Bond Details", announcement_details["Bond_Details"]),
            createData("Other Details", announcement_details["Other_Details"]),

            createData("Eligibility", announcement_details["Eligibility"]),
        ];
    }

    // const name = new URLSearchParams(search).get('id');




    return (
        <>
            <MainCard title={loading ? "Announcement" : announcement_details["Company_Details"]["Company_name"] + " - " + announcement_details["Job_Role"] + " For " + new Date(announcement_details["Passed_out_year"]).getFullYear() + " Batch"}>

                {loading ? (
                    ''
                ) : (
                    <>

                        <Button onClick={() => handleEdit(announcement_details["Announcement_ID"])} variant="contained"      size="large"     color="primary">
                            Edit Annoucement
                        </Button>
                        <br/>
                        <br/>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                {/* <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                            </TableRow>
                            </TableHead> */}
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.key}
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}



            </MainCard>
        </>
    );
}

export default ViewSingleAnnoucement
