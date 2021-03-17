import styles from '../styles/components/Profile.module.css';

export default function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/danvb112.png" alt="Daniel Bonasser"/>
            <div>
                <strong>Daniel Bonasser</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}