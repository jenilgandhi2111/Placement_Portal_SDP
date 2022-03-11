const StudentPlacementController = require("../Controllers/StudentPlacementController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")
const multer = require('multer');
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")
const FileUploadMiddleware = require("../Middlewares/FileUpload/FileUpload")
const ResolveUser = require("../Middlewares/General/ResloveUser")
// const FileUploadMiddleware = require("../Middlewares/FileUpload/FileUpload")

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/PlacementFiles")
    },
    filename: (req, file, cb) => {
        console.log(req.body)
        cb(null, "DDU_PLACEMENT" + ".csv")
        console.log(req.body)
    }
})

const upload = multer({ storage: fileStorage })

const fileStorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/PlacementFiles")
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".")[1]
        console.log(req.body)
        cb(null, req.body.Student_ID + "-" + req.body.Designation + "-" + req.body.Company_ID + "." + extension)
        req.body.Offer_Letter = "/public/PlacementFiles/" + req.body.Student_ID + "-" + req.body.Designation + "-" + req.body.Company_ID + "." + extension
    }

})

const upload1 = multer({ storage: fileStorage1 })

router.post("/addStudentPlacement", [AdminAuthenticate.AdminAuthenticate, FileUploadMiddleware.jobFileUploadMiddleWare], StudentPlacementController.addStudentPlacement)
router.post("/addStudentPlacementWithCSV", [AdminAuthenticate.AdminAuthenticate, FileUploadMiddleware.csvFileUploadMiddleWare], StudentPlacementController.addStudentPlacementViaCSV)
router.get("/getStudentPlacement/:studentId", [ResolveUser.ResolveUserMiddleware], StudentPlacementController.getStudentPlacement)
router.get("/getAllStudentPlacement", [AdminAuthenticate.AdminAuthenticate], StudentPlacementController.getAllStudentPlacement)
router.post("/updateStudentPlacement/:id", [AdminAuthenticate.AdminAuthenticate, FileUploadMiddleware.jobFileUploadMiddleWare], StudentPlacementController.updateStudentPlacement)
router.post("/deleteStudentPlacement/:id", [AdminAuthenticate.AdminAuthenticate], StudentPlacementController.deleteStudentPlacement)

module.exports = router