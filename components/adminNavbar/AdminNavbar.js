import classes from '../../styles/adminNavbar.module.css';
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar expand="md" className="bg-white position-fixed w-100">
        <Container>
          <Link href="/admin/products" className={classes.adminNavbarBrand}>Taager-Admin</Link>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
