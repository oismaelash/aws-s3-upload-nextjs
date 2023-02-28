import type { NextPage } from 'next'
import { InputHTMLAttributes, useState } from 'react'
import styles from '../styles/Home.module.css'
import AWSS3UploadAsh from 'aws-s3-upload-ash'
import { UploadResponse } from 'aws-s3-upload-ash/dist/types'

const Home: NextPage = () => {

  const [fileSelected, setFileSelected] = useState({ type: "", name: "" })
  const config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
    // dirName: 'demo', /* optional - when use: e.g BUCKET_ROOT/dirName/fileName.extesion */
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    s3Url: process.env.NEXT_PUBLIC_BUCKET_URL
  }
  // @ts-ignore
  const S3CustomClient = new AWSS3UploadAsh(config);

  function onChangeFile(event: InputHTMLAttributes<HTMLInputElement>) {
    // @ts-ignore
    setFileSelected(event.target.files[0])
  }

  async function handleSendFile() {
    alert("Open console for see the result")
    console.log("handleSendFile")

    try {
      // @ts-ignore
      const response = await S3CustomClient.uploadFile(fileSelected, fileSelected.type, undefined, fileSelected.name, "public-read");
      console.log(response, new Date().toString())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <input type="file" onChange={onChangeFile} ></input>
      <br />
      <br />
      <button onClick={handleSendFile} >send file</button>
    </div>
  )
}

export default Home