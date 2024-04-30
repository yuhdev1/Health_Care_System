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

// components

function CardTablePost({ color }) {
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deletePost, setDeletePost] = useState(0);
  const [user, setUser] = useState({});
  const history = useHistory();

  const fetchData = async (page, searchString) => {
    searchString = !searchString ? "" : searchString;
    try {
      const rs = await httpClient.get(
        `v1/post/get?page=${page}&searchKey=${searchString}`,{
          headers: {
            'Authorization': user.token
          }
        }
      );
      const data = await rs.data;
      setPosts(data.posts);
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
    console.log(posts);
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
      console.log(`delete feedback: ${deletePost}`);
      const rs = await httpClient.post(`v1/post/delete`, {
        postId: deletePost,
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
                Posts Information
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
                  Thumbnail
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Author
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
                  Category
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Feature
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
              {posts.map((post) => {
                return (
                  <tr key={post.postId}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                       {post.thumbnail}
                    </td>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {post.author?.email}
                      </span>
                    </th>
                    
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {post.title}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {post.category}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {post.feature}
                    </td>


                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span
                        onClick={(e) => {
                          setOpenDialog(true);
                          setDeletePost(post.postId);
                        }}
                      >
                        <DeleteIcon color="primary" />
                      </span>
                      {/* <span
                        onClick={(e) => {
                          setOpenResponse(true);
                          setResponse(post.response)
                          setEditFeedback(post.postId);
                        }}
                      >
                        <EditIcon color="primary" />
                      </span> */}
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

CardTablePost.defaultProps = {
  color: "light",
};

CardTablePost.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTablePost;
