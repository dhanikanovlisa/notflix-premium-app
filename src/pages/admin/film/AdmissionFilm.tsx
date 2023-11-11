import { useEffect } from "react";
import CardApproval from "../../../components/card/CardApproval";
import Navbar from "../../../components/navbar/Navbar";

function AdmissionFilm() {

    useEffect(() => {
        if(localStorage.getItem("admin") !== "true"){
            window.location.href = "/404"
        }
    })
    return (
        <>
        <Navbar />
        <div className="pt-28 pl-10">
            <CardApproval title="Tes" description="Tes" />
        </div>
      </>
    )
}

export default AdmissionFilm;
