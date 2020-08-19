import React, { useState, useEffect } from "react";
import { Upload, Icon, message, Modal } from 'antd';
const { Dragger } = Upload;
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const defaultConfig = {
    name: 'file',
    multiple: true,
    showUploadList: true,
    listType: "picture-card",
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const FileUpload = props => {
    const [previewImage, setPreviewImage] = useState()
    const [previewVisible, setPreviewVisible] = useState()
    const handleBeforeUpload = (file, fileList) => {
        console.log(fileList);
    }
    const handleCancel = () => setPreviewVisible(false);;
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };
    return (<>
        <Dragger
            defaultFileList={props.fileList}
            beforeUpload={handleBeforeUpload}
            onPreview={handlePreview}
            {...defaultConfig} {...props} >
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    </>)
}
export default FileUpload;