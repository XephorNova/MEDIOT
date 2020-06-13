const express = require('express');
const mongo = require('mongoose');




const Doctors = require('../models/doctorRegistration')
const AstDoctors = require('../models/assistantDoctors')
const Patients = require('../models/patients')

const api = express.Router();


api.post('/registration',(req,res)=>{
    const doctor_regis = new Doctors({
        Name : req.body.Name,
        date_of_birth:req.body.date_of_birth,
        doctor_license_number:req.body.doctor_license_number,
        PhoneNumber: req.body.PhoneNumber,
        password :req.body.password    
    })

    doctor_regis.save().then(res.status(200).json({
        datasaved : "data saved success",
        status:"success",
    })).catch((err)=>console.log(err))
})
api.post('/astDoctorReg',(req,res)=>{
    const doctorid = req.body.doctorid
    console.log(doctorid)
    const astDoctorReg = {
        Name : req.body.Name,
        date_of_birth:req.body.date_of_birth,
        doctor_license_number:req.body.doctor_license_number,
        PhoneNumber: req.body.PhoneNumber,
        password :req.body.password
    }
    const saveAssistant = new AstDoctors(astDoctorReg);
    saveAssistant["Doctors"].push(doctorid);
    saveAssistant.save()
    .then(res.status(200).json({
        datasaved:"data saved success",
        status : "success"
    }))
    .then(Doctors.findOneAndUpdate({_id : doctorid }, {$push : {assistantDoctor : saveAssistant._id}},{new:true},
        (err,result)=>{
            console.log(err);
            console.log(result)}))
            .catch((err)=>console.log(err))
    

})

api.post('/patientReg',(req,res)=>{
    const doctorid = req.body.doctorid
    const patient = {
    Name : req.body.Name,
    date_of_birth : req.body.date_of_birth,
    Disease: req.body.Disease,
    healthDescription : req.body.healthDescription,
    PhoneNumber: req.body.PhoneNumber,
    password: req.body.password
}

    const savePatient = new Patients(patient)
    savePatient['Doctors'].push(doctorid)

    
    savePatient.save()
    .then(res.status(200).json({
        datasaved:"data saved success",
        status : "success"
    }))
    .then(Doctors.findOneAndUpdate({_id : doctorid }, {$push : {Patients : savePatient._id}},{new:true},
        (err,result)=>{
            console.log(err);
            console.log(result)}))
            .catch((err)=>console.log(err))

})

api.post('/Login',(req,res)=>{
    const logincred = {
        Name:req.body.name,
        password:req.body.password
    }
    
    console.log(logincred)
    if(logincred) {
        Doctors.findOne({Name: logincred.Name}).then(doctor => {
            if(!doctor) {
                res.status(200).json({status: 'FAILURE',message: 'Doctor not found in database', id: null, name: null, phone: null})
            }
            if(doctor.password === logincred.password) {
                res.status(200).json({status: 'SUCCESS', message: 'Logged in', id: doctor._id, name: doctor.Name, phone: doctor.PhoneNumber.toString()})
            } else {
                res.status(200).json({status: 'FAILURE', message: 'Passwords not matched', id: null, name: null, phone: null})
            }

        }).catch(err => console.error(err))
    }
})

module.exports = api;