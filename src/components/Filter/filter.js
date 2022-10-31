function Filter({sort,sorting}) {
  
    return ( 
        <>  
            <p>Loc theo ngay tao</p>
            <select value={sort} onChange={sorting}>
                <option value="low">Low</option>
                <option value="hight">Hight</option>
            </select>
        </>
     );
}

export default Filter;