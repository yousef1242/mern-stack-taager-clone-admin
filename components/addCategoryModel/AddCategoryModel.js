import { Modal, Spinner } from "react-bootstrap";
import classes from "../../styles/addCategoryModel.module.css";
import { toast } from "react-hot-toast";
import requestAdmin from "@/lib/requestAdmin";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddCategoryModel = (props) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { authAdmin } = useSelector((state) => state.authAdmin);

  const addCategoryFunction = async (e) => {
    e.preventDefault();
    if (title === "") {
      return toast.error("املئ الحقل");
    }
    setLoading(true);
    try {
      const { data } = await requestAdmin.post(
        `/api/categories/create`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: "bearer " + authAdmin?.token,
          },
        }
      );
      toast.success(data.message);
      setLoading(false);
      props.categoriesData.push(data.saveCategory);
      props.onHide();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
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
        <Modal.Header closeButton className={classes.addCategoryModelHeader}>
          <Modal.Title id="contained-modal-title-vcenter">اضف فئة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addCategoryFunction}>
            <div className={classes.formGroup}>
              <label htmlFor="title">اسم الفئة</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                placeholder="ملابس..."
              />
            </div>
            <button disabled={loading} className={classes.addCategoryBtn}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "اضف"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategoryModel;
