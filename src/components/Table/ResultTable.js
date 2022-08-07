import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowTable from "./RowTable";
import { useDispatch, useSelector } from "react-redux";
import { showing } from "../../redux/actions";

export default function ResultTable() {
  const dispatch = useDispatch();
  const [once, setOnce] = React.useState(0);
  const { result, show, searchword, loading, error } = useSelector(
    (state) => state.data
  );
  const addShowing = () => {
    if (
      document.body.scrollHeight - window.scrollY <=
      window.innerHeight + 10
    ) {
      dispatch(showing());
    }
  };
  let results;
  if (result.results) results = result.results;

  //Scroll event
  if (show === 1 && once === 0) {
    console.log("stat" + once);
    window.addEventListener("scroll", addShowing);
    setOnce(1);
  }
  return (
    <TableContainer component={Paper} style={{ marginBottom: "30px" }}>
      <Table stickyHeader sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Picture</b>
            </TableCell>
            <TableCell align="center">
              <b>Artiste(s)</b>
            </TableCell>
            <TableCell align="center">
              <b>Album</b>
            </TableCell>
            <TableCell align="center">
              <b>Song</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow colSpan={4}>
              <TableCell align="center" colSpan={4}>
                Loading...
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell
                style={{ color: "darkred" }}
                align="center"
                colSpan={4}
              >
                Internal Error, please retry...
              </TableCell>
            </TableRow>
          )}
          {
            //When match result
            result.results &&
              results
                .slice(0, show * 10)
                .map((row, index) => <RowTable row={row} key={index} />)
          }

          {
            //When no result
            result.resultCount === 0 && (
              <TableRow colSpan={4}>
                <TableCell style={{ color: "gray" }} align="center" colSpan={4}>
                  No Result for your query...
                </TableCell>
              </TableRow>
            )
          }

          {
            //Search query is empty
            searchword === "" && (
              <TableRow>
                <TableCell style={{ color: "gray" }} align="center" colSpan={4}>
                  No query, no result...
                </TableCell>
              </TableRow>
            )
          }
          {results?.length != 0 &&
            (show === 20 || show * 10 >= results?.length) && (
              <TableRow>
                <TableCell style={{ color: "gray" }} align="center" colSpan={4}>
                  You have seen all result...
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
