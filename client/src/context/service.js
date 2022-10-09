const { default: axios } = require("axios");

const GetFunc = async(dispatch) => {
    try{
        const {data} = await axios.get('https://employees-list0.herokuapp.com/employees');
        dispatch(data.employeesList);
    }catch(err){
        console.log(err);
    }
};

const EditFunc = async(id,newData,dispatch) => {
    try{
        const {data} = await axios.post(`https://employees-list0.herokuapp.com/employees/${id}`,newData);
        GetFunc(dispatch)
    }catch(err){
        console.log(err);
    }
};

const AddFunc = async(newData,dispatch) => {
    try{
        const {data} = await axios.post('https://employees-list0.herokuapp.com/employees',newData)
        GetFunc(dispatch)
    }catch(err){
        console.log(err);
    }
};

const DeleteFunc = async(id,dispatch) => {
    try{
        const {data} = await axios.delete(`https://employees-list0.herokuapp.com/employees/${id}`)
        GetFunc(dispatch)
    }catch(err){
        console.log(err);
    }
};

export {GetFunc,AddFunc,EditFunc,DeleteFunc};