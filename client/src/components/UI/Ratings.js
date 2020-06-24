import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";

export default function SimpleRating({ pid }) {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    //Get all ratings for product
    axios.get("http://localhost:5000/api/rating/get_one/" + pid).then((res) => {
      let initalRating = 0;
      if (res.data) {
        res.data.map((rating) => {
          if (rating) {
            initalRating = initalRating + rating.value;
          }
        });
        let finalRating = Math.round(initalRating / res.data.length);
        setValue(parseInt(finalRating));
      }
    });
  });

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={value} readOnly />
      </Box>
    </div>
  );
}

export function UserRating({ cusId, id }) {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    //Get rating
    axios
      .get("http://localhost:5000/api/rating/get_one/" + cusId + "/" + id)
      .then((res) => {
        if (res.data[0]) setValue(res.data[0].value);
      });
  });

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Add you rating!</Typography>
        <Rating
          color="blue"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            const rating = {
              user_id: cusId,
              product_id: id,
              value: event.target.value,
            };
            //Set rating
            console.log(`CID: ${cusId} PID: ${id}`);

            axios
              .post("http://localhost:5000/api/rating/add", rating)
              .then((res) => {
                if (res.data.success) {
                  console.log(res.data);
                }
              });
          }}
        />
      </Box>
    </div>
  );
}
