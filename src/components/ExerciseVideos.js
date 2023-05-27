import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import Loader from './Loader';

function ExerciseVideos({ exerciseVideos, name }) {

  console.log(exerciseVideos);  
  if(!exerciseVideos.length) return <Loader />
  return (
    <Box sx={{ marginTop: { lg: "70px", xs: "40px" }, p: "20px" }}>
      <Typography variant="h4" mb="33px" color="white">
        Watch{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          {name}
        </span>{" "}
        exercise videos
      </Typography>
      <Stack
        justifycontent="flex-start"
        flexWrap="wrap"
        alignitems="center"
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "100px", xs: "70px" } }}>
          {exerciseVideos?.slice(0,3).map((item, index)=>(
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer" >
                <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                <Box>
                  <Typography variant="h6" color="white">
                    {item.video.title}
                  </Typography>
                  <Typography variant="h6" color="white">
                    {item.video.channelName}
                  </Typography>
                </Box>
            </a>
          ))}
        </Stack>
    </Box>
  );
}

export default ExerciseVideos;
