import styles from "@/styles/404.module.scss";
import Image from "next/image";

const Custom404 = () => {
        return (
            <div className={styles.error}>
                <Image src="/404.png" alt="404" width={400} height={400}/>
                <div>404 | Halaman Tidak Ditemukan</div>
            </div>
        )
    };
    
    export default Custom404;