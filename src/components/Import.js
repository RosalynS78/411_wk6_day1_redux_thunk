import React, { useState } from "react";

import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  MenuItem,
  Menu,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Import = (props) => {

  console.log(props);
  // *pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [makes] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, makes.length - page * rowsPerPage);

  const [anchorEl, setAnchorEl] = React.useState(null);

  // *menu actions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [deleteMakes] = useState(null);

  const handleDeletes = (index) => {
    props.deleteMakes(deleteMakes, index);
    setAnchorEl(null);
  };

  return (
    <Container>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={props.fetchMakes}>
        Import
      </Button>

      <h2> Count: {props.makes.length}</h2>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {props.makes.map((row, i) => ( */}
            {props.makes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>{row.MakeId}</TableCell>
                  <TableCell>{row.MakeName}</TableCell>
                  <TableCell>
                    <MoreVertIcon onClick={handleClick} />

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      // menu style no box shadow  
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          border: "solid 1px gray"
                        }
                      }}
                    >
                      <MenuItem onClick={handleDeletes}>Delete</MenuItem>
                      <MenuItem onClick={handleClose}>Close</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 1 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* pagination */}
        <TablePagination
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          // this got the page numbers working
          count={props.makes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Import;
