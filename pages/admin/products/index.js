import Head from "next/head";
import classes from "../../../styles/productsAdmin.module.css";
import AdminNavbar from "@/components/adminNavbar/AdminNavbar";
import requestAdmin from "@/lib/requestAdmin";
import * as cookie from "cookie";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProductsAdmin = ({ products }) => {
  const [productsData, setProductsData] = useState([]);
  const [search, setSearch] = useState("");
  const { authAdmin } = useSelector((state) => state.authAdmin);

  const deleteProductFunction = async (productId) => {
    try {
      const { data } = await requestAdmin.delete(
        `/api/products/delete/${productId}`,
        {
          headers: {
            Authorization: "bearer " + authAdmin?.token,
          },
        }
      );

      toast.success(data.message);
      const filterProducts = productsData?.filter((product) => 
      product?._id.toString() !== productId
    );
    setProductsData(filterProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const searchByInput = (e) => {
    e.preventDefault();
    const filterData =
      search === ""
        ? productsData
        : productsData?.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
    setProductsData(filterData);
  };

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <Head>
        <title>Taager-Admin</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <AdminNavbar />
      <div className={classes.productsAdminPage}>
        <div className="row m-0">
          <div className="col-3">
            <AdminSidebar />
          </div>
          <div className={`col-9 ${classes.leftDiv}`}>
            <div className="container">
              <div className="align-items-center row m-0 mb-5">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  <h2 className="fw-bold">
                    المنتجات {`(${productsData.length})`}
                  </h2>
                </div>
                <div className="col-12 col-md-6 text-start">
                  <Link
                    className={classes.adminAddproductLink}
                    href={`/admin/products/add-product`}
                  >
                    اضف منتج
                  </Link>
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
                        setProductsData(products);
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
                {productsData?.length > 0 ? (
                  <Table size="md">
                    <thead>
                      <tr>
                        <th>اسم المنتج</th>
                        <th>السعر</th>
                        <th>الدولة</th>
                        <th>الفئة</th>
                        <th>العملة</th>
                        <th>المقاسات</th>
                        <th>الربح</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData?.map((product) => (
                        <tr key={product?._id}>
                          <td style={{ borderBottom: "0px" }}>
                            {product?.name}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            {product?.price}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            {product?.country}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            {product?.category}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            {product?.currency}
                          </td>
                          <td
                            style={{ borderBottom: "0px" }}
                            className="d-flex flex-wrap gap-2 align-items-center"
                          >
                            {product?.sizes?.length > 0
                              ? product?.sizes?.map((size) => (
                                  <span>{size}</span>
                                ))
                              : "لا توجد مقاسات"}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            {(product?.price * (20 / 100)).toFixed(0)}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            <Link
                              href={`/admin/products/update/${product?._id}`}
                              className={`${classes.adminUpdateproductLink} btn`}
                            >
                              تعديل
                            </Link>
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            <button
                              onClick={() =>
                                deleteProductFunction(product?._id)
                              }
                              className={classes.adminDeleteproductLink}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h4 className="fw-bold text-center w-100">لا توجد منتجات</h4>
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
  const { data } = await requestAdmin.get(`/api/products`, {
    headers: {
      Authorization: "bearer " + jsonCookie?.token,
    },
  });
  return {
    props: {
      products: data,
    },
  };
}
