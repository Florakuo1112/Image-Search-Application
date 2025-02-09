function PhotoModalComponent({photoModalRef , closeMyPhotoModal, singlePhotoInfo}){
      //複製網址
        async function copyInput(input) {
            try {
            await navigator.clipboard.writeText(input);
            alert('文字已複製: ' + input);
            } catch (error) {
            alert('複製失敗: ' + err);
            }
        }

    return(
        <div className="modal fade" tabIndex="-1" ref={photoModalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Photo Information</h5>
              <button type="button" className="btn-close" onClick={closeMyPhotoModal}></button>
            </div>
            <div className="modal-body ">
              <div className='d-flex justify-content-center'>
              <img src={singlePhotoInfo.data?.urls.small} alt="" width="100%"
                  height="400px" style={{objectFit:"cover"}}/>
              </div>
              <h4>urls</h4>
              <ul style={{listStyle:'none'}} className='ps-0'>
                <li>
                  <div className="input-group">
                    <span className="input-group-text">full</span>
                    <input className="form-control" defaultValue={singlePhotoInfo.data?.urls.full} disabled  ></input>
                    <button className="btn btn-outline-primary" type='button' onClick={()=>{copyInput(singlePhotoInfo.data?.urls.full)}}>Copy</button>
                  </div>
                  </li>
                  <li>
                  <div className="input-group">
                    <span className="input-group-text">raw</span>
                    <input className="form-control" defaultValue={singlePhotoInfo.data?.urls.raw} disabled></input>
                    <button className="btn btn-outline-primary" type='button' onClick={()=>{copyInput(singlePhotoInfo.data?.urls.raw)}}>Copy</button>
                  </div>
                  </li>
                  <li>
                  <div className="input-group">
                    <span className="input-group-text">regular</span>
                    <input className="form-control" defaultValue={singlePhotoInfo.data?.urls.regular} disabled></input>
                    <button className="btn btn-outline-primary" type='button' onClick={()=>{copyInput(singlePhotoInfo.data?.urls.regular)}}>Copy</button>
                  </div>
                  </li>
                  <li>
                  <div className="input-group">
                    <span className="input-group-text">small</span>
                    <input className="form-control" defaultValue={singlePhotoInfo.data?.urls.small} disabled></input>
                    <button className="btn btn-outline-primary" type='button' onClick={()=>{copyInput(singlePhotoInfo.data?.urls.small)}}>Copy</button>
                  </div>
                  </li>
                  <li>
                  <div className="input-group">
                    <span className="input-group-text">small_s3</span>
                    <input className="form-control" defaultValue={singlePhotoInfo.data?.urls.small_s3} disabled></input>
                    <button className="btn btn-outline-primary" type='button' onClick={()=>{copyInput(singlePhotoInfo.data?.urls.small_s3)}}>Copy</button>
                  </div>
                  </li>
                  <li>
                  <div className="input-group">
                    <span className="input-group-text">thumb</span>
                    <input className="form-control" defaultValue={singlePhotoInfo.data?.urls.thumb} disabled></input>
                    <button className="btn btn-outline-primary" type='button' onClick={()=>{copyInput(singlePhotoInfo.data?.urls.thumb)}}>Copy</button>
                  </div>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
};

export default PhotoModalComponent;