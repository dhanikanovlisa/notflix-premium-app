import { useEffect, useState } from "react";
import CardApproval from "../../../components/card/CardApproval";
import Navbar from "../../../components/navbar/Navbar";
import Loading from "../../../components/loading/Loading";
import { getAPI, putAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import { FilmRequest } from "../../../types/interfaces";

function AdmissionFilm() {
    const {isAuth, isAdmin } = useAuth();
    const [empty, setEmpty] = useState(false);
    const [requestFilms, setRequestFilms] = useState<FilmRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!isAuth() || !isAdmin()){
            window.location.href = "/404"
        }
    })

    useEffect(()=> {
        const intervalId = setInterval(() => {
            fetchRequestFilms();
            console.log("fetching");
        }, 5000);
    
        return () => {clearInterval(intervalId);}
      }, []);
    
      useEffect(() => {
        setEmpty(requestFilms.length === 0);
      }, [requestFilms]);

    const fetchRequestFilms = async () => {
        try {
            const response = await getAPI(`films/requestFilm/status/pending`);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
        
            const data = await response.json();
            if(Array.isArray(data.data)){
                const mappedData = data.data.map((film: FilmRequest) => ({
                    requestFilm_id: film.requestFilm_id,
                    filmName: film.filmName,
                    description: film.description,
                    film_path: film.film_path,
                    film_poster: film.film_poster,
                    film_header: film.film_header,
                    date_release: new Date(film.date_release),
                    duration: film.duration,
                    id_user: film.id_user,
                }));
        
                setRequestFilms(mappedData);
            } else if (typeof data.data === 'object'){
                const mappedData: FilmRequest = data.data;
                setRequestFilms([mappedData]);
            } else {
                console.error("Data is not an array or object:", data.data);
            }
            
            } catch (error) {
                console.error("Error fetching film", error);
            } finally {
                setLoading(false);
            }
    }
    
    const accept = async (obj: object) => {
        console.log(obj)
        const film = obj as FilmRequest;
        console.log(film);
        await putAPI(`films/requestFilm/accept/${film.requestFilm_id}`, {});
        console.log("accept");
        fetchRequestFilms();
    }

    const reject = async (obj: object) => {
        const film = obj as FilmRequest;
        await putAPI(`films/requestFilm/reject/${film.requestFilm_id}`, {});
        console.log("reject");
        fetchRequestFilms();
    }

    function generateRequestFilmCards() {
        return empty ? (
            <>
                <p>Empty Film Submission</p>
            </>
        ) : (
            requestFilms.map((film) => (
                <CardApproval
                    key={film.requestFilm_id}
                    title={film.filmName}
                    description={film.description}
                    obj={film}
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
            <h2>Film Submission</h2>
            <div className="pt-5 flex flex-wrap gap-12 sm:justify-center lg:justify-evenly">
                <>
                    {generateRequestFilmCards()}
                </>
            </div>
        </div>
      </>
    )
}

export default AdmissionFilm;
