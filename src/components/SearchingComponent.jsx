function SearchingComponent({filterString, setFilterString}){
    function OnSearchHandler(e){
        if(e.key == "Enter"){
          console.log('搜尋:', e.target.value);
          setFilterString(e.target.value);
        }
      };
    return(
        <div >
        <label htmlFor="filter">Search</label>
        <input type="text" id="filter" className="form-control" defaultValue={filterString} onKeyPress={(e)=>{OnSearchHandler(e)}}/>
      </div>
    );
};

export default SearchingComponent;