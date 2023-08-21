import Head from "next/head";
import classes from "../../../styles/userAdmin.module.css";
import AdminNavbar from "@/components/adminNavbar/AdminNavbar";
import requestAdmin from "@/lib/requestAdmin";
import * as cookie from "cookie";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProductsAdmin = ({ withdraw }) => {
  const [withdrawData, setWithdrawData] = useState([]);
  const { authAdmin } = useSelector((state) => state.authAdmin);

  const sendMoneyFunction = async (withdrawId) => {
    const updatedWithdraw = withdrawData?.map((withdraw) => {
        if (withdraw._id === withdrawId) {
          return { ...withdraw, isSend: true };
        }
        return withdraw;
      });
  
      setWithdrawData(updatedWithdraw);
    try {
      const { data } = await requestAdmin.put(
        `/api/withdraw/send/money/${withdrawId}`,{},
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
  };

  useEffect(() => {
    setWithdrawData(withdraw);
  }, [withdraw]);

  return (
    <>
      <Head>
        <title>Taager-Admin</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <AdminNavbar />
      <div className={classes.usersAdminPage}>
        <div className="row m-0">
          <div className="col-3">
            <AdminSidebar />
          </div>
          <div className={`col-9 ${classes.leftDiv}`}>
            <div className="container">
              <div className="align-items-center row m-0 mb-5">
                <div>
                  <h2 className="fw-bold">
                    السحب {`(${withdraw?.length})`}
                  </h2>
                </div>
              </div>
              <div className={`${classes.adminTableDiv}`}>
                {withdrawData?.length > 0 ? (
                  <>
                    <Table size="md">
                      <thead>
                        <tr>
                          <th>الاسم</th>
                          <th>العدد</th>
                          <th>العملة</th>
                          <th>بايبال اكونت</th>
                          <th>التاريخ</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawData?.map((withdraw) => (
                          <tr key={withdraw?._id}>
                            <td style={{ borderBottom: "0px" }}>
                              {withdraw?.userId?.username}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {withdraw?.amount}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {withdraw?.countryCurruncy}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {withdraw?.paypalAccount}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {new Date(withdraw.createdAt).toLocaleString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {withdraw?.isSend ? (
                                "تم الارسال"
                              ) : (
                                <button
                                  onClick={() => sendMoneyFunction(withdraw?._id)}
                                  className={classes.adminDeleteproductLink}
                                >
                                  ارسال
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <h4 className="fw-bold text-center w-100">
                    لا توجد طلبات سحب
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsAdmin;

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const jsonCookie = JSON.parse(parsedCookies.setLoggedAdmin);
  const { data } = await requestAdmin.get(`/api/withdraw`, {
    headers: {
      Authorization: "bearer " + jsonCookie?.token,
    },
  });
  return {
    props: {
      withdraw: data,
    },
  };
}
