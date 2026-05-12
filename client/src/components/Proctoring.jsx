import { useEffect, useRef, useState } from 'react'
import * as cocossd from '@tensorflow-models/coco-ssd'
import * as faceapi from 'face-api.js'

function Proctoring({ onAutoSubmit, examEnded }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const faceIntervalRef = useRef(null)
  const objectIntervalRef = useRef(null)

  const objectModel = useRef(null)

  const [warning, setWarning] = useState('')
  const [warningCount, setWarningCount] = useState(0)
  const [objectWarning, setObjectWarning] = useState('')

  const noFaceCount = useRef(0)
  const multipleFaceCount = useRef(0)

  const submittedRef = useRef(false)

  // ================= CLEANUP =================
  const stopAll = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }

    if (faceIntervalRef.current) {
      clearInterval(faceIntervalRef.current)
      faceIntervalRef.current = null
    }

    if (objectIntervalRef.current) {
      clearInterval(objectIntervalRef.current)
      objectIntervalRef.current = null
    }
  }

  // ================= INIT =================
  useEffect(() => {
    initialize()

    return () => stopAll()
  }, [])

  useEffect(() => {
    if (examEnded) {
      stopAll()
    }
  }, [examEnded])

  const initialize = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
      objectModel.current = await cocossd.load()

      setTimeout(() => {
        startDetection()
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  // ================= WARNING =================
  const increaseWarning = (msg) => {
    setWarning(msg)

    setWarningCount(prev => {
      const updated = prev + 1

      if (updated >= 3 && !submittedRef.current) {
        submittedRef.current = true
        stopAll()
        onAutoSubmit()
      }

      return updated
    })
  }

  // ================= FACE =================
  const detectFace = () => {
    faceIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || examEnded) return

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 512,
          scoreThreshold: 0.3,
        })
      )

      if (detections.length === 0) {
        noFaceCount.current++

        if (noFaceCount.current >= 3) {
          increaseWarning('Face Not Visible')
          noFaceCount.current = 0
        }

        multipleFaceCount.current = 0
      } else if (detections.length > 1) {
        multipleFaceCount.current++

        if (multipleFaceCount.current >= 3) {
          increaseWarning('Multiple Faces Detected')
          multipleFaceCount.current = 0
        }

        noFaceCount.current = 0
      } else {
        noFaceCount.current = 0
        multipleFaceCount.current = 0
        setWarning('')
      }
    }, 10000)
  }

  // ================= OBJECT =================
  const detectObjects = () => {
    objectIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !objectModel.current || examEnded) return

      const predictions = await objectModel.current.detect(videoRef.current)

      const phoneDetected = predictions.find(
        p => p.class === 'cell phone'
      )

      if (phoneDetected && !submittedRef.current) {
        submittedRef.current = true

        alert('Mobile Phone Detected → Exam Terminated')

        stopAll()
        onAutoSubmit()
      }
    }, 5000)
  }

  // ================= START =================
  const startDetection = () => {
    detectFace()
    detectObjects()
  }

  // ================= UI =================
  return (
    <div className="mb-5">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="350"
        height="250"
        className="rounded-xl border"
      />

      <div className="mt-3 text-red-500 font-bold">
        Warnings: {warningCount}/3
      </div>

      {objectWarning && (
        <div className="bg-yellow-500 text-white p-3 mt-3 rounded-lg">
          {objectWarning}
        </div>
      )}

      {warning && (
        <div className="bg-red-500 text-white p-3 mt-3 rounded-lg">
          {warning}
        </div>
      )}
    </div>
  )
}

export default Proctoring