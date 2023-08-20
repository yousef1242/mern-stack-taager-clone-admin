import AdminNavbar from "@/components/adminNavbar/AdminNavbar";
import classes from "../../../../styles/updateProduct.module.css";
import Head from "next/head";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import requestAdmin from "@/lib/requestAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProduct = () => {
  const { authAdmin } = useSelector((state) => state.authAdmin);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [file, setFile] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [imageLinkarray, setImageLinkArray] = useState([]);
  const [ImageFileArray, setImageFileArray] = useState([]);
  const [sizesArray, setSizesArray] = useState([]);
  const router = useRouter();

  const addImageLink = (e) => {
    if (!imageLink) {
      toast.error("املئ حقل الصورة اللينك");
    } else {
      const file = imageLink;
      setImageLinkArray((prevArray) => [...prevArray, file]);
      setImageLink("");
    }
  };

  const addImageFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFileArray((prevArray) => [...prevArray, file]);
      setFile("");
    }
  };

  const deleteImageLink = (index) => {
    setImageLinkArray(imageLinkarray.filter((_, i) => i !== index));
  };

  const deleteImageFile = (index) => {
    setImageFileArray(ImageFileArray.filter((_, i) => i !== index));
  };

  const addSizeToArray = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSizesArray(selectedOptions);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (name === "") return toast.error("اسم المنتج مطلوب");
    if (category === "") return toast.error("فئة المنتج مطلوبة");
    if (currency === "") return toast.error("عملة المنتج مطلوبة");
    if (country === "") return toast.error("دولة المنتج مطلوبة");
    if (price <= 0) return toast.error("يجب أن يكون السعر أكبر من 0");
    if (descriptionValue === "") return toast.error("وصف المنتج مطلوب");
    if (ImageFileArray.length <= 0 && imageLinkarray.length <= 0)
      return toast.error("الصورة أو رابط الصورة مطلوبة");

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("currency", currency);
    formData.append("description", descriptionValue);
    for (let i = 0; i < ImageFileArray.length; i++) {
      formData.append("file", ImageFileArray[i]);
    }
    for (let i = 0; i < imageLinkarray.length; i++) {
      formData.append("imageUrls", imageLinkarray[i]);
    }
    for (let i = 0; i < sizesArray.length; i++) {
      formData.append("sizes", sizesArray[i]);
    }

    try {
      const { data } = await requestAdmin.put(
        `/api/products/update/${router.query.updateProductId}`,
        formData,
        {
          headers: {
            Authorization: "bearer " + authAdmin?.token,
          },
        }
      );
      toast.success(data.message);
      router.push("/admin/products");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.updateProductId) {
      const getProductData = async () => {
        const { data } = await requestAdmin.get(
          `/api/products/single/${router.query.updateProductId}`
        );
        setProductData(data);
      };
      getProductData();
    }
  }, [router.query.updateProductId]);

  useEffect(() => {
    const getCategoriesData = async () => {
      const { data } = await requestAdmin.get(`/api/categories`);
      setCategoriesData(data);
    };
    getCategoriesData();
  }, []);

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setCountry(productData.country);
      setCurrency(productData.currency);
      setCategory(productData.category);
      setPrice(productData.price);
      setDescriptionValue(productData.description);
      setImageLinkArray(productData.images);
    }
  }, [productData]);
  
  return (
    <>
      <Head>
        <title>Taager-Admin</title>
        <meta name="description" content="biggest marketing website" />
      </Head>
      <AdminNavbar />
      <div className={classes.addProductAdminPage}>
        <div className="row m-0">
          <div className="col-3">
            <AdminSidebar />
          </div>
          <div className={`col-9 ${classes.leftDiv}`}>
            <div className="container">
              <h2
                className="mb-5 fw-bold"
                style={{ color: "var(--text-color)" }}
              >
                تعديل منتج
              </h2>
              <div className="w-100 d-flex justify-content-center">
                <div className={classes.formDiv}>
                  <form onSubmit={submitFormHandler}>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="name">اسم المنتج</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="اسم المنتج"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="price">السعر</label>
                      <input
                        type="text"
                        id="price"
                        placeholder="السعر"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Category">الفئة</label>
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className={classes.selectCategory}
                        id="category"
                      >
                        <option value="" selected disabled>
                          اختر الفئة
                        </option>
                        {categoriesData?.length > 0
                          ? categoriesData?.map((cat) => (
                              <option key={cat?._id} value={cat?.title}>
                                {cat?.title}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="country">الدولة</label>
                      <select
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        className={classes.selectCategory}
                        id="country"
                      >
                        <option value="" selected disabled>
                          اختر الدولة
                        </option>
                        <option value="eg">eg</option>
                        <option value="sa">sa</option>
                        <option value="ae">ae</option>
                      </select>
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="currency">العملة</label>
                      <select
                        onChange={(e) => setCurrency(e.target.value)}
                        value={currency}
                        className={classes.selectCategory}
                        id="currency"
                      >
                        <option value="" selected disabled>
                          اختر العملة
                        </option>
                        <option value="ج.م">ج.م</option>
                        <option value="ر.س">ر.س</option>
                        <option value="د.ا">د.ا</option>
                      </select>
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Description">الوصف</label>
                      {typeof window !== "undefined" && (
                        <ReactQuill
                          theme="snow"
                          value={descriptionValue}
                          onChange={setDescriptionValue}
                        />
                      )}
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="ImageWithLink">الصورة من اللينك</label>
                      <input
                        onChange={(e) => setImageLink(e.target.value)}
                        type="text"
                        id="ImageWithLink"
                        value={imageLink}
                      />
                      <button
                        onClick={addImageLink}
                        type="button"
                        className={classes.addImage}
                      >
                        اضف الصورة
                      </button>
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="Image">الصورة من الجهاز</label>
                      <input
                        value={file}
                        onChange={addImageFile}
                        type="file"
                        id="Image"
                      />
                    </div>
                    <div
                      className={`form-group mb-5 d-flex gap-2 flex-wrap align-items-center`}
                    >
                      {imageLinkarray?.map((image, index) => (
                        <div className="position-relative">
                          <FontAwesomeIcon
                            className={classes.trashicon}
                            onClick={() => deleteImageLink(index)}
                            icon={faTrash}
                          />
                          <img
                            style={{
                              width: "130px",
                              height: "130px",
                              objectFit: "cover",
                            }}
                            src={image}
                            key={index}
                            alt=""
                          />
                        </div>
                      ))}
                      {ImageFileArray?.map((image, index) => (
                        <div className="position-relative">
                          <FontAwesomeIcon
                            onClick={() => deleteImageFile(index)}
                            className={classes.trashicon}
                            icon={faTrash}
                          />
                          <img
                            style={{
                              width: "130px",
                              height: "130px",
                              objectFit: "cover",
                            }}
                            key={index + 1}
                            src={URL.createObjectURL(image)}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                    <div className={`form-group mb-5`}>
                      <label htmlFor="sizes">المقاسات</label>
                      <select
                        multiple
                        onChange={addSizeToArray}
                        className={classes.selectCategory}
                        id="sizes"
                      >
                        <option value="md">md</option>
                        <option value="lg">lg</option>
                        <option value="xl">xl</option>
                        <option value="xxl">xxl</option>
                      </select>
                    </div>
                    <button
                      disabled={loading}
                      className={classes.updateproductBtn}
                    >
                      {loading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "تعديل"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
