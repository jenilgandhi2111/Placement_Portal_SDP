import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyPlacementCard from './CompanyPlacementCard';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';
import SubCard from '../../ui-component/cards/SubCard';
import { Typography } from '@material-ui/core';
import { ParseDate } from '../../Utilities/ParseDate';
import ChipCard from "../../ui-component/cards/GenericCards/ChipCard"
import Student_details from './JSX/Student_details';

function AddPlacement() {

    const [studentData, setStudentData] = useState('');
    const [StudentDetails, setStudentDetails] = useState(undefined);
    const [studentPlacement, setStudentPlacement] = useState(undefined)
    const [allCompanies, setallCompanies] = useState([])

    const [placementCard, setPlacementCard] = useState([]);

    useEffect(async () => {
        let response = await fetch("/company/getCompany")
        if (response) {
            let data = await response.json()
            if (data) {
                console.log(data["data"])
                setallCompanies([].concat(data["data"]))
                // console.log(allCompanies)
                setPlacementCard([].concat(<CompanyPlacementCard
                    companyName={""}
                    details={{
                        Designation: "",
                        Salary: "",
                        Offer_Letter: "",
                        Passed_out_year: "",
                        IsFinal: false,
                        Company_ID: "",
                        companyName: ""
                    }}
                    allCompanies={data["data"]
                    } />))
            }
        }
    }, [])

    const [jsonData, setjsonData] = useState(undefined)

    async function handleChange(e) {
        setStudentData(e.target.value)

        if (e.target.value.length === 10) {
            let response = undefined
            response = await fetch("/student/getOneStudentInAdmin/" + e.target.value.toUpperCase(), { method: "GET" })

            if (response != undefined) {
                let jsonData = undefined
                jsonData = await response.json()
                if (jsonData != undefined) {
                    console.log(jsonData);
                    setStudentDetails(jsonData["data"])
                    const student_Id = jsonData["data"]["Student_ID"]
                    // console.log(student_Id)
                    let response1 = undefined
                    response1 = await fetch("/studentplacement/getStudentPlacement/" + student_Id, { method: "GET" })

                    if (response1 != undefined) {
                        let jsonData1 = undefined
                        jsonData1 = await response1.json()
                        console.log(jsonData1)
                        setStudentPlacement(jsonData1)
                        let studentPlacementCardCopy = placementCard
                        console.log(jsonData1.data)
                        if (jsonData1.data != "Student Placement Record Not Found!") {
                            console.log(jsonData1.data.length)
                            for (let i = 0; i < jsonData1.data.length; i++) {
                                console.log(i, jsonData1.data[i])

                                console.log(jsonData1.data[i].Company_details.Company_name)
                                jsonData1.data[i].Company_name = jsonData1.data[i].Company_details.Company_name
                                studentPlacementCardCopy.unshift(<CompanyPlacementCard
                                    companyName={jsonData1.data[i].Company_details.Company_name}
                                    details={jsonData1.data[i]}
                                    allCompanies={allCompanies}
                                />)
                            }
                            setPlacementCard([].concat(studentPlacementCardCopy))
                            // console.log(placementCard)
                        }
                    }

                }
            }


        }
        else if (e.target.value === 0) {
            setStudentDetails(undefined)
            console.log("Here")
        }

    }

    function handleClick() {
        // console.log("keval")
        let placement_card_copy = placementCard;
        placement_card_copy.push(<CompanyPlacementCard
            companyName={""}
            details={{
                Designation: "",
                Salary: "",
                Offer_Letter: "",
                Passed_out_year: "",
                IsFinal: false,
                Company_ID: "",
                companyName: ""
            }}
            allCompanies={allCompanies} />);
        setPlacementCard([].concat(placement_card_copy));
    }

    const [first, setfirst] = useState("")
    useEffect(() => {
        console.log(first)
    }, [first])

    let oppo = 9000
    function checkMe(str1) {
        setfirst(str1 + oppo + "From GHere")
    }



    return (
        <>
            <MainCard title="Add Placement">
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    id="fullWidth"
                    helperText="Enter Student ID"
                />
                <br />
                <br />
                {StudentDetails === undefined ? "" :
                    <>
                        <ChipCard loading={false} data={<Student_details details={StudentDetails} />}>
                        </ChipCard>
                        <br />
                    </>

                }

                {/* {placementCard.map((e) => {
                    return e;
                })} */}
                {placementCard.map((elem) => {
                    return (<>
                        {elem}
                    </>)
                })}

                <br />
                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                    <LoadingButton
                        color="primary"
                        onClick={handleClick}
                        loading={false}
                        loadingPosition="start"
                        startIcon={<IconCirclePlus />}
                        variant="contained"
                    >
                        Add
                    </LoadingButton>
                </Grid>
            </MainCard>
        </>
    );
}

export default AddPlacement;
