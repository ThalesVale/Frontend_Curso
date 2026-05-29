import styles from './styles.module.css'

import type { ReactNode } from 'react'

interface ContainerProps{
    children: React.ReactNode;
}
export function Container({children}:ContainerProps){
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}
