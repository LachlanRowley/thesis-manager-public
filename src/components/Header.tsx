import styles from  './Header.module.css'

export default function Header()	{
	return	(
		<div className={styles.Header}>
			<div id="Header_Logo"></div>

			<div className={styles.headerLink} id="a1"><a>ALL PROJECTS</a></div>
			<div className={styles.headerLink} id="a2"><a>PROJECT SELECTION</a></div>
			<div className={styles.headerLink} id="a3"><a>PRESENTATION SCHEDULE</a></div>
		</div>
	);
}

