import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Add = () => {

    const [donor, setDonor] = useState({
        name:"",
        phone:"",
        email:"",
        bloodType:"",
        healthy:null,
        addicted:null,
        photo:""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setDonor(prev=>({...prev, [e.target.name]:e.target.value}));
    }
    
    const handleClick = async e => {
        e.preventDefault();
        try{
              if (donor.name!=="" && donor.phone!=="" && donor.email!=="" && donor.bloodType!=="" && donor.healthy!==null && donor.addicted!==null){
                await axios.post("http://localhost:8080/donor", donor);
                navigate("/");
              }
              else{
                alert("All Fields are mendatory!");
              }
        }catch(err){
            console.log(err);
        }
    }



  return (
    <div>
      <form action="post">
        <input type="text" onChange={handleChange} name="name" placeholder='Enter your Name'/>  <br/>
        <input type="text" onChange={handleChange} name="phone" placeholder='Enter your Phone Number'/>  <br/>
        <input type="text" onChange={handleChange} name="email" placeholder='Enter your Email Id'/>  <br/>
        <input type="text" onChange={handleChange} name="BloodType" placeholder='Enter your Blood Group Type'/>  <br/>
        <input type="text" onChange={handleChange} name="Healthy" placeholder='Do you Have any health issues?'/>  <br/>
        <input type="text" onChange={handleChange} name="Addicted" placeholder='Are you addicted with any substances?'/>  <br/>
        <input type="file" onChange={handleChange} name="photo"/>  <br/>
        <input type="submit" onClick={handleClick} value="Submit" />
      </form>
    </div>
  )
}

export default Add
