function Loading({isLoading}){
    return(
        <div className='loading' 
        style={{display: isLoading ==true?'flex':'none'}}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    )
};

export default Loading;