import React, { useState, useEffect } from 'react'

// material-ui
import { Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';

import { Button, Chip } from '@material-ui/core'

import { styled } from '@mui/material/styles';

import UsePostFile from '../../../Utilities/UsePostFile'
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import useFetch from '../../../Utilities/useFetch';

import { gridSpacing } from '../../../store/constant';

const Input = styled('input')({
    display: 'none',
});



export default function UploadPhotoCard({ Student_Photo }) {

    const [data, setData] = useState({
    });
    useEffect(() => { }, [data]);

    const changeHandler1 = (event) => {
        console.log(event.target.files[0])
        const file_data = event.target.files[0]
        const file_name = event.target.files[0]["name"]
        document.getElementById("fileUploadName1").innerText = " " + file_name
        let temp = data
        console.log(document.getElementById('fileUploadName1'));
        temp["Student_Photo_File"] = file_data
        console.log(temp)
        setData(temp)
    };

    async function handleSubmit() {

        const res = await UsePostFile("/student/uploadPhoto", data, "POST")
        // console.log(res);
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }

    return (
        <MainCard title="Add Student Photo">
            <Grid container spacing={gridSpacing}>
                <Grid item>
                    <form enctype="multipart/form-data" id="PhotoForm">
                        <Button
                            variant="outlined"
                            size='large'
                            component="label"
                        >
                            Upload Photo
                            <input
                                onChange={(e) => changeHandler1(e)}
                                required
                                type="file"
                                accept=".JPG"
                                hidden
                            />
                        </Button>
                            <b><label id="fileUploadName1"> </label></b>
                        <br />
                        <br />
                    </form>
                </Grid>

                <Grid item>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        size="large" 
                        color="primary"
                    >
                        Add Photo
                    </Button>
                </Grid>

                <Grid item>

                    {/* <Chip label={"View Student Photo"} /> */}

                    {Student_Photo === undefined ? "Wait Loading...." : <>
                        {Student_Photo.includes("/public/student_details/Photo") ?
                            <a target='blank'
                                style={{ "text-decoration": "none", "cursor": "pointer" }}
                                href={
                                    Student_Photo}
                            >
                                <Button variant="contained" size="large" color="primary">
                                    View Photo
                                </Button>
                            </a> :
                            <>
                                <Chip label="No Photo Uploaded!" />
                            </>
                        }

                    </>
                    }

                </Grid>


            </Grid>
        </MainCard>
    )
}