function PhotosListComponent({jsonData, getSinglePhoto}){
    return(
        jsonData.map((item)=>{
            return(
              <div className="col-6 g-3" key={item.id}>
                <div className="card" >
                  <a href="#" onClick={(e)=>{e.preventDefault();  getSinglePhoto(item.id)}}>
                <img src={item.urls.regular} className="card-img img-cover " width="100%"
                height="400px" alt={item.alt_description} style={{objectFit:"cover"}}/>
                </a>
                </div>
              </div>
            )
          })
    ) 
};


export default PhotosListComponent;