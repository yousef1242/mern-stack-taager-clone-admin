import Link from "next/link";
import classes from "../../styles/adminSidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBox,
  faCertificate,
  faClipboard,
  faMoneyBillTransfer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { setAuthAdmin } from "@/redux/authAdminSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const AdminSidebar = () => {
  const router  = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <div className={classes.adminSidebar}>
        <Link className={`${classes.navLinks}`} href={`/admin/products`}>
          <FontAwesomeIcon icon={faClipboard} /> المنتجات
        </Link>
        <Link className={`${classes.navLinks}`} href={`/admin/users`}>
          <FontAwesomeIcon icon={faUser} /> المستخدمين
        </Link>
        <Link className={`${classes.navLinks}`} href={`/admin/orders`}>
          <FontAwesomeIcon icon={faBox} /> الطلبات
        </Link>
        <Link className={`${classes.navLinks}`} href={`/admin/categories`}>
          <FontAwesomeIcon icon={faCertificate} /> فئات
        </Link>
        <Link className={`${classes.navLinks}`} href={`/admin/withdraw`}>
          <FontAwesomeIcon icon={faMoneyBillTransfer} /> السحب
        </Link>
        <span
          onClick={() => {
            dispatch(setAuthAdmin(null));
            Cookies.remove("setLoggedAdmin");
            router.push("/");
          }}
          className={`${classes.navLinks}`}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> تسجيل خروج
        </span>
      </div>
    </>
  );
};

export default AdminSidebar;
