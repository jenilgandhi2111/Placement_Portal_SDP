import React, { useState } from 'react';
import { Paper, Typography, Box, Grid, Button, ListItem, List } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import MainCard from './../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import { color } from '@material-ui/system';
import { ClassNames } from '@emotion/react';
import usePost from '../../Utilities/UsePost';
import useFetch from '../../Utilities/useFetch';
import HandleToast from '../../Utilities/HandleToast';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import { TextField } from '@material-ui/core';
import $ from 'jquery';
import { IconDashboard, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone, IconEye } from '@tabler/icons';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyCompany from './JSX/EmptyCompany';

// import SubCard from '../../ui-component/cards/SubCard';

const useStyles = makeStyles((theme) => ({
    applyBtn: {
        background: theme.palette.success.light,
        color: theme.palette.success.dark,
        '&:hover': {
            background: theme.palette.success.main,
            color: theme.palette.background.paper
        }
    },
    crd: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    description: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    lightBlue: {
        marginTop: 12,
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    
}));

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: '##e3f2fd'
    }
});

function ViewCompany() {
    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };

    const [search, setSearch] = useState('');
    const history = useHistory();
    const classes = useStyles();
    const { required_data, loading } = useFetch('/company/getCompany', 'GET');

    let company_list = [];

    if (!loading) {
        // console.log(required_data['data']);
        if (required_data['data'] != 'No Student data!') {
            for (let i = 0; i < required_data['data'].length; i++) {
                var obj = {};
                obj = required_data['data'][i];
                obj['id'] = i;
                // console.log(obj)
                company_list.push(obj);
            }
            console.log(company_list);
        }
    }

    let temp_id = '';

    const rows = [];
    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Company_ID', headerName: 'Company ID', width: 200, editable: false, hide: true },
        {
            field: 'View',
            headerName: 'View',
            sortable: false,
            width: 230,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                temp_id = params.row.Company_ID;
            },
            renderCell: (id) => {
                return (
                    <Button
                        variant="contained"
                        onClick={() => {
                            history.push('/company/view_company/' + temp_id);
                        }}
                        color="primary"
                        startIcon={<IconEye />}
                    >
                        View Full Company
                    </Button>
                );
            }
        },
        { field: 'Company_name', headerName: 'Company Name', width: 200, editable: false },
        { field: 'City', headerName: 'City', width: 200, editable: false },
        { field: 'Contact_person_1_name', headerName: 'Contact Person Name', width: 230, editable: false },
        { field: 'Contact_person_1_email_ID', headerName: 'Contact Person Email', width: 230, editable: false },
        { field: 'Contact_person_1_Mobile', headerName: 'Contact Person Mobile', width: 230, editable: false },

        // hidden columns
        { field: 'Contact_person_1_designation', headerName: 'Contact Person Designation', width: 200, editable: false, hide: true },
        { field: 'Company_address', headerName: 'Company Address', width: 200, editable: false, hide: true },
        { field: 'Contact_person_2_name', headerName: 'Contact Person 2 Name', width: 200, editable: false, hide: true },
        { field: 'Contact_person_2_email_ID', headerName: 'Contact Person 2 Email', width: 200, editable: false, hide: true },
        { field: 'Contact_person_2_designation', headerName: 'Contact Person 2 Designation', width: 200, editable: false, hide: true },
        { field: 'Contact_person_2_Mobile', headerName: 'Contact Person 2 Mobile', width: 200, editable: false, hide: true },
        { field: 'Contact_person_3_name', headerName: 'Contact Person 3 Name', width: 200, editable: false, hide: true },
        { field: 'Contact_person_3_email_ID', headerName: 'Contact Person 3 Email', width: 200, editable: false, hide: true },
        { field: 'Contact_person_3_designation', headerName: 'Contact Person 3 Designation', width: 200, editable: false, hide: true },
        { field: 'Contact_person_3_Mobile', headerName: 'Contact Person 3 Mobile', width: 200, editable: false, hide: true },
        { field: 'Company_web_site', headerName: 'Company Web Site', width: 200, editable: false, hide: true },
        { field: 'Remarks', headerName: 'Remarks', width: 200, editable: false, hide: true },
        { field: 'Company_offer_type', headerName: 'Company Offer Type', width: 200, editable: false, hide: true },
        { field: 'State', headerName: 'State', width: 200, editable: false, hide: true }

        // { field: 'HSC_Percentage', headerName: 'HSC Percentage', width: 200, editable: false },
        // { field: 'Current_CPI', headerName: 'Current CPI', width: 200, editable: false },
        // { field: 'Email_ID', headerName: 'Email ID', width: 200, editable: false },
        // { field: 'Contact_No_1', headerName: 'Contact No 1', width: 200, editable: false },
        // { field: 'Contact_No_2', headerName: 'Contact No 2', width: 200, editable: false },
    ];

    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    function handleSearch(e) {
        console.log(e.target.value);
        setSearch(e.target.value);
        let searchText = e.target.value == '' ? ' ' : e.target.value;
        var root = document.getElementsByClassName('MuiGrid-root MuiGrid-container')[0].children;
        console.log(root);
        for (let i = 0; i < root.length; i++) {
            var elem = document.getElementById(root[i].id);
            console.log(elem);
            var elemText = elem.innerText.toLowerCase();
            if (!elemText.includes(searchText.toLowerCase())) {
                $(elem).hide();
            } else {
                $(elem).show();
            }
        }
    }

    return (
        <>
            {/* /**{ (setData(data)).map((e) => {return e})} */}
            <MainCard title="View Company">
                <TextField label="Search" value={search} onChange={(e) => handleSearch(e)} fullWidth></TextField>
                <br />
                <br />
                <br />
                {loading ? (
                    ''
                ) : required_data['data'] == 'No Student data!' ? (
                    <>
                        <ChipCard loading={loading} data={<EmptyCompany/>}/>
                    </>
                    // <SubCard>
                    //     <Grid container spacing={2}>
                    //         <Grid item xs={12} md={10}>
                    //             <Typography variant="h2">No Company is added yet!!!</Typography>
                    //         </Grid>
                    //         <Grid item xs={12} md={2}>
                    //         <Button variant="contained" 
                    //             size='large'
                    //             startIcon={<IconCirclePlus />} 
                    //             color="primary"
                    //             onClick={() => {
                    //                 history.push('/company/add_company');
                    //             }}
                    //             > Add </Button>
                    //         </Grid>
                    //     </Grid>
                    // </SubCard>
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            checkboxSelection
                            rows={company_list}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                        />
                    </div>
                    // <h1>keval Gandevia</h1>
                    // <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    //     {loading
                    //         ? ''
                    //         : required_data['data'].map((e) => {
                    //               return (
                    //                   <>
                    //                       <Grid item xs={12} md={12} id={e.Company_ID}>
                    //                           <SubCard title={e['Company_name']}>
                    //                               <List dense={false}>
                    //                                   <ListItem>
                    //                                       <Typography variant="h5">Roles :</Typography>
                    //                                       {e['Company_offer_type']}
                    //                                   </ListItem>
                    //                                   <ListItem>
                    //                                       <Typography variant="h5">Address :</Typography>
                    //                                       {e['Company_address']}
                    //                                   </ListItem>
                    //                                   <ListItem>
                    //                                       <Typography variant="h5">City :</Typography>
                    //                                       {e['City'] + ' ' + e['State']}
                    //                                   </ListItem>
                    //                               </List>

                    //                               <Button
                    //                                   size="large"
                    //                                   onClick={() => {
                    //                                       history.push('/company/view_company/' + e['Company_ID']);
                    //                                   }}
                    //                                   fullWidth
                    //                                   className={classes.applyBtn}
                    //                               >
                    //                                   View Details
                    //                               </Button>
                    //                           </SubCard>
                    //                       </Grid>
                    //                   </>
                    //               );
                    //           })}
                    //     {/* <Grid item xs={12} md={12}>
                    //     <SubCard title="Infosys">
                    //         <Typography variant="h5">Description</Typography>
                    //         <List dense={true}>
                    //             <ListItem>
                    //                 ABOUT : Infosys Limited is an Indian multinational information technology company
                    //                 that provides business consulting, information technology and outsourcing services
                    //             </ListItem>
                    //         </List>

                    //     </SubCard>
                    // </Grid>
                    // <Grid item xs={12} md={12}>
                    //     <SubCard title="TCS">
                    //         <Typography variant="h5">Description</Typography>
                    //         <List dense={true}>
                    //             <ListItem>
                    //                 ABOUT : Tata Consultancy Services is an Indian multinational information technology services and
                    //                 consulting company headquartered in Mumbai, Maharashtra, India with its largest campus located in Chennai, Tamil Nadu, India.
                    //             </ListItem>
                    //         </List>

                    //     </SubCard>
                    // </Grid>
                    // <Grid item xs={12} md={12}>
                    //     <SubCard title="Jio Platforms">
                    //         <Typography variant="h5">Description</Typography>
                    //         <List dense={true}>
                    //             <ListItem>
                    //                 ABOUT : Jio Platforms is an Indian technology company and a subsidiary of
                    //                 Reliance Industries, headquartered in Mumbai, India.
                    //             </ListItem>
                    //         </List>

                    //     </SubCard>
                    // </Grid> */}
                    // </Grid>
                )}
            </MainCard>
        </>
    );
}

export default ViewCompany;
