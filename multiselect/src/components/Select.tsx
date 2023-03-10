import styles from '../styles/select.module.css'

type SelectOption={
    label:string
    value:any
}

type SelectProps={
    options:SelectOption[]
    value?: SelectOption 
    onChange:(value:SelectOption|undefined) => void
}

export function Select({value,onChange,options}:SelectProps){

return(
<>
    
    <div tabIndex={0} className={styles.container}>
        <span className={styles.value}>Value</span>
        <button className={styles['clear-btn']}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${styles.show}`}>
            {options.map(option=>(<li className={styles.option} key={option.label}>{option.label}</li>))}
        </ul>
    </div>
</>

)

}