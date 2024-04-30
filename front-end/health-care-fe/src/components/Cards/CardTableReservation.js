import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { httpClient } from "utils/httpClient";
import Search from "components/Utils/Search";
import { Pagination } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TextField from "@mui/material/TextField";
// components


function CardTableReservation({ color }) {
  const [reservations, setReservations] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [deleteReservation, setDeleteReservation] = useState(0);
  const [editReservation, setEditReservation] = useState(0);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0.0);
  const [user, setUser] = useState({});
  const history = useHistory();

  const fetchData = async (page, searchString) => {
    searchString = !searchString ? "" : searchString;
    try {
      const rs = await httpClient.get(`v1/reservation/get?page=${page}&searchKey=${searchString}`
        , {
          headers: {
            'Authorization': user.token
          }
        });
      const data = await rs.data;
      setReservations(data.reservations);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
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
    console.log(reservations);
    setPage(value - 1);
  };

  const handleSearch = async (e) => {
    console.log('handle search');
    console.log(page);
    e.preventDefault();
    fetchData(page, searchString);
  }

  const handleDelete = async () => {
    try {
      console.log(`delete reservation: ${deleteReservation}`)
      const rs = await httpClient.post(
        `v1/reservation/del`, { reservationId: deleteReservation },
        {
          headers: {
            'Authorization': user.token
          }
        }
      );
      if (!rs) {
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
      console.log(`edit reservation: ${editReservation}`);
      const rs = await httpClient.post(`v1/reservation/edit`, {
        reservationId: editReservation,
        description: description,
        cost: cost
      },
        {
          headers: {
            'Authorization': user.token
          }
        });
      if (!rs) {
        throw new Error("Edit fail!");
      }
      setOpenResponse(false);
      fetchData(page, searchString);
    } catch (error) {
      console.log(error);
    }
  };


  const handleClick = (reservationId) => {
    setOpenDialog(true);
    setDeleteReservation(reservationId);
  };
  const updateClick = (reservationId,description,cost) => {
    setOpenResponse(true);
    setEditReservation(reservationId);
    setDescription(description);
    setCost(cost);
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
            {"Change Status Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to change status this reservation ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete}>
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openResponse}>
          <DialogTitle>Edit Reservation</DialogTitle>
          <DialogContent>
            <DialogContentText>Response to this reservation</DialogContentText>
            <TextField
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <DialogContentText>Cost</DialogContentText>
            <TextField
              margin="dense"        
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
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
                Reservation Tables
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
                  Patient
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Doctor
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
                  Type
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => {
                return (
                  <tr key={reservation.reservationId}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {reservation.user.email}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reservation.doctor.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reservation.status === 1 ? (
                        <span onClick={() => handleClick(reservation.reservationId)}>
                          <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                          Close
                        </span>
                      ) : (
                        <span onClick={() => handleClick(reservation.reservationId)}>
                          <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
                          On-Going
                        </span>
                      )}


                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reservation.type}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reservation.description}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span onClick={() => updateClick(reservation.reservationId,reservation.description,reservation.cost)}>
                        <SyncAltIcon color="primary" />
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

CardTableReservation.defaultProps = {
  color: "light",
};

CardTableReservation.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTableReservation;
