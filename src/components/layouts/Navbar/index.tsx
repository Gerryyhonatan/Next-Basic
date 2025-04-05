import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";
const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div>Navbar</div>
      <div>
        {data && data.user.fullname}{" "}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
