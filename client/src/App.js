import {useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewsList,setMovieList] = useState([]);

  useEffect(()=>{getReview()},[]);

  const getReview = async () => {
    const response = await Axios.get('http://localhost:3001/peliculas/');
      if(response.status = 200) setMovieList(response.data);
  }

  const  submitReview = async ()=>{
   try {
    const response = await Axios.post("http://localhost:3001/peliculas/insert",{
      movie_name: movieName, 
      movie_review: review,
    })
    if(response.status == 200) {
      console.log("dato insertado");
      getReview();
    }
    //setMovieList([...movieReviewsList,{movie_name: movieName,movie_review: review}]);
   } catch (error) {
     console.log(error.message);
   }
  }

  const  updateReview = async (id)=>{
    try {
     const response = await Axios.put("http://localhost:3001/peliculas/update",{
       id: id,
       movie_name: movieName, 
       movie_review: review,
     })
     if(response.status == 200){
       console.log("dato actualizado");
      setMovieList(movieReviewsList.map((val)=>{
        return val.id == id
        ?{
          id: id,
          movie_name: movieName, 
          movie_review: review,
        }: val;
      })); 
      } 

    } catch (error) {
      console.log(error.message);
    }
   }

  const deleteReview = async (id)=>{
    const result = await Axios.delete(`http://localhost:3001/peliculas/delete/${id}`);
    if(result.status == 200){
      console.log("dato eliminado correctamente");
      setMovieList(movieReviewsList.filter((item)=>{
        return item.id != id;
      }));
    }
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
     <div className='form'>

       <label>Movie Name:</label>
     <input type="text" name="moviename" onChange={(e)=>setMovieName(e.target.value)}/>
     
     <label>Review:</label>
      <input type="text" name="reviw" onChange={(e)=>setReview(e.target.value)}/>

      <button onClick={()=>{submitReview()}}>Submitxd</button>
     </div>

    {movieReviewsList.map((item)=>{
      return <div className='card' key={item.id}>
              <h1>{item.movie_name}</h1> 
              <span>{item.movie_review}</span>
                <button onClick={()=>deleteReview(item.id)}>Delete</button>
                <input type='text' id='updateInput'></input>
                <button onClick={()=>updateReview(item.id)}>Update</button>
             </div>
    })}

    </div>
  );
}

export default App;
