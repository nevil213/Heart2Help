import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EligibilityTest from '../components/EligibilityTest'
import SmallEligibilityTest from '../components/SmallEligibilityTest'
import Cookies from "js-cookie"


const Donor = () => {

    const [donors, setDonors] = useState([])

    useEffect(()=>{
        const fetchAllDonor = async () => {
            try{
                const res = await axios.get("http://localhost:8080/donor");
                setDonors(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllDonor();
    }, [])

    const handleDelete = async (id) => {
      try{
        await axios.delete("http://localhost:8080/donor/"+id);
        window.location.reload();
      }catch(err){
        console.log(err);
      }
    }

    const Data = Cookies.get("Data");

  return (
    <div className='center'>
      {!Data && <SmallEligibilityTest/>}
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmpa-OPGCHyX-GPQRrwoR289o79lh94R-ERw&s" alt="" className='h-screen w-screen'/>
    </div>
  )
}

export default Donor



{/* {donors.map((donor)=>(
    <div className="donor" key={donor.Did}>
        {donor.photo && <img src={donor.photo} alt=""/>}
        <h3>Name: {donor.name}</h3> 
        <span>Phone Number: {donor.phone}</span>  <br/>
        <span>Email Id: {donor.email}</span>  <br/>
        <span>Blood Type: {donor.BloodType}</span>  <br/>
        <span>Healthy: {donor.Healthy}</span>  <br/>
        <span>Addicted: {donor.Addicted}</span>  <br/>
        <span>Photo: {donor.photo}</span>  <br/>
        <button className='deletebtn' onClick={()=>handleDelete(donor.Did)}>Delete</button>
    </div>
))} */}