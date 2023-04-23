import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { Button } from "antd";
import { Divider } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import bill from "../../../../api/bill";
import numberWithCommas from "../../../util/numberThousandSeparator";
import ReactToPrint from "react-to-print";
import _ from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Bill(props) {
  const componentRef = React.useRef();
  const [data, setData] = useState();
  const [open, setOpen] = React.useState(false);
  const [totalBill, setTotalBill]= React.useState(0)
  useEffect(() => {
    (async () => {
      const result = await bill.getBill(props?.order_request_id);
      return setData(result);
    })();
  }, [props?.order_request_id]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Dialog
        ref={componentRef}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thông tin hóa đơn"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="right">Đơn hàng</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Đơn giá (vnd)</TableCell>
                    <TableCell align="right">Thành tiền (vnd)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, key) => (
                    <TableRow
                      key={row?.cart_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {parseInt(key) + 1}
                      </TableCell>
                      <TableCell align="right">
                        {renderFinalValue(
                          row?.menu_name,
                          row?.banquet_hall_name,
                          null,
                          row?.dish_name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {renderFinalValue(
                          row?.amount_menu,
                          row?.amount_dish,
                          row?.id_user_booking
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(
                          parseInt(
                            renderFinalValue(
                              row?.price,
                              row?.menu_price,
                              row?.dish_price
                            )
                          )
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(
                          parseInt(
                            parseInt(
                              renderFinalValue(
                                row?.amount_menu,
                                row?.amount_dish,
                                row?.id_user_booking
                              )
                            ) *
                              parseInt(
                                renderFinalValue(
                                  row?.price,
                                  row?.menu_price,
                                  row?.dish_price
                                )
                              )
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Divider />
            <div style={{direction: "rtl"}}>Thành tiền: {numberWithCommas(_.sumBy(data, (row)=> parseInt(
                            parseInt(
                              renderFinalValue(
                                row?.amount_menu,
                                row?.amount_dish,
                                row?.id_user_booking
                              )
                            ) *
                              parseInt(
                                renderFinalValue(
                                  row?.price,
                                  row?.menu_price,
                                  row?.dish_price
                                )
                              )
                          )))} VNĐ</div>
            <div style={{ textAlign: "center", fontSize: 13, marginBottom: 8 }}>
              Phương thức thanh toán: Tiền mặt
            </div>
            <div style={{ textAlign: "center", fontSize: 13, marginBottom: 8 }}>
              Mã giao dịch: {props?.order_request_id}
            </div>
            <div style={{ textAlign: "center", fontSize: 13, marginBottom: 8 }}>
              Cảm ơn! Hẹn gặp quý khách lần sau
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Button
        style={{ marginLeft: 10 }}
        type={"primary"}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Xem hóa đơn
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thông tin hóa đơn"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="right">Đơn hàng</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Đơn giá (vnd)</TableCell>
                    <TableCell align="right">Thành tiền (vnd)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, key) => (
                    <TableRow
                      key={row?.cart_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {parseInt(key) + 1}
                      </TableCell>
                      <TableCell align="right">
                        {renderFinalValue(
                          row?.menu_name,
                          row?.banquet_hall_name,
                          null,
                          row?.dish_name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {renderFinalValue(
                          row?.amount_menu,
                          row?.amount_dish,
                          row?.id_user_booking
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(
                          parseInt(
                            renderFinalValue(
                              row?.price,
                              row?.menu_price,
                              row?.dish_price
                            )
                          )
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(
                          parseInt(
                            parseInt(
                              renderFinalValue(
                                row?.amount_menu,
                                row?.amount_dish,
                                row?.id_user_booking
                              )
                            ) *
                              parseInt(
                                renderFinalValue(
                                  row?.price,
                                  row?.menu_price,
                                  row?.dish_price
                                )
                              )
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Divider />
            <div style={{direction: "rtl"}}>Thành tiền: {numberWithCommas(_.sumBy(data, (row)=> parseInt(
                            parseInt(
                              renderFinalValue(
                                row?.amount_menu,
                                row?.amount_dish,
                                row?.id_user_booking
                              )
                            ) *
                              parseInt(
                                renderFinalValue(
                                  row?.price,
                                  row?.menu_price,
                                  row?.dish_price
                                )
                              )
                          )))} VNĐ</div>
            <div style={{ textAlign: "center", fontSize: 13, marginBottom: 8 }}>
              Phương thức thanh toán: Tiền mặt
            </div>
            <div style={{ textAlign: "center", fontSize: 13, marginBottom: 8 }}>
              Mã giao dịch: {props?.order_request_id}
            </div>
            <div style={{ textAlign: "center", fontSize: 13, marginBottom: 8 }}>
              Cảm ơn! Hẹn gặp quý khách lần sau
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ReactToPrint
            trigger={() => (
              <Button type={"primary"} onClick={handleClose}>
                In hóa đơn
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>

      
    </div>
  );
}

const renderFinalValue = (a, b, c, d) => {
  if (a) {
    return a;
  } else if (b) {
    return b;
  } else if (c) {
    return parseInt(c) || 1;
  } else if (d) {
    return d;
  }
};
