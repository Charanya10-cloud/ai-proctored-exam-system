import {
  useEffect,
  useRef,
  useState,
} from 'react'

import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'

import * as cocossd from '@tensorflow-models/coco-ssd'

import * as faceDetection from
  '@tensorflow-models/face-detection'

function Proctoring({
  onAutoSubmit,
  examEnded,
}) {
  const videoRef = useRef(null)

  const streamRef = useRef(null)

  const faceIntervalRef =
    useRef(null)

  const objectIntervalRef =
    useRef(null)

  const objectModelRef =
    useRef(null)

  const detectorRef =
    useRef(null)

  const submittedRef =
    useRef(false)

  const noFaceCount =
    useRef(0)

  const [warning,
    setWarning] =
    useState('')

  const [warningCount,
    setWarningCount] =
    useState(0)

  const [objectWarning,
    setObjectWarning] =
    useState('')

  // ================= STOP =================

  const stopAll = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach(track =>
          track.stop()
        )

      streamRef.current = null
    }

    if (faceIntervalRef.current) {
      clearInterval(
        faceIntervalRef.current
      )
    }

    if (
      objectIntervalRef.current
    ) {
      clearInterval(
        objectIntervalRef.current
      )
    }
  }

  // ================= INIT =================

  useEffect(() => {
    initialize()

    return () => {
      stopAll()
    }
  }, [])

  // ================= EXAM END =================

  useEffect(() => {
    if (examEnded) {
      stopAll()
    }
  }, [examEnded])

  // ================= INITIALIZE =================

  const initialize = async () => {
    try {
      // CAMERA

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
          }
        )

      streamRef.current =
        stream

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream
      }

      await new Promise(
        resolve => {
          videoRef.current.onloadedmetadata =
            () => {
              resolve()
            }
        }
      )

      await videoRef.current.play()

      // TENSORFLOW

      await tf.setBackend(
        'webgl'
      )

      await tf.ready()

      console.log(
        'TensorFlow Ready'
      )

      // FACE DETECTOR

      detectorRef.current =
        await faceDetection.createDetector(
          faceDetection
            .SupportedModels
            .MediaPipeFaceDetector,
          {
            runtime: 'tfjs',
          }
        )

      console.log(
        'Face Detector Loaded'
      )

      // OBJECT DETECTOR

      objectModelRef.current =
        await cocossd.load()

      console.log(
        'COCO SSD Loaded'
      )

      // START

      startDetection()
    } catch (error) {
      console.log(
        'Initialization Error:',
        error
      )
    }
  }

  // ================= WARNINGS =================

  const increaseWarning =
    message => {
      setWarning(message)

      setWarningCount(prev => {
        const updated =
          prev + 1

        if (
          updated >= 3 &&
          !submittedRef.current
        ) {
          submittedRef.current =
            true

          alert(
            'Exam Auto Submitted'
          )

          stopAll()

          if (onAutoSubmit) {
            onAutoSubmit()
          }
        }

        return updated
      })
    }

  // ================= FACE DETECTION =================

  const detectFace = () => {
    faceIntervalRef.current =
      setInterval(async () => {
        try {
          if (
            !videoRef.current ||
            !detectorRef.current ||
            examEnded
          )
            return

          const faces =
            await detectorRef.current.estimateFaces(
              videoRef.current
            )

          console.log(
            'Faces:',
            faces
          )

          if (
            faces.length === 0
          ) {
            noFaceCount.current += 1

            if (
              noFaceCount.current >=
              3
            ) {
              increaseWarning(
                'Face Not Visible'
              )

              noFaceCount.current = 0
            }
          } else {
            noFaceCount.current = 0

            setWarning('')
          }
        } catch (error) {
          console.log(
            'Face Detection Error:',
            error
          )
        }
      }, 1000)
  }

  // ================= OBJECT DETECTION =================

  const detectObjects =
    () => {
      objectIntervalRef.current =
        setInterval(async () => {
          try {
            if (
              !videoRef.current ||
              !objectModelRef.current ||
              examEnded
            )
              return

            const predictions =
              await objectModelRef.current.detect(
                videoRef.current
              )

            console.log(
              predictions
            )

            const phoneDetected =
              predictions.find(
                prediction =>
                  prediction.class ===
                  'cell phone'
              )

            if (
              phoneDetected &&
              !submittedRef.current
            ) {
              submittedRef.current =
                true

              setObjectWarning(
                'Mobile Phone Detected'
              )

              alert(
                'Mobile Phone Detected → Exam Terminated'
              )

              stopAll()

              if (onAutoSubmit) {
                onAutoSubmit()
              }
            } else {
              setObjectWarning('')
            }
          } catch (error) {
            console.log(
              'Object Detection Error:',
              error
            )
          }
        }, 5000)
    }

  // ================= START =================

  const startDetection =
    () => {
      detectFace()

      detectObjects()
    }

  // ================= UI =================

  return (
    <div className='mb-5'>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width='350'
        height='250'
        className='rounded-xl border'
      />

      <div className='mt-3 text-red-500 font-bold'>
        Warnings:
        {warningCount}/3
      </div>

      {warning && (
        <div className='bg-red-500 text-white p-3 mt-3 rounded-lg'>
          {warning}
        </div>
      )}

      {objectWarning && (
        <div className='bg-yellow-500 text-white p-3 mt-3 rounded-lg'>
          {objectWarning}
        </div>
      )}
    </div>
  )
}

export default Proctoring