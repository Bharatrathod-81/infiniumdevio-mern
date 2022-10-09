const express = require('express');
const { Employees } = require('../models/employee.model');
const router = express.Router();


router.route('/')
.get(async(req,res) => {
    try{
        const employeesList = await Employees.find({});
        res.status(200).json({success:true,employeesList})
    }catch(err){
        res.status(500).json({succes:false,
            massage:'Unable to get employees data',
            ErrorMassage:err.massage
        })
    }
})

.post(async(req,res) => {
    try{
        const employee = req.body;
        const newEmployee = new Employees(employee);
        const savedEmployee = await newEmployee.save();
        res.status(200).json({success:true,newEmployee})
    }catch(err){
        res.status(500).json({success:false,
            massage:'Unable to add employee',
            ErrorMassage:err.massage
        })
    }
})


router.route('/:id')
.post(async(req,res) => {
    try{
        const { id } = req.params;
        const employee = req.body;
        await Employees.updateOne({_id:id},{
            $set: {
                ...employee
            }
        })
        const updateEmployee = await Employees.find({_id:id})
        res.status(200).json({success:true,updateEmployee})
    }catch(err){
        res.status(500).json({success:false,
            massage:'Unable to update employee',
            ErrorMassage:err.massage
        })
    }
})


.delete(async(req,res) => {
    try{
        const { id } = req.params;
        console.log(id);
        const  removeEmployee = await Employees.findByIdAndDelete({_id:id})
        res.status(200).json({success:true, removeEmployee})
    }catch(err){
        res.status(500).json({success:false,
            massage:'Unable to delete employee',
            ErrorMassage:err.massage
        })
    }
})



module.exports = router