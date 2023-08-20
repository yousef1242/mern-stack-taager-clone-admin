import { Button, Modal, Table } from "react-bootstrap";
import classes from "../../styles/showOrderModel.module.css";
import { useEffect } from "react";

const ShowOrder = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={classes.showOrderModelHeader} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            عرض تفاصيل الاوردر
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="text-center">
            <thead>
              <tr>
                <th>صورة المنتج</th>
                <th>اسم المنتج</th>
                <th>عدد القطع</th>
                <th>السعر</th>
                <th>الربح</th>
              </tr>
            </thead>
            <tbody>
                {props.orderInfo?.products?.map((product) => (
                  <tr>
                    <td>
                      <img
                        src={product?.productId?.images[0]}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </td>
                    <td>{product?.productId?.name}</td>
                    <td>{product?.quantaty}</td>
                    <td>{product.productId?.price}</td>
                    <td>
                      {(product.productId?.price * (20 / 100)).toFixed(0)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowOrder;
