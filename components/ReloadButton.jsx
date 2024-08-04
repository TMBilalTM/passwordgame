import Image from 'next/image';
import styles from "./ReloadButton.module.css";


function Reload({onClick, reloadsLeft, hidden}) {

    if(!hidden && (reloadsLeft===undefined || reloadsLeft))
    {
        return ( 
            <div onClick={onClick} className={styles.reload_button}>
                <Image 
                    width="24" 
                    height="24" 
                    src="/reload.png" 
                    alt="reload"
                    className={styles.reload_img}
                />
                <span className={styles.reloads_left}>x{reloadsLeft}</span>
            </div>
        );
    }
    
}

export default Reload;