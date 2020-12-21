import React, { Component } from "react";
import axios, { post } from "axios";

export default class NewRoutines extends Component {
  state = {
    testRes: "",
    RoutineName: "",
    options: { option: "", url: "" },
    points: [],
    UploadImageDisabled: true,
    show_hide_Spinner: false,
  };

  spinner_Style() {
    return this.state.show_hide_Spinner ? "visable" : "none";
  }

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
        console.log("response: ", res.data);
        this.setState({
          points: [...this.state.points, res.data.points],
        });
        console.log("State Test: ", this.state.points);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   -------------  Static Kinect Image Handler  ---------------------

  handleKinectStaticImage = () => {
    axios
      .post(`http://127.0.0.1:8000/KinectStaticImage/`, {
        option: "kinect image",
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
    this.setState({ show_hide_Spinner: true });
    axios
      .post(`http://127.0.0.1:8000/StaticImage/`, this.state.options)
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log("response: ", res.data);
        this.setState({
          points: [...this.state.points, res.data.points],
        });
        let s = { ...this.state };
        s.image = s.options.url;
        this.setState(s);
        console.log("State Test: ", this.state.points);
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
    options["option"] = "static image";
    this.setState({ options });

    this.setState({ UploadImageDisabled: false });

    console.log(this.state);
  }

  handleNameInputOnChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //   -------------  Save Btn  ---------------------

  handleOnSave = () => {
    // console.log(this.state.points);

    if (this.state.RoutineName !== "") {
      let data = {
        RoutineName: this.state.RoutineName,
        Points: this.state.points,
      };
      axios
        .post(`http://127.0.0.1:8000/SaveRoutine/`, data)
        .then((res) => {
          this.setState({ points: [], image: "" });

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error + "\n Duplicate Routine is not Allowed!");
          window.alert(error + "\n Duplicate Routine is not Allowed!");
        });
    } else {
      window.alert("Routine Name is Empty!");
    }
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1%",
          opacity: ".7",
        }}
      >
        <h1> Routines Registration Page:</h1>

        <div className="row">
          <div className="col">
            Routine Name:{" "}
            <input
              type="text"
              name="RoutineName"
              onChange={this.handleNameInputOnChange}
            />
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
              accept=""
              disabled
            />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleRecordedVideo}
              disabled
            >
              Upload Recorded Video
            </button>
          </div>
        </div>
        <hr style={{ backgroundColor: "white" }} />

        {/* Live Video Module */}

        <h3> Upload Live Video Mode:</h3>

        <table>
          <tr>
            <td>
              <button
                class="btn btn-primary"
                onClick={this.handleKinectLiveStream}
                disabled
              >
                Using Kinect
              </button>
            </td>
            <td>
              <button
                class="btn btn-primary"
                onClick={this.handleCameraLiveStream}
                disabled
              >
                Using Embeded Camera
              </button>
            </td>
          </tr>
        </table>

        {/* Live Video Module End*/}

        <hr style={{ backgroundColor: "white" }} />

        <h3> Upload Static Image Mode:</h3>

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
            <td>
              <button
                className="btn btn-primary"
                onClick={this.handleKinectStaticImage}
              >
                Using Kinect
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                className="btn btn-primary"
                onClick={this.handleStaticImage}
                disabled={this.state.UploadImageDisabled}
              >
                Upload Image
              </button>
            </td>
            <td>
              <input
                name="file"
                id="Imagefile"
                type="file"
                class="file"
                onChange={(e) => this.onImageFileChange(e)}
                accept=""
              />
            </td>
            <td>
              <div
                className="spinner-border text-primary"
                style={{ display: this.spinner_Style() }}
              ></div>
            </td>
          </tr>
        </table>

        <br />

        <div className="row">
          <div className="col-1"></div>
          <div
            className="col-4"
            style={{
              backgroundColor: "#DEB887",
              height: "280px",
              opacity: ".8",
              color: "black",
              overflow: "scroll",
            }}
          >
            <h4>Selected Images: </h4>

            <table>
              <tr>
                <th>{this.state.image}</th>
              </tr>
            </table>
          </div>
          <div className="col-1"></div>
          <div
            className="col-5 "
            style={{
              backgroundColor: "#DEB887",
              height: "280px",
              opacity: ".8",
              color: "black",
              overflow: "scroll",
            }}
          >
            <h4>Points: </h4>
            <table className="table">
              <tr>
                <th>Image No</th>
                <th>point x</th>
                <th>point y</th>
                <th>point z</th>
              </tr>
              {this.state.points.map((p) => (
                <tr>
                  <td>{p["image"]}</td>
                  <td>{p["x"]}</td>
                  <td>{p["y"]}</td>
                  <td>{p["z"]}</td>
                </tr>
              ))}
            </table>
          </div>
          <div className="col-1"></div>
        </div>

        <br />

        <div className="row">
          <div className="col">
            <center>
              <table>
                <tr>
                  <td>
                    <button className="btn btn-warning"> Retry </button>
                  </td>
                  <td>
                    <button className="btn btn-warning"> Back </button>
                  </td>
                  <td>
                    <button className="btn btn-warning"> Next </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={this.handleOnSave}
                    >
                      {" "}
                      Save{" "}
                    </button>
                  </td>
                </tr>
              </table>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
