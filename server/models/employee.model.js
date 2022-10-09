const mongoose = require("mongoose");

const EmployeesSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:String,
    gender: String
});

const Employees = mongoose.model('Employees',EmployeesSchema);

module.exports = { Employees };