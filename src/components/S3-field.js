import React, { Component } from "react";
// import { notification , message, Icon } from 'antd';
import { withRouter } from "react-router-dom";
import S3Uploader from "react-s3-uploader";
import { Progress } from "antd";
import { URL_S3, URL_BASE } from "../constants/";
class App extends Component {
  state = {
    progress: null,
    file: {},
    image: null,
  };

  componentDidMount() { }
  componentWillReceiveProps(nextprops) {
    if (nextprops.image)
      this.setState({
        image: nextprops.image
      });
  }
  onUploadStart = (file, next) => {
    this.setState({
      name_file: file.name,
      file
    });
    next(file);
  };

  onSignedUrl = (...props) => { };

  onUploadProgress = (progress, ...props) => {
    this.setState({ progress });
  };

  onUploadError = (error) => { };

  onUploadFinish = (files) => {
    let { file } = this.state;
    this.setState({
      image: files.fileKey
    });
    this.props.handleUploadFinish(files.fileKey, file, this.props.id);
  };

  render() {
    const { file = {}, match, path, finalPath, data = {}, idKey = "id" } = this.props;
    const { progress, image } = this.state;
    const id = match.params.id || data[idKey] || this.props.id;
    let pathNew = null;
    if (this.props.finalPath) {
      pathNew = `${path}/${id}/${finalPath}`;
    } else {
      pathNew = `${path}/${id}`;
    }

    if (file.name) return <div className="s3Button mr-2">{file.name}</div>;
    return (
      <div className="mr-2">
        {image ? (
          <img
            src={`${URL_S3}${image}`}
            width="200px"
            height="200px"
            className="custom-img-field"
          />
        ) : null}
        {(progress > 0 && progress < 100) && <Progress percent={progress} status="active" />}
        <label
          htmlFor={this.props.idComponent}
          className="flat-button-file"
          variant="outlined"
          color="primary"
        >
          {this.props.nameButton ? this.props.nameButton : "Subir Imágen "}
        </label>
        <label className="s3Button">
          <S3Uploader
            id={this.props.idComponent}
            signingUrl="/s3Client/sign"
            signingUrlMethod="GET"
            accept="*/*"
            s3path={pathNew}
            preprocess={this.onUploadStart}
            onSignedUrl={this.onSignedUrl}
            onProgress={this.onUploadProgress}
            onError={this.onUploadError}
            onFinish={this.onUploadFinish}
            signingUrlWithCredentials={true} // in case when need to pass authentication credentials via CORS
            uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
            contentDisposition="auto"
            scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/gi, "")}
            server={URL_BASE}
            // inputRef={cmp => this.uploadInput = cmp}
            autoUpload={true}
            className="s3-uploader"
            style={{ visibility: "hidden" }}
          />
        </label>
      </div>
    );
  }
}

export default withRouter(App);
