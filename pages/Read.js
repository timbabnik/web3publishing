import React, { useState, useRef } from "react";
import ipfsClient from "ipfs-http-client"; 
import { create } from 'ipfs-http-client';
import image from "../public/image.jpg"

const Read = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [text, setText] = useState("");
  const canvasRef = useRef(null);

  

  const projectId = '2JyR9CgkNwhqTpEUk0SMTqE733d';
  const projectSecret = '0f85d5460bbafd3f2aa6b79ceb46b03a';
  const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
    authorization: auth,
    },
    });

    

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvasWidth / aspectRatio;
      const canvasPadding = canvasWidth * 0.1; // 10% padding
      ctx.drawImage(img, canvasPadding, canvasPadding, canvasWidth - 2 * canvasPadding, canvasHeight - 2 * canvasPadding);
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center"; // Set text alignment to center
      ctx.textBaseline = "middle"; // Set text baseline to middle
      const textWidth = canvasWidth * 0.8; // Set text width to 80% of canvas width
      let words = text.split(" ");
      let line = "";
      let lines = [];
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let testWidth = ctx.measureText(testLine).width;
        if (testWidth > textWidth) {
          lines.push(line);
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      const x = canvas.width / 2; // Get horizontal center of canvas
      const y = canvas.height / 2 - ((lines.length - 1) * 30) / 2; // Get vertical center of canvas, adjusted for number of lines
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * 30);
      }
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL();
      downloadLink.download = "edited_photo.png";
      downloadLink.click();
    };
    img.src = uploadedImage;
  };

  const handleUploadToIPFS = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = async () => {
      const aspectRatio = img.width / img.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvasWidth / aspectRatio;
      const canvasPadding = canvasWidth * 0.1; // 10% padding
      ctx.drawImage(img, canvasPadding, canvasPadding, canvasWidth - 2 * canvasPadding, canvasHeight - 2 * canvasPadding);
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center"; // Set text alignment to center
      ctx.textBaseline = "middle"; // Set text baseline to middle
      const textWidth = canvasWidth * 0.8; // Set text width to 80% of canvas width
      let words = text.split(" ");
      let line = "";
      let lines = [];
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let testWidth = ctx.measureText(testLine).width;
        if (testWidth > textWidth) {
          lines.push(line);
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      const x = canvas.width / 2; // Get horizontal center of canvas
      const y = canvas.height / 2 - ((lines.length - 1) * 30) / 2; // Get vertical center of canvas, adjusted for number of lines
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * 30);
      }
      const imageDataURL = canvas.toDataURL();
      const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
      
      const result = await client.add(buffer); // Upload image buffer to IPFS
      console.log("IPFS Hash:", result.cid.toString());
    };
    img.src = image.src;
};

const handleUploadToIPFSTwo = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous"; // Add crossorigin attribute to allow access to image from different origin
    img.onload = async () => {
      const canvasWidth = img.width;
      const canvasHeight = img.height;
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center"; // Set text alignment to center
      ctx.textBaseline = "middle"; // Set text baseline to middle
      const textWidth = canvasWidth * 0.8; // Set text width to 80% of canvas width
      let words = text.split(" ");
      let line = "";
      let lines = [];
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        let testWidth = ctx.measureText(testLine).width;
        if (testWidth > textWidth) {
          lines.push(line);
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      const x = canvas.width / 2; // Get horizontal center of canvas
      const y = canvas.height / 2 - ((lines.length - 1) * 30) / 2; // Get vertical center of canvas, adjusted for number of lines
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * 30);
      }
      const imageDataURL = canvas.toDataURL();
      const buffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
      
      const result = await client.add(buffer); // Upload image buffer to IPFS
      console.log("IPFS Hash:", result.cid.toString());
    };
    img.src = image.src;
  };


  return (
   <div>
      <h1>Photo Editor</h1>
      <input type="file" onChange={handleImageUpload} />
      <br />
      <textarea value={text} onChange={handleTextChange} />
      <br />
      
        <div>
          <h2>Preview:</h2>
          <img src={uploadedImage} alt="Uploaded" />
          <canvas ref={canvasRef} width="400" height="400" style={{ display: "none" }} />
          <br />
          <button onClick={handleUploadToIPFS}>Download</button>
        </div>
      
    </div>
  );
};

export default Read;