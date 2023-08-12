import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";

function dall() {

  const Open_AI_Key = "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";

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const configuration = new Configuration({
      apiKey: Open_AI_Key
  })

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
      const res = await openai.createImage({
          prompt: prompt,
          n: 1,
          size: "512x512"
      })

      setResult(res.data.data[0].url)
  }

  console.log(prompt)

  return (
    <div className="w-full h-full items-center flex flex-col mt-96">
        <h2>Generate an Image using Open AI API</h2>
        <textarea  
            placeholder="lets generate image ..."
            onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage}>Generate</button>
        {
            result.length > 0 ? (
                <img src={result} alt={result} />
            ) : (
                <p>No data!</p>
            )
        }
    </div>
  )
}

export default dall