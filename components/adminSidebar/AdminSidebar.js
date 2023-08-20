import Link from "next/link";
import classes from "../../styles/adminSidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCertificate,
  faClipboard,
  faMoneyBillTransfer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
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
      </div>
    </>
  );
};

export default AdminSidebar;
