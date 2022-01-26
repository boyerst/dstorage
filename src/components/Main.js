import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              {/* Upload via a form */}
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
                  {/* 
                    - uploadFile callback function is passed down to child component as props through <Main /> component instance in App.js
                    - We call this function by using it as an event handler inside of an onSubmit event
                    - The global event variable is passed as an argument to the event handler function so that the callback fuction in App.js can access the event object ❓
                    - Use event.PreventDefault to prevent browser from reloading (default behavior)
                    - Uses an arrow function that calls the uploadFile function with the description parameter
                   */}
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    // Capture the file description
                    const description = this.fileDescription.value
                    // Upload the file and pass the description as a parameter
                      // Since we are passing it to a class component we bind with 'this'
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                    {/* captureFile converts file into a buffer */}
                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                    <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                  </form>
              </div>

              <p>&nbsp;</p>
              {/* Create Table*/}
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
              {/* Set table columns */}
                {/* Mapping rows... */}
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;