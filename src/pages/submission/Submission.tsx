import Card from "../../components/cardSubmission/Card";
import Navbar from "../../components/navbar/Navbar";

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
            <Card 
              image="/src/assets/placeholder-image.webp"
              title="Request 1"
              description="XX:XX:XX XX:XX:XX"
              status={{ status: "Accepted" }}
            />
          </div>
        </div>
      </>
    )
  }
  
  export default Submission;
  