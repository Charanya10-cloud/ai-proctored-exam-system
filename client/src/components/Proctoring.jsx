import {
  useEffect,
  useRef,
  useState,
} from 'react'

import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'

import * as cocossd from '@tensorflow-models/coco-ssd'

import * as faceDetection from '@tensorflow-models/face-detection'

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

  const multipleFaceCount =
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

  const [status,
    setStatus] =
    useState(
      'Monitoring Active'
    )

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
            video: {
              width: 320,
              height: 240,
              facingMode: 'user',
            },
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
          faceDetection.SupportedModels.MediaPipeFaceDetector,
          {
            runtime: 'tfjs',
            modelType: 'short',
            maxFaces: 5,
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

      // START DETECTION

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

          setStatus(
            'Exam Auto Submitted'
          )

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
            faces.length
          )

          // MULTIPLE FACES

          if (
            faces.length >= 2
          ) {

            multipleFaceCount.current += 1

            setStatus(
              'Multiple Faces Detected'
            )

            if (
              multipleFaceCount.current >= 2
            ) {

              increaseWarning(
                'Multiple Faces Detected'
              )

              multipleFaceCount.current = 0
            }

            return
          }

          // NO FACE

          if (
            faces.length === 0
          ) {

            noFaceCount.current += 1

            setStatus(
              'No Face Detected'
            )

            if (
              noFaceCount.current >= 2
            ) {

              increaseWarning(
                'Face Not Visible'
              )

              noFaceCount.current = 0
            }
          }

          // FACE PRESENT

          else {

            noFaceCount.current = 0

            multipleFaceCount.current = 0

            setWarning('')

            setStatus(
              'Face Detected'
            )
          }

        } catch (error) {

          console.log(
            'Face Detection Error:',
            error
          )
        }

      }, 300)
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
              'Objects:',
              predictions
            )

            const phoneDetected =
              predictions.find(
                prediction =>
                  prediction.class ===
                    'cell phone' &&
                  prediction.score >
                    0.60
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

              setStatus(
                'Mobile Phone Detected'
              )

              setTimeout(() => {

                alert(
                  'Mobile Phone Detected → Exam Terminated'
                )

                stopAll()

                if (onAutoSubmit) {
                  onAutoSubmit()
                }

              }, 500)

            } else {

              setObjectWarning('')
            }

          } catch (error) {

            console.log(
              'Object Detection Error:',
              error
            )
          }

        }, 1000)
    }

  // ================= START =================

  const startDetection =
    () => {

      detectFace()

      detectObjects()
    }

  // ================= UI =================

  return (
    <div className='mb-5 w-full flex flex-col items-start'>

      {/* TOP BAR */}

      <div className='w-full flex justify-between items-center mb-5'>

        {/* STATUS */}

        <div
          className={`px-6 py-3 rounded-2xl text-white font-bold text-lg shadow-xl transition-all duration-300 ${
            status ===
            'Face Detected'
              ? 'bg-green-500'
              : status ===
                'Monitoring Active'
              ? 'bg-blue-500'
              : status ===
                'Multiple Faces Detected'
              ? 'bg-orange-500 animate-pulse'
              : 'bg-red-500 animate-pulse'
          }`}
        >
          {status}
        </div>

        {/* WARNING COUNT */}

        <div className='text-red-400 font-bold text-xl'>
          Warnings:
          {warningCount}/3
        </div>

      </div>

      {/* VIDEO */}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width='350'
        height='250'
        className='rounded-3xl border-4 border-purple-500 shadow-2xl object-cover'
      />

      {/* FACE WARNING */}

      {warning && (
        <div className='bg-red-500 text-white px-6 py-4 mt-5 rounded-2xl font-bold shadow-xl animate-pulse'>
          {warning}
        </div>
      )}

      {/* OBJECT WARNING */}

      {objectWarning && (
        <div className='bg-yellow-500 text-white px-6 py-4 mt-5 rounded-2xl font-bold shadow-xl animate-pulse'>
          {objectWarning}
        </div>
      )}

    </div>
  )
}

export default Proctoring