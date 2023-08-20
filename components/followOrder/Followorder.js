import { Modal } from "react-bootstrap";
import classes from "../../styles/followOrder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import requestAdmin from "@/lib/requestAdmin";
import { toast } from "react-hot-toast";

const FollowOrder = (props) => {
  const { authAdmin } = useSelector((state) => state.authAdmin);

  const updateOrderStatusFunction = async (orderStatus) => {
    try {
      await requestAdmin.put(
        `/api/orders/update/status/${props.orderInfo?._id}`,
        {
          status: orderStatus,
        },
        {
          headers: {
            Authorization: "bearer " + authAdmin?.token,
          },
        }
      );
      toast.success("تم تعديل الطلب");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={classes.followOrderModelHeader} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            تتبع طلبك
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-content-center">
            <div className="child">
              <div className="mb-5">تم استلام الطلب</div>
              {props.orderCancel ? (
                <div className="mb-5">تم الغاء الطلب</div>
              ) : (
                <>
                  {props.orderStatus === "تم تأكيد الطلب" ||
                  props.orderStatus === "في انتظار شركة الشحن" ||
                  props.orderStatus === "التوصيل قيد التقدم" ||
                  props.orderStatus === "تم التوصيل" ? (
                    <div className="mb-5">تم تأكيد الطلب</div>
                  ) : (
                    <div
                      onClick={() =>
                        updateOrderStatusFunction("تم تأكيد الطلب")
                      }
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      className="mb-5"
                    >
                      {" "}
                      تأكيد الطلب
                    </div>
                  )}
                  {props.orderStatus === "في انتظار شركة الشحن" ||
                  props.orderStatus === "التوصيل قيد التقدم" ||
                  props.orderStatus === "تم التوصيل" ? (
                    <div className="mb-5">في انتظار شركة الشحن</div>
                  ) : (
                    <div
                      onClick={() =>
                        updateOrderStatusFunction("في انتظار شركة الشحن")
                      }
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      className="mb-5"
                    >
                      {" "}
                      انتظار شركة الشحن
                    </div>
                  )}
                  {props.orderStatus === "التوصيل قيد التقدم" ||
                  props.orderStatus === "تم التوصيل" ? (
                    <div className="mb-5">التوصيل قيد التقدم</div>
                  ) : (
                    <div
                      onClick={() =>
                        updateOrderStatusFunction("التوصيل قيد التقدم")
                      }
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      className="mb-5"
                    >
                      {" "}
                      التوصيل قيد التقدم
                    </div>
                  )}
                  {props.orderStatus === "تم التوصيل" ? (
                    <div className="mb-5">تم التوصيل</div>
                  ) : (
                    <div
                      onClick={async () => {
                        updateOrderStatusFunction("تم التوصيل");
                        try {
                          const { data } = await requestAdmin.put(
                            `/api/users/send/balance/${props.orderInfo.userId}`,
                            {
                              country : props.orderInfo.orderTo,
                              balance : props.orderInfo.totalProfit,
                            },
                            {
                              headers: {
                                Authorization: "bearer " + authAdmin?.token,
                              },
                            }
                          );
                          toast.success(data.message);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      className="mb-5"
                    >
                      تم التوصيل
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="child position-relative">
              {props.orderCancel ? (
                <div className="flex-column d-flex align-items-center">
                  <div className={classes.lineStatusCancelOrder}></div>
                  <div
                    className={`${classes.statusDiv} mb-5`}
                    style={{ background: "var(--green-color)" }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} mb-5`}
                    style={{ background: "red" }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              ) : (
                <div className="flex-column d-flex align-items-center">
                  <div className={classes.lineStatusNotCancelOrder}></div>
                  <div
                    className={`${classes.statusDiv} ${classes.greenBg} mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "تم تأكيد الطلب" ||
                      props.orderStatus === "في انتظار شركة الشحن" ||
                      props.orderStatus === "التوصيل قيد التقدم" ||
                      props.orderStatus === "تم التوصيل"
                        ? classes.greenBg
                        : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "في انتظار شركة الشحن" ||
                      props.orderStatus === "التوصيل قيد التقدم" ||
                      props.orderStatus === "تم التوصيل"
                        ? classes.greenBg
                        : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "التوصيل قيد التقدم" ||
                      props.orderStatus === "تم التوصيل"
                        ? classes.greenBg
                        : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div
                    className={`${classes.statusDiv} ${
                      props.orderStatus === "تم التوصيل" ? classes.greenBg : ""
                    } mb-5`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FollowOrder;
