import React, { Component } from "react";
import axios, { post } from "axios";

export default class NewRoutines extends Component {
  state = {
    testRes: "",
    options: { option: "", url: "" },
  };

  handleSubmit = () => {
    // event.preventDefault();

    const routine = "Regular Moazzam 1 Routine";

    axios
      .post(`http://127.0.0.1:8000/Testing/`, { routine })
      .then((res) => {
        this.setState({ testRes: res.data });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //   -------------  Recorded Video Handler  ---------------------

  handleRecordedVideo = () => {
    // const fileName = this.state.options["url"];

    axios
      .post(`http://127.0.0.1:8000/RecoredVideo/`, this.state.options)
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   -------------  Kinect Live Stream Handler  ---------------------

  handleKinectLiveStream = () => {
    axios
      .post(`http://127.0.0.1:8000/KinectLiveStream/`, {
        option: "kinect",
        url: "",
      })
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   -------------  Camera Live Stream Handler  ---------------------

  handleCameraLiveStream = () => {
    axios
      .post(`http://127.0.0.1:8000/CameraLiveStream/`, {
        option: "camera",
        url: "",
      })
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   -------------  Static Camera Image Handler  ---------------------

  handleCameraStaticImage = () => {
    axios
      .post(`http://127.0.0.1:8000/CameraStaticImage/`, {
        option: "camera image",
        url: "",
      })
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   -------------  Static Image Handler  ---------------------

  handleStaticImage = () => {
    console.log(this.state.options);

    axios
      .post(`http://127.0.0.1:8000/StaticImage/`, this.state.options)
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
      })  
      .catch((error) => {
        console.log(error);
      });
  };

  //    --------------------------------------

  onFileChange(e) {
    let files = e.target.files;
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    console.log("/" + files[0]["name"]);
    const options = { ...this.state.options };
    options["url"] = "/" + files[0]["name"];
    options["option"] = "";
    this.setState({ options });
    // console.log(this.state.options);

    // reader.onload = (e) => {
    //   let formData = new FormData();
    //   console.warn("video Data: ", e.target.result);
    //   const url = "http://127.0.0.1:8000/RecoredVideo/";
    //   formData = { file: e.target.result };
    //   return post(url, formData, {
    //     headers: {
    //       //   "content-type": "multipart/form-data",
    //       "Content-Type": "application/json",
    //       //   maxContentLength: 100000000,
    //       //   maxBodyLength: 1000000000,
    //     },
    //   }).then((response) =>
    //     console.warn("post video request result", response)
    //   );
    // };
  }

  onImageFileChange(e) {
    console.log(this.state.options);
    let files = e.target.files;
    console.log("/" + files[0]["name"]);
    const options = { ...this.state.options };
    options["url"] = "/" + files[0]["name"];
    options["option"] = "";
    this.setState({ options });
    console.log(this.state.options);
  }

  render() {
    return (
      <div>
        <h1> Routines Registration Page:</h1>

        <div className="row">
          <div className="col">
            Routine Name: <input type="Routine Name" />
          </div>
        </div>
        <hr />
        <br>{/* Recorded Video Module */}</br>
        <div className="row">
          <div className="col">
            <input
              name="file"
              id="Videofile"
              type="file"
              class="file"
              onChange={(e) => this.onFileChange(e)}
              accept=".mp4"
            />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleRecordedVideo}
            >
              {" "}
              Select Recorded Video
            </button>
          </div>
        </div>
        <hr />

        {/* Live Video Module */}

        <h3> Input Live Video Mode:</h3>

        <table>
          <tr>
            <td>
              <button
                class="btn btn-primary"
                onClick={this.handleKinectLiveStream}
              >
                {" "}
                Using Kinect
              </button>
            </td>
            <td>
              <button
                class="btn btn-primary"
                onClick={this.handleCameraLiveStream}
              >
                {" "}
                Using Embeded Camera
              </button>
            </td>
          </tr>
        </table>

        {/* Live Video Module End*/}

        <br />
        <hr />
        <br />

        <h3> Input Static Image Mode:</h3>

        <table>
          <tr>
            <td>
              <button
                className="btn btn-primary"
                onClick={this.handleCameraStaticImage}
              >
                Using Camera
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                className="btn btn-primary"
                onClick={this.handleStaticImage}
              >
                Select Image
              </button>
            </td>
            <td>
              <input
                name="file"
                id="Imagefile"
                type="file"
                class="file"
                onChange={(e) => this.onImageFileChange(e)}
                accept=".jpg|jpeg"
              />
            </td>
          </tr>
        </table>

        <br />
        <br />
        <div className="row">
          <div className="col-1"></div>
          <div className="col-4">IMage url {this.state.testRes}</div>
          <div className="col-1"></div>
          <div className="col-5 ">dvfgr</div>
          <div className="col-1"></div>
        </div>

        <br />

        <div className="row">
          <div className="col">
            <center>
              <button className="btn btn-warning"> Retry </button>
              <button className="btn btn-warning"> Back </button>
              <button className="btn btn-warning"> Next </button>
              <button className="btn btn-warning"> Save </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
