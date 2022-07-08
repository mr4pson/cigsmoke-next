import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createImage } from 'redux/slicers/imagesSlicer';
import { axiosInstance } from 'common/axios.instance';

const ImageUpload: React.FC = () => {
    const fileList: UploadFile[] = [
        {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'yyy.png',
            status: 'error',
        },
    ];

    const dispatch = useAppDispatch()

    return (
        <>
            <Upload
            
                listType="picture"
                customRequest={event => {
                    // console.log(event)
                    const {
                        data,
                        action,
                        method,
                        headers,
                        filename,
                        onError,
                        onProgress,
                        onSuccess,
                        withCredentials,
                        ...rest
                    } = event
                    // dispatch(createImage(rest))
                    const formData = new FormData()
                    formData.append("files", event.file as any)
                    axiosInstance.post("http://localhost:4010/images", formData, {
                        headers: {
                            "Content-Type": 'multipart/form-data'
                        } 
                    })
                    }
                }
                defaultFileList={[...fileList]}
            >
                <Button icon={<UploadOutlined />}> Upload</Button>
            </Upload>
        </>
    )
}

export default ImageUpload