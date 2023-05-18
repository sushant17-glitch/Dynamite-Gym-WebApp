import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, fetchData, youtubeOtions } from '../utils/fetchData';
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

import Navbar from '../components/Navbar';



function ExerciseDetail() {

  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState({});
  const [targetMuscleExercises, setTargetMuscleExercises] = useState({});
  const [equipmentExercises, setEquipmentExercises] = useState({});
  const { id } = useParams();

  useEffect(() =>{
     const fetchExercisesData = async () => {
          const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
          const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
          const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
          setExerciseDetail(exerciseDetailData);

          const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOtions)
          setExerciseVideos(exerciseVideosData.contents);   
          
          const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);

          const equipmentExerciseData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
          setTargetMuscleExercises(targetMuscleExerciseData);
          setEquipmentExercises(equipmentExerciseData);
        }
     fetchExercisesData()
  }, [id]);

  return (
     <Box>
      <Navbar />
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name ={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
     </Box>
  )
}

export default ExerciseDetail