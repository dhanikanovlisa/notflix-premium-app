import Navbar from "../../components/navbar/Navbar";
import CardApproval from "../../components/cardApproval/CardApproval";
import CardSubmission from "../../components/cardSubmission/CardSubmission";
import CardFilm from "../../components/cardFilm/CardFilm";

function Submission() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pl-10 pr-20">
        <div className="flex flex-row justify-between">
          <h3>Request List</h3>
          <button className="button-white text-button font-bold">Create</button>
        </div>
        <div className="pt-4">
          <CardSubmission
            image="/src/assets/placeholder-image.webp"
            title="Request 1"
            description="XX:XX:XX XX:XX:XX"
            status={{ status: "Accepted" }}
          />
          <CardApproval
            title="Request 1"
            description="XX:XX:XX XX:XX:XX"
            onAccept={() => console.log("Accept")}
            onReject={() => console.log("Reject")}
          />
          <CardFilm 
          image="/src/assets/placeholder-image.webp"
          title="Request 1"
          />
        </div>
      </div>
    </>
  );
}

export default Submission;
