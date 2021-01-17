import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import WarningModal from "./WarningModal";
// const cv = require('opencv4nodejs');
// import ErrorModal from "./ErrorModal";
export default class NewRoutines extends Component {

  constructor(props) {
    super(props);
    // var image = cv.imread("/Images/ProfileImages/Adeel.jpg");
    // console.log(image);
    // cv.imshow(image);
  }
  // let imageData = [
  //   [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],
  //   [ 0xFF0000FF, 0x00FF00FF, 0xFF0000FF ],
  //   [ 0xFF0000FF, 0xFF0000FF, 0x0000FFFF ]
  // ];


  // let image = new Jimp(3, 3, function (err, image) {
  //   if (err) throw err;

  //   imageData.forEach((row, y) => {
  //     row.forEach((color, x) => {
  //       image.setPixelColor(color, x, y);
  //     });
  //   });

  //   image.write('test.png', (err) => {
  //     if (err) throw err;
  //   });
  // });
  state = {
    testRes: "",
    RoutineName: "",
    options: { option: "", url: "" },
    points: [],
    UploadImageDisabled: true,
    show_hide_Spinner: false,
    showModal: false,
    webotsBtnDisabled: false,
    urSimBtnDisabled: false,
    saveBtnDisabled: false,
    isLoad: false,
    modalMessege: "Currently this service is disable ",
    modalStatus: false,
    isOpen: true
  };




