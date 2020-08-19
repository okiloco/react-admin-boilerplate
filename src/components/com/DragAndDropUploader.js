import React, { useState, useEffect } from "react";
import { Upload, message, Icon } from "antd";
import S3 from "aws-s3";
import {
  URL_S3,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  BUCKET
} from "../../constants";
import _ from "lodash";
import { MyModal } from "./MyModal";
import moment from "moment";
const defaultFormats = ["image/jpeg", "image/jpg", "image/png", "video/mp4"];
const { Dragger } = Upload;
const Uploader = ({
  path,
  dragger = true,
  multiple = true,
  autoIncrement = true,
  showUploadList = true,
  showRemoveIcon,
  s3Url = URL_S3,
  accessKeyId = ACCESS_KEY_ID,
  secretAccessKey = SECRET_ACCESS_KEY,
  bucketName = BUCKET,
  name,
  formats = defaultFormats,
  onChange,
  onDelete,
  dataSource = [],
  ...props
}) => {
  let [photoscount, setPhotosCount] = useState(
    props.fileList ? props.fileList.length : -1
  );
  let [previewVisible, setPreviewVisible] = useState();
  let [currentfile, setCurrentFile] = useState({});
  let [fileList, setFileList] = useState(props.fileList || []);
  let [previewImage, setPreviewImage] = useState();
  let max = 0;
  useEffect(() => {
    setFileList(props.fileList);
    setPhotosCount(getMaxIndex(props.fileList));
    return () => { };
  }, [props.fileList]);
  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const getMax = (arr = []) => {
    let max = 0;
    arr.forEach(it => {
      if (parseInt(it.priority) > max) max = parseInt(it.priority);
    })
    return max;
  };
  const getMaxIndex = (arr = []) => {
    if (!autoIncrement) {
      return props.fileList.length;
    }
    if (arr.length === 0) return -1;
    const max = getMax(arr);
    return max.index;
  };
  const uploadFile = (file, newFileName, count) => {

    const config = {
      bucketName,
      dirName: path /* optional */,
      region: "us-east-1",
      accessKeyId,
      secretAccessKey,
      s3Url: s3Url /* optional */
    };
    const S3Client = new S3(config);
    return new Promise((resolve, reject) => {

      dataSource.forEach(it => {
        if (parseInt(it.priority) > max) max = parseInt(it.priority);
      });
      S3Client.uploadFile(file, newFileName)
        .then(data => {
          max++;
          data["index"] = max;
          data["type"] = file.type.substring(0, file.type.indexOf("/"));
          if (onChange) onChange(data);
          message.success(
            `file ${newFileName || file.name} uploaded successfully`
          );
          resolve(data);
        })
        .catch(err => {
          reject(err);
          message.error(err.message);
        });
    });
  };
  const beforeUpload = file => {
    let newFileName = name;
    const allowFormat = formats.includes(file.type);
    if (!allowFormat) {
      message.error(
        `You can only upload ${formats
          .toString()
          .replace(/(image\/)/g, "")} files!`
      );
      return false;
    }
    if (autoIncrement) {
      setPhotosCount(count => {
        newFileName = `${file.name || count + 1}-${moment().format("YYYY-MM-DD-HH:mm:ss")}`;
        uploadFile(file, newFileName, count + 1);
        return count + 1;
      });
    }
    return false;
  };
  const handleRemove = file => {
    const config = {
      bucketName,
      dirName: path /* optional */,
      accessKeyId,
      secretAccessKey,
      s3Url: s3Url /* optional */
    };
    const S3Client = new S3(config);
    S3Client.deleteFile(
      file.key.substring(file.key.indexOf("/") + 1, file.key.length)
    )
      .then(response => {
        console.log(response);
        message.info("Photo deleted succesfully");
        file["status"] = "deleted";
        if (onDelete) onDelete(file);
      })
      .catch(err => message.error(err.message));
    return false;
  };
  const handleChange = info => {
    console.log("info: ", info);
    const { fileList } = info;
    console.log(info, fileList);
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setCurrentFile(file);
    setPreviewImage(file.url || file.preview);
  };
  return (
    <>
      {dragger ? (
        <Dragger
          /*  accept={formats.toString().replace(/(image\/)/g, "")} */
          listType="picture-card"
          showRemoveIcon={showRemoveIcon || false}
          showUploadList={showUploadList}
          multiple={multiple}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Allowed formats:{" "}
            {formats.toString().replace(/(image\/)/g, "")}
          </p>
        </Dragger>
      ) : (
          <Upload
            showUploadList={showUploadList}
            showRemoveIcon={showRemoveIcon || false}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            /* action="https://www.mocky.io/v2/5cc8019d300000980a055e76" */
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            Upload
          </Upload>
        )}
      <MyModal
        closable={true}
        width={"calc(50% - 20px)"}
        title={currentfile.type || "Preview"}
        onCancel={() => setPreviewVisible(false)}
        visible={previewVisible}
      >
        <img
          alt="example"
          style={{ width: "100%", margin: "0px 0px 20px 0px" }}
          src={previewImage}
        />
      </MyModal>
    </>
  );
};

export default Uploader;
