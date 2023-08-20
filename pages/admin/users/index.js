import Head from "next/head";
import classes from "../../../styles/userAdmin.module.css";
import AdminNavbar from "@/components/adminNavbar/AdminNavbar";
import requestAdmin from "@/lib/requestAdmin";
import * as cookie from "cookie";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProductsAdmin = ({ users }) => {
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState("");
  const { authAdmin } = useSelector((state) => state.authAdmin);

  const deleteUserFunction = async (userId) => {
    const filterProducts = usersData?.filter((user) => user?._id !== userId);
    setUsersData(filterProducts);
    try {
      const { data } = await requestAdmin.delete(
        `/api/users/delete/${userId}`,
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

  const searchByInput = (e) => {
    e.preventDefault();
    const filterData =
      search === ""
        ? usersData
        : usersData?.filter(
            (user) =>
              user.email.toLowerCase().includes(search.toLowerCase()) ||
              user.username.toLowerCase().includes(search.toLowerCase())
          );
    setUsersData(filterData);
  };

  useEffect(() => {
    setUsersData(users);
  }, [users]);

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
                    المستخدمين {`(${usersData?.length})`}
                  </h2>
                </div>
              </div>
              <div style={{ background: "#efefef" }} className="p-4 mb-5">
                <div className="row m-0">
                  <div className="col-12 col-sm-8 mb-sm-0 mb-3">
                    <input
                      type="text"
                      value={search}
                      placeholder="قم بالبحث باستخدام اسم العميل، الايميل "
                      className={classes.searchInput}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-sm-4 d-flex align-items-center justify-content-around">
                    <button
                      onClick={searchByInput}
                      className={classes.searchBtn}
                    >
                      بحث
                    </button>
                    <button
                      onClick={() => {
                        setUsersData(users);
                        setSearch("");
                      }}
                      className={classes.searchBtn}
                      style={{
                        color: "var(--green-color)",
                        background: "#fff",
                        border: "1px solid var(--green-color)",
                      }}
                    >
                      جديد
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${classes.adminTableDiv}`}>
                {usersData?.length > 0 ? (
                  <>
                    <Table size="md">
                      <thead>
                        <tr>
                          <th>الاسم</th>
                          <th>الايميل</th>
                          <th>رقم الموبيل</th>
                          <th>التاريخ</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersData?.map((user) => (
                          <tr key={user._id}>
                            <td style={{ borderBottom: "0px" }}>
                              {user?.username}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {user?.email}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {user?.phoneNumber}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {new Date(user.createdAt).toLocaleString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td style={{ borderBottom: "0px" }}>
                              {user?.email === "admin@gmail.com" ? (
                                ""
                              ) : (
                                <button
                                  onClick={() => deleteUserFunction(user?._id)}
                                  className={classes.adminDeleteproductLink}
                                >
                                  حذف
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
                    لا توجد مستخدمين
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
  const { data } = await requestAdmin.get(`/api/users`, {
    headers: {
      Authorization: "bearer " + jsonCookie?.token,
    },
  });
  return {
    props: {
      users: data,
    },
  };
}
