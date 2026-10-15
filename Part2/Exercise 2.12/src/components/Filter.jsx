const Filter=(props)=>{
    return(
        <div>
            filter show with
            <input 
            value={props.searchName}
            onChange={props.handleSearchNameChange}
            />
        </div>
    )
}
export default Filter