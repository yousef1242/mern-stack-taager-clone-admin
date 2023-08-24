import Head from "next/head";
import classes from "../../../styles/categories.module.css";
import AdminNavbar from "@/components/adminNavbar/AdminNavbar";
import requestAdmin from "@/lib/requestAdmin";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import AddCategoryModel from "@/components/addCategoryModel/AddCategoryModel";

const ProductsAdmin = ({ categories }) => {
  const [categoriesData, setcategoriesData] = useState([]);
  const [search, setSearch] = useState("");
  const { authAdmin } = useSelector((state) => state.authAdmin);
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const deleteCategoryFunction = async (categoryId) => {
    try {
      const { data } = await requestAdmin.delete(
        `/api/categories/delete/${categoryId}`,
        {
          headers: {
            Authorization: "bearer " + authAdmin?.token,
          },
        }
      );
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const searchByInput = (e) => {
    e.preventDefault();
    const filterData =
      search === ""
        ? categoriesData
        : categoriesData?.filter((category) =>
            category.title.toLowerCase().includes(search.toLowerCase())
          );
    setcategoriesData(filterData);
  };

  useEffect(() => {
    setcategoriesData(categories);
  }, [categories]);
  return (
    <>
      <Head>
        <title>Taager-Admin</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <AdminNavbar />
      <div className={classes.categoriesAdminPage}>
        <div className="row m-0">
          <div className="col-3">
            <AdminSidebar />
          </div>
          <div className={`col-9 ${classes.leftDiv}`}>
            <div className="container">
              <div className="align-items-center row m-0 mb-5">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                  <h2 className="fw-bold">
                    الفئات {`(${categoriesData?.length})`}
                  </h2>
                </div>
                <div className="col-12 col-md-6 text-start">
                  <button
                    onClick={() => setAddCategoryModal(true)}
                    className={classes.adminAddCategoryBtn}
                  >
                    اضف فئة
                  </button>
                  <AddCategoryModel
                    show={addCategoryModal}
                    onHide={() => setAddCategoryModal(false)}
                    categoriesData={categoriesData}
                  />
                </div>
              </div>
              <div style={{ background: "#efefef" }} className="p-4 mb-5">
                <div className="row m-0">
                  <div className="col-12 col-sm-8 mb-sm-0 mb-3">
                    <input
                      type="text"
                      value={search}
                      placeholder="قم بالبحث باستخدام اسم الفئة  "
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
                        setcategoriesData(categories);
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
                {categoriesData?.length > 0 ? (
                  <Table size="md">
                    <thead>
                      <tr>
                        <th>اسم الفئة</th>
                        <th>التاريخ</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoriesData?.map((category) => (
                        <tr key={category?._id}>
                          <td style={{ borderBottom: "0px" }}>
                            {category?.title}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            {new Date(category.createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td style={{ borderBottom: "0px" }}>
                            <button
                              onClick={() =>
                                deleteCategoryFunction(category?._id)
                              }
                              className={classes.adminDeleteCategorytBtn}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h4 className="fw-bold text-center w-100">لا توجد فئات</h4>
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

export async function getServerSideProps() {
  const { data } = await requestAdmin.get(`/api/categories`);
  return {
    props: {
      categories: data,
    },
  };
}
