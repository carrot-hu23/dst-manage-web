// import React, {useState} from 'react';
// import {UploadOutlined} from '@ant-design/icons';
// import {Button, message, Upload} from 'antd';
//
// import axios from "axios";
//
// const App = () => {
//     const [fileList, setFileList] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const handleUpload = () => {
//         const formData = new FormData();
//         fileList.forEach((file) => {
//             console.log(file.name)
//             formData.append('files[]', file);
//         });
//         setUploading(true);
//         axios.post('/api/file/ugc/upload', formData)
//             .then(response => {
//                 console.log(response.data);
//                 if (response?.data?.code === 200) {
//                     message.success("上传成功")
//                 }
//                 setFileList([]);
//             })
//             .catch(() => {
//                 message.error('upload failed.');
//             })
//             .finally(() => {
//                 setUploading(false);
//             });
//     };
//     const props = {
//         onRemove: (file) => {
//             const index = fileList.indexOf(file);
//             const newFileList = fileList.slice();
//             newFileList.splice(index, 1);
//             setFileList(newFileList);
//         },
//         beforeUpload: (file) => {
//             setFileList([...fileList, file]);
//             return false;
//         },
//         fileList,
//     };
//     return (
//         <>
//             <Upload action="/api/file/ugc/upload" directory>
//                 <Button icon={<UploadOutlined />}>Upload Directory</Button>
//             </Upload>
//         </>
//     );
// };
// export default App;



import {useState} from "react";
import {Button} from "antd";
import axios from "axios";

const FileUpload = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileArray = Array.from(selectedFiles);  // 将 FileList 转为数组
        setFiles(fileArray);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        files.forEach(file => {
            const filePath = file.webkitRelativePath || file.name; // Get the file path including directory structure
            formData.append('files', file, );
            formData.append('filePaths', filePath);
        });

        try {
            await axios.post('/api/file/ugc/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Upload successful');
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div>
            <input
                type="file"
                webkitdirectory="true"
                multiple
                onChange={handleFileChange}
                style={{
                    padding: 6,
                }}
            />
            <Button onClick={handleUpload}>Upload Folder</Button>
        </div>
    );
};

export default FileUpload;