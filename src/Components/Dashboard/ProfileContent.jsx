import React from 'react';

const ProfileContent = ({ profileData }) => {
  return (
    <>
    <div className="widget-panel border widget-submit">
        <div className="widget-header header-styles">
          <h2 className="title">Profile</h2>
        </div>
        <form className="form-estate" noValidate>
          <div className="form-group">
            <label htmlFor="inputNameSurname" className="control-label">First and last name</label>
            <div className="controls">
              <input
                type="text"
                name="name_surname"
                value={profileData.name_surname}
                className="form-control"
                id="inputNameSurname"
                placeholder="First and last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputUsername" className="control-label">Username</label>
            <div className="controls">
              <input
                type="text"
                name="username"
                value={profileData.username}
                className="form-control"
                id="inputUsername"
                placeholder="Username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGst" className="control-label">GST No</label>
            <div className="controls">
              <input
                type="text"
                name="gstNo"
                value={profileData.gstNo}
                className="form-control"
                id="inputGst"
                placeholder="GST No"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword" className="control-label">Password</label>
            <div className="controls">
              <input
                type="password"
                name="password"
                value={profileData.password}
                className="form-control"
                id="inputPassword"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPasswordConfirm" className="control-label">Confirm password</label>
            <div className="controls">
              <input
                type="password"
                name="password_confirm"
                value={profileData.password_confirm}
                className="form-control"
                id="inputPasswordConfirm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress" className="control-label">Address</label>
            <div className="controls">
              <textarea
                name="address"
                cols="40"
                rows="3"
                placeholder="Address"
                id="inputAddress"
                className="form-control"
                value={profileData.address}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputDescription" className="control-label">Description</label>
            <div className="controls">
              <textarea
                name="description"
                cols="40"
                rows="3"
                placeholder="Description"
                id="inputDescription"
                className="form-control"
                value={profileData.description}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPhone" className="control-label">Phone</label>
            <div className="controls">
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                className="form-control"
                id="inputPhone"
                placeholder="Phone"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail" className="control-label">Email</label>
            <div className="controls">
              <input
                type="text"
                name="mail"
                value={profileData.mail}
                className="form-control"
                id="inputEmail"
                placeholder="Email"
              />
            </div>
          </div>

          <hr />
          <div className="form-group">
            <div className="controls">
              <input type="submit" name="submit" value="Save" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>

      <div className="widget-panel border widget-submit" id="main">
        <div className="widget-header header-styles">
          <h2 className="title">Files (avatar, docs)</h2>
        </div>
        <div className="content-box">
          <form className="fileupload" method="POST" encType="multipart/form-data">
            <div className="fileupload-buttonbar row">
              <div className="col-md-6">
                <span className="btn btn-success fileinput-button">
                  <i className="fa fa-plus"></i>
                  <span>Add files</span>
                  <input type="file" name="files[]" multiple />
                </span>
                <button type="reset" className="btn btn-warning cancel">
                  <i className="icon-ban-circle icon-white"></i>
                  <span>Cancel upload</span>
                </button>
                <button type="button" className="btn btn-danger delete">
                  <i className="icon-trash icon-white"></i>
                  <span>Delete selection</span>
                </button>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="col-md-6 fileupload-progress fade">
                <div className="progress progress-success progress-striped active">
                  <div className="bar" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
