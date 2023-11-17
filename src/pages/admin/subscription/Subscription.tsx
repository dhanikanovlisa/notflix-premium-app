import CardApproval from "../../../components/card/CardApproval";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/loading/Loading";
import { Subscriber } from "../../../types/interfaces";
import { getAPI, putAPI } from "../../../utils/api";

function Subscription() {
  const {isAuth, isAdmin } = useAuth();
  const [empty, setEmpty] = useState(false);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if(!isAuth() || !isAdmin()){
          window.location.href = "/404"
      }
  })

  useEffect(()=> {
      const intervalId = setInterval(() => {
        fetchSubs();
        console.log("fetching");
      }, 5000);
  
      return () => {clearInterval(intervalId);}
    }, []);
  
    useEffect(() => {
      setEmpty(subs.length === 0);
    }, [subs]);

  const fetchSubs = async () => {
      try {
          const response = await getAPI(`subscriptions/pending`);
          if (!response.ok) {
              throw new Error("Something went wrong");
          }
      
          const data = await response.json();
          if(Array.isArray(data.data)){
            const mappedData = data.data.map((sub: Subscriber) => ({
              creator_id: sub.creator_id,
              subscriber_id: sub.subscriber_id,
              status: sub.status,
              username: 'x'
            }));

            setSubs(mappedData);
          } else if (typeof data.data === 'object'){
              const mappedData: Subscriber = data.data;
              setSubs([mappedData]);
          } else {
              console.error("Data is not an array or object:", data.data);
          }
          
          } catch (error) {
              console.error("Error fetching subscriber", error);
          } finally {
              setLoading(false);
          }
  }
  
  const accept = async (obj: object) => {
      console.log(obj)
      const sub = obj as Subscriber;
      await putAPI(`subscriptions/accept/${sub.creator_id}`, {});
      console.log("accept");
      fetchSubs();
  }

  const reject = async (obj: object) => {
      const sub = obj as Subscriber;
      await putAPI(`subscriptions/reject/${sub.creator_id}`, {});
      console.log("reject");
      fetchSubs();
  }

  function generateRequestSubscription() {
      return empty ? (
          <>
              <p>Empty Subscription Request</p>
          </>
      ) : (
          subs.map((sub) => (
              <CardApproval
                  key={sub.subscriber_id}
                  title={`UserID: ${sub.creator_id}`}
                  description={"Pending"}
                  obj={sub}
                  onAccept={accept}
                  onReject={reject}
              />
          ))
      );
  }

  return (
      <>
      <Navbar />
      <div className="pt-28 pl-10 pr-28 my-12">
          {loading && <Loading />}
          <h2>Subscription Request</h2>
          <div className="pt-5 flex flex-wrap gap-12 sm:justify-center lg:justify-evenly">
              <>
                  {generateRequestSubscription()}
              </>
          </div>
      </div>
    </>
  )
}

export default Subscription;
