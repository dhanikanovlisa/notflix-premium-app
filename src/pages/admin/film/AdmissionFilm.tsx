import { useEffect } from "react";
import CardApproval from "../../../components/card/CardApproval";
import Navbar from "../../../components/navbar/Navbar";
import { useAuth } from "../../../hooks/useAuth";

function AdmissionFilm() {
    const {isAuth, isAdmin } = useAuth();
    useEffect(() => {
        if(!isAuth() || !isAdmin()){
            window.location.href = "/404"
        }
    })
    return (
        <>
        <Navbar />
        <div className="pt-28 pl-10 pr-28 ">
            <div className="pt-5 flex flex-wrap gap-12 justify-between">
            <CardApproval title="Tes" description="Tes" />
            <CardApproval title="Tes" description="Tes" />
            <CardApproval title="Tes" description="Tes" />
            <CardApproval title="Tes" description="Tes" />
            <CardApproval title="Tes" description="Tes" />
            <CardApproval title="Tes" description="Tes" />
            </div>
        </div>
      </>
    )
}

export default AdmissionFilm;
