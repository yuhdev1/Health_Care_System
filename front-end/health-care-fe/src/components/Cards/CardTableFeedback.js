import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { httpClient } from "utils/httpClient";
import Search from "components/Utils/Search";
import { Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";

// components

function CardTableFeedback({ color }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteFeedback, setDeleteFeedback] = useState(0);
  const [openResponse, setOpenResponse] = useState(false);
  const [editFeedback, setEditFeedback] = useState("");
  const [response, setResponse] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();

  const fetchData = async (page, searchString) => {
    searchString = !searchString ? "" : searchString;
    try {
      const rs = await httpClient.get(
        `v1/feedback/get?page=${page}&searchKey=${searchString}`,{
          headers: {
            'Authorization': user.token
          }
        }
      );
      const data = await rs.data;
      setFeedbacks(data.feedbacks);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if(!user) {
      history.push("/");
    }
    setUser(user);
  }, []);
  
  useEffect(() => {
    if (user.token) {
      console.log(`feedback user: ${user.email}, token: ${user.token}`);
      fetchData(0, searchString);
    }
  }, [user]);

  const handlePageClick = async (event, value) => {
    fetchData(value - 1, searchString);
    console.log(feedbacks);
    setPage(value - 1);
  };

  const handleSearch = async (e) => {
    console.log("handle search");
    console.log(page);
    e.preventDefault();
    fetchData(page, searchString);
  };

  const handleDelete = async () => {
    try {
      console.log(`delete feedback: ${deleteFeedback}`);
      const rs = await httpClient.post(`v1/feedback/delete`, {
        feedbackId: editFeedback,
      },
      {
        headers: {
          'Authorization': user.token
        }});
      if(!rs) {
        throw new Error("Delete fail!");
      }
      fetchData(page, searchString);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      console.log(`edit feedback: ${editFeedback}`);
      const rs = await httpClient.post(`v1/feedback/edit`, {
        feedbackId: editFeedback,
        response: response,
      },
      {
        headers: {
          'Authorization': user.token
        }});
      if(!rs) {
        throw new Error("Edit fail!");
      }
      setOpenResponse(false);
      fetchData(page, searchString);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to delete this feedback ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openResponse}>
          <DialogTitle>Response</DialogTitle>
          <DialogContent>
            <DialogContentText>Response to this feedback</DialogContentText>
            <TextField
              margin="dense"
              id="name"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setResponse(e.target.value)}
              value={response}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={(e) => setOpenResponse(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Send</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Feedback Tables
              </h3>
            </div>
            <Search handler={handleSearch} setSearchString={setSearchString} />
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Feedback User
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Full Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Title
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Content
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Created Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Response
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => {
                return (
                  <tr key={feedback.feedbackId}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {feedback.user?.email}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {feedback.fullName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {feedback.title}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {feedback.content}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {feedback.createdDate}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {feedback.response}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {feedback.responser ? "Closed" : "Open"}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span
                        onClick={(e) => {
                          setOpenDialog(true);
                          setDeleteFeedback(feedback.feedbackId);
                        }}
                      >
                        <DeleteIcon color="primary" />
                      </span>
                      <span
                        onClick={(e) => {
                          setOpenResponse(true);
                          setResponse(feedback.response)
                          setEditFeedback(feedback.feedbackId);
                        }}
                      >
                        <EditIcon color="primary" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        count={totalPage}
        color="primary"
        onChange={handlePageClick}
      />
    </>
  );
}

CardTableFeedback.defaultProps = {
  color: "light",
};

CardTableFeedback.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTableFeedback;
