const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentInternship = db.student_internships
const StudentInternshipService = require("../Services/StudentInternshipService")

async function checkExists(id) {
    const studnentinternship = await StudentInternship.findAll({ where: { id }})
    return studnentinternship.length > 0 ? true : false
}

const addStudentInternship = async (req, res) => {
    try {
        const data = req.body
        if(req.emptyField) {
            throw req.empty_arr[0] + " cannot be empty"
        }
        const status = await StudentInternshipService.createStudentInternship(data)
        if(status) {
            return res.json({ data: "Student Internship Record created", status: true})
        }
        else {
            throw "Error from createStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const getAllStudentInternship = async (req, res) => {
    try {
        let studentinternships = await StudentInternshipService.getAllStudentInternship()
        if(studentinternships) {
            return res.json({ status: studentinternships.length == 0 ? false : true, data: studentinternships.length == 0 ? "No Student Internship Record found" : studentinternships })
        }
        else {
            throw "Error from getAllStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const getStudentInternship = async (req, res) => {
    try {
        const id = req.params.id
        let studentinternship = await StudentInternshipService.getStudentInternship(id)
        if(studentinternship) {
            return res.json({ status: studentinternship.length == 0 ? false : true, data: studentinternship.length == 0 ? "Student Internship Record Not Found!" : studentinternship })   
        }
        else {
            throw "Error from getStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const updateStudentInternship = async (req, res) => {
    try {
        const id = req.params.id
        const studentinternship = await StudentInternshipService.updateStudentInternship(req.body, id)
        if(studentinternship) {
            return res.json({ status: true, data: "Student Internship Record Updated" })
        }
        else {
            throw "Error from updateStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

const deleteStudentInternship = async (req, res) => {
    try {
        const id = req.params.id
        const status = await StudentInternshipService.deleteStudentInternship(id)
        if(status) {
            return res.json({ status: true, data: "Student Internship Record Deleted Successfully!!" })
        }
        else {
            throw "Error from deleteStudentInternship controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: error.toString(), status: false})
    }
}

module.exports = {
    addStudentInternship,
    getAllStudentInternship,
    getStudentInternship,
    updateStudentInternship,
    deleteStudentInternship
}