  handleSubmit = () => {
    // event.preventDefault();

    const routine = "Regular Moazzam 1 Routine";
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/Testing/`, { routine })
      .then((res) => {
        this.setState({ testRes: res.data });
        console.log(res.data);
        this.setState({ isLoad: false })
      })
      .catch((error) => {
        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Network Error Occured !"

        })
        console.log(error);
      });
  };
  //   -------------  Recorded Video Handler  ---------------------

  handleRecordedVideo = () => {
    // const fileName = this.state.options["url"];
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/RecoredVideo/`, this.state.options)
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Currently the recorded Video option is not available due to performance issue in your PC. "

        })
      })
      .catch((error) => {

        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Network Error Occured !"

        })
        console.log(error);
      });
  };

  //   -------------  Kinect Live Stream Handler  ---------------------

  handleKinectLiveStream = () => {
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/KinectLiveStream/`, {
        option: "kinect",
        url: "",
      })
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Currently the Kinect Live Stream option is not available due to performance issue in your PC. "

        })

      })
      .catch((error) => {

        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Network Error Occured !"

        })
        console.log(error);
      });
  };

  //   -------------  Camera Live Stream Handler  ---------------------

  handleCameraLiveStream = () => {
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/CameraLiveStream/`, {
        option: "live stream",
        url: "",
      })
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log(res.data);
        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Currently the Camera Live Stream option is not available due to performance issue in your PC. "

        })

      })
      .catch((error) => {
        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Some thing went wrong !"

        })
        console.log("IN ERROR ");
      });
  };

  //   -------------  Static Camera Image Handler  ---------------------

  handleCameraStaticImage = () => {
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/CameraStaticImage/`, {
        option: "camera image",
        url: "",
      })
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log("response: ", res.data);
        if (res.data.status === 502) {
          this.setState({
            isLoad: false,
            modalStatus: true,
            modalMessege: "The image you provide doesn't contain valid points."
          })
          console.log("error occured")
        } else {

          this.setState({
            points: [...this.state.points, res.data.points],
            isLoad: false
          });
          console.log("State Test: ", this.state.points);
        }
      })
      .catch((error) => {

        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Network Error Occured !"

        })
        console.log(error);
      });
  };

  //   -------------  Static Kinect Image Handler  ---------------------

  handleKinectStaticImage = () => {
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/KinectStaticImage/`, {
        option: "kinect image",
        url: "",
      })
      .then((res) => {
        if (res.data.status === 502) {
          this.setState({
            isLoad: false,
            modalStatus: true,
            modalMessege: "The image you provide doesn't contain valid points or might be kinect is not connected."
          })
          console.log("error occured")
        } else {

          this.setState({
            points: [...this.state.points, res.data.points],
            isLoad: false
          });
          console.log("State Test: ", this.state.points);
        }
      })
      .catch((error) => {

        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Network Error Occured !"

        })
        console.log(error);
      });
  };

  //   -------------  Static Image Handler  ---------------------

  handleStaticImage = () => {

    console.log(this.state.options);
    this.setState({ isLoad: true })
    axios
      .post(`http://127.0.0.1:8000/StaticImage/`, this.state.options)
      .then((res) => {
        //   this.setState({ testRes: res.data })
        console.log("response: ", res.data);
        if (res.data.status === 502) {
          this.setState({
            isLoad: false,
            modalStatus: true,
            modalMessege: "The image you provide doesn't contain valid points."
          })
          console.log("error occured")
        } else {

          this.setState({
            points: [...this.state.points, res.data.points],
            isLoad: false
          });

          let s = { ...this.state };
          s.image = s.options.url;
          this.setState(s);
          console.log("State Test: ", this.state.points);

        }
      })
      .catch((error) => {

        this.setState({
          isLoad: false,
          modalStatus: true,
          modalMessege: "Network Error Occured !"

        })
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
    console.log("Inside Save Handler!!!");

    if (this.state.RoutineName !== "" && this.state.points.length !== 0) {
      let data = {
        RoutineName: this.state.RoutineName,
        Points: this.state.points,
      };
      axios
        .post(`http://127.0.0.1:8000/SaveRoutine/`, data)
        .then((res) => {
          this.setState({ points: [], image: "", RoutineName: "" });

          console.log(res.data);
          window.alert("The Training Routine has been successfully Saved!");
        })
        .catch((error) => {
          console.log(error + "\n Duplicate Routine is not Allowed!");
          window.alert(error + "\n Duplicate Routine is not Allowed!");
        });
    } else {
      window.alert("Training Routine Name (OR) The Points are Empty!");
    }
  };

  //   -------------  Handle Webots Btn  ---------------------

  handleWebotsSim = () => {
    console.log("Webots Btn Clicked");
    let data = {
      RouitneName: this.state.RoutineName,
      Points: this.state.points,
    };
    if (!this.state.points.length > 0 && !this.state.RoutineName !== "") {
      axios
        .post(`http://127.0.0.1:8000/TriggerWebotsSim/`, data)
        .then((res) => {
          // this.setState({ points: [], image: "" });

          console.log(res.data);
          if (res.data.errorCheckStatus === true) {
            window.alert("ERROR MESSAGE: " + res.data.errorMessage);
          }
        })
        .catch((error) => {
          window.alert("ERROR MESSAGE: " + error);
        });
    } else {
      window.alert(
        "Either Routine Name is empty OR the points are not defined!"
      );
    }
  };

  //   -------------  Handle URSim Btn  ---------------------

  handleURSim = () => {
    console.log("URSim Btn Clicked");
    let data = {
      RouitneName: this.state.RoutineName,
      Points: this.state.points,
    };
    axios
      .post(`http://127.0.0.1:8000/TriggerURSim/`, data)
      .then((res) => {
        // this.setState({ points: [], image: "" });

        console.log(res.data);
        // window.alert("The Training Routine has been successfully Saved!");
      })
      .catch((error) => {
        console.log(error + "\n Duplicate Routine is not Allowed!");
        window.alert(error + "\n Duplicate Routine is not Allowed!");
      });
  };

  setModelisOpen = (check) => {
    this.setState({ showModal: check });
    this.setState({
      showRoutinesDisabled: true,
      updateRoutineBtnDisabled: true,
      unlinkRoutineBtnDisabled: false,
    });
  };
  closeWarningModal = () => {
    this.setState(
      {
        modalStatus: false,
        modalMessege: ""

      })
  }

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
        <WarningModal option={{
          open: this.state.modalStatus,
          onClose: this.closeWarningModal,
          messege: this.state.modalMessege
        }} />
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => this.setModelisOpen(false)}
          className="Modal"
        >
          <center>
            <div
              style={{
                width: "25em",
                height: "20em",
                backgroundColor: "white",
                marginTop: "2em",
                border: "1px solid black",
              }}
            >
              <h2>Select Simulation</h2>
              <span>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleWebotsSim()}
                  disabled={this.state.webotsBtnDisabled}
                >
                  Webots Simulation
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleURSim()}
                  disabled={this.state.urSimBtnDisabled}
                >
                  UR Simulation
                </button>
              </span>
              <br />
              <br />
              <button
                className="btn btn-primary"
                onClick={() => this.handleOnSave()}
                disabled={this.state.saveBtnDisabled}
              >
                Save
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-danger"
                onClick={() => this.setModelisOpen(false)}
              >
                close
              </button>
            </div>
          </center>
        </Modal>

        <h1> Routines Registration Page:</h1>

        <div className="row">
          <div className="col">
            <b>Training Routine Name:</b>
            <input
              placeholder="Enter Training Routine Name ..."
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
              >
                Using Kinect
              </button>
            </td>
            <td>
              <button
                class="btn btn-primary"
                onClick={this.handleCameraLiveStream}
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
                style={{ width: "14em" }}
              />
            </td>
            <td>

              <tr>

                {this.state.isLoad ? (
                  <span>
                    <img src="/Images/731.png" alt="loading" style={{
                      padding: "0.7em",
                      float: "left",
                      paddingLeft: "-0.8em"
                    }} />
                    <h5 style={{
                      float: "right",
                      fontFamily: "monospace",
                      paddingTop: "0.7em",
                      paddingLeft: "0.2em"
                    }}>
                      Loading...
                  </h5>
                  </span>


                ) : ""}
              </tr>
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
                    <button className="btn btn-warning"
                      onClick={() => {
                        this.setState({
                          points: [],
                          RoutineName: "",
                        })
                      }}
                    > Reset</button>
                  </td>
                  <td>
                    <button className="btn btn-warning"
                      onClick={() => {

                        var list = [...this.state.points]
                        list.pop()
                        this.setState({
                          points: list
                        }
                        )

                      }}> Back </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.setModelisOpen(true)}
                    >
                      Simulate
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
