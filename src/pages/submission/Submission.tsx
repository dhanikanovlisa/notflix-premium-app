import Navbar from "../../components/navbar/Navbar";
import CardSubmission from "../../components/card/CardSubmission";

function Submission() {
  function handleCreate(){
    window.location.href = "/create"
  }
  return (
    <>
      <Navbar />
      <div className="pt-32 pl-10 pr-20">
        <div className="flex flex-row justify-between">
          <h3>Request List</h3>
          <button className="button-white text-button font-bold"
          onClick={handleCreate}>Create</button>
        </div>
        <div className="pt-4">
          <CardSubmission
            image="/src/assets/placeholder-image.webp"
            title="Request 1"
            description="XX:XX:XX XX:XX:XX"
            status={{ status: "Accepted" }}
            />
        </div>
      </div>
    </>
  );
}

export default Submission;
