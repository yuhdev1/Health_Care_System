
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { httpClient } from "utils/httpClient";


// components

export default function CardNewPost() {
  const [feature, setFeature] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if(!user) {
      history.push("/");
    }
   });
  

  const handleChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleRoomChange = (event) => {
    setFeature(event.target.value);
  };
  const handleTypeChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddReservation = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      console.log(`add :`);
      const rs = await httpClient.post(`v1/post/add`, {
        postDto: {
          category,feature,
        title
        }, author: {
          email: author
        }},{
          headers: {
          Authorization: user.token,
        }
      } 
        
      );
      if(!rs) {
        throw new Error("Add post failed!")
      }
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reservation added!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-title">
            Reservation have been sent!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">New Post</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              category="button"
              onClick={handleAddReservation}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">

              <div className="w-full lg:w-7/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    author
                  </label>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label">Author</InputLabel>
                    <Select
                      className="placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={author}
                      label="author"
                      onChange={handleChange}
                    >
                      <MenuItem value={"caohai@gmail.com"}>Cao Thanh Hai</MenuItem>
                      <MenuItem value={"caohai2@gmail.com"}>Vu Quang Huy</MenuItem>
                      <MenuItem value={"caohai3@gmail.com"}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Category
                  </label>
                  <FormControl fullWidth>
                    <InputLabel
                    >Category</InputLabel>
                    <Select
                      className="placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={category}
                      label="category"
                      onChange={handleTypeChange}
                    >
                      <MenuItem value={"Xương Khớp"}>Xương Khớp</MenuItem>
                      <MenuItem value={"Tiêu Hóa"}>Tiêu Hóa</MenuItem>
                      <MenuItem value={"Máu"}>Máu</MenuItem>
                      <MenuItem value={"Sinh đẻ"}>Sinh đẻ</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    feature
                  </label>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label">Feature</InputLabel>
                    <Select
                      className="placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={feature}
                      label="feature"
                      onChange={handleRoomChange}
                    >
                      <MenuItem value={"Fea1"}>Fea1</MenuItem>
                      <MenuItem value={"Fea2"}>Fea2</MenuItem>
                      <MenuItem value={"Fea3"}>Fea3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              title
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <textarea
                    category="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                   
                    rows="4"
                    onChange={(e) => setTitle(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
