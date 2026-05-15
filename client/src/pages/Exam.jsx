import {
  useEffect,
  useState,
} from 'react'

import axios from 'axios'

import Proctoring from '../components/Proctoring'

function Exam() {
  const [questions,
    setQuestions] =
    useState([])

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0)

  const [answers,
    setAnswers] =
    useState([])

  const [score,
    setScore] =
    useState(null)

  const [timer,
    setTimer] =
    useState(60)

  const [examStarted,
    setExamStarted] =
    useState(false)

  const [
    allowFullscreenDetection,
    setAllowFullscreenDetection,
  ] = useState(false)

  // ================= FETCH QUESTIONS =================
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions =
    async () => {
      try {
        const response =
          await axios.get(
            'https://ai-proctored-exam-system-backend.onrender.com/api/questions'
          )

        setQuestions(
          response.data
        )

        setAnswers(
          Array(
            response.data.length
          ).fill('')
        )
      } catch (error) {
        console.log(error)
      }
    }

  // ================= START EXAM =================
  const startExam =
    async () => {
      try {
        // CAMERA PERMISSION FIRST
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
            }
          )

        // STOP TEMP STREAM
        stream
          .getTracks()
          .forEach(track =>
            track.stop()
          )

        // ENTER FULLSCREEN
        if (
          document.documentElement
            .requestFullscreen
        ) {
          await document.documentElement.requestFullscreen()
        }

        setExamStarted(true)

        // ENABLE FULLSCREEN DETECTION AFTER FEW SECONDS
        setTimeout(() => {
          setAllowFullscreenDetection(
            true
          )
        }, 3000)
      } catch (error) {
        console.log(error)

        alert(
          'Camera Permission Required'
        )
      }
    }

  // ================= TIMER =================
  useEffect(() => {
    if (
      timer > 0 &&
      score === null &&
      examStarted
    ) {
      const interval =
        setInterval(() => {
          setTimer(prev =>
            prev - 1
          )
        }, 1000)

      return () =>
        clearInterval(interval)
    }

    if (timer === 0) {
      submitExam()
    }
  }, [
    timer,
    score,
    examStarted,
  ])

  // ================= TAB SWITCH DETECTION =================
  useEffect(() => {
    const handleVisibility =
      () => {
        if (
          document.hidden &&
          score === null &&
          examStarted
        ) {
          alert(
            'Tab Switching Detected. Exam Auto Submitted.'
          )

          submitExam()
        }
      }

    document.addEventListener(
      'visibilitychange',
      handleVisibility
    )

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      )
    }
  }, [
    score,
    examStarted,
  ])

  // ================= FULLSCREEN EXIT DETECTION =================
  useEffect(() => {
    const handleFullscreenChange =
      () => {
        if (
          !document.fullscreenElement &&
          score === null &&
          examStarted &&
          allowFullscreenDetection
        ) {
          alert(
            'Fullscreen Exited. Exam Auto Submitted.'
          )

          submitExam()
        }
      }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      )
    }
  }, [
    score,
    examStarted,
    allowFullscreenDetection,
  ])

  // ================= HANDLE ANSWER =================
  const handleAnswer =
    option => {
      const updatedAnswers =
        [...answers]

      updatedAnswers[
        currentQuestion
      ] = option

      setAnswers(
        updatedAnswers
      )
    }

  // ================= NEXT QUESTION =================
  const nextQuestion =
    () => {
      if (
        currentQuestion <
        questions.length - 1
      ) {
        setCurrentQuestion(
          currentQuestion + 1
        )
      }
    }

  // ================= PREVIOUS QUESTION =================
  const previousQuestion =
    () => {
      if (
        currentQuestion > 0
      ) {
        setCurrentQuestion(
          currentQuestion - 1
        )
      }
    }

  // ================= SUBMIT EXAM =================
  const submitExam =
    async () => {
      if (
        score !== null ||
        questions.length === 0
      )
        return

      let totalScore = 0

      answers.forEach(
        (
          answer,
          index
        ) => {
          if (
            answer ===
            questions[index]
              ?.answer
          ) {
            totalScore++
          }
        }
      )

      try {
        await axios.post(
          'https://ai-proctored-exam-system-backend.onrender.com/api/results',
          {
            studentName:
              localStorage.getItem(
                'name'
              ),

            email:
              localStorage.getItem(
                'email'
              ),

            score: totalScore,

            totalQuestions:
              questions.length,

            warnings: 0,
          }
        )

        console.log(
          'Result Saved'
        )
      } catch (error) {
        console.log(error)
      }

      setScore(totalScore)
    }

  // ================= LOADING =================
  if (
    questions.length === 0
  ) {
    return (
      <h1 className='text-4xl p-10 text-white bg-black min-h-screen'>
        Loading Questions...
      </h1>
    )
  }

  // ================= RESULT PAGE =================
  if (score !== null) {
    return (
      <div className='p-10 min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white flex items-center justify-center'>

        <div className='bg-purple-900/30 backdrop-blur-lg border border-purple-700 p-10 rounded-3xl shadow-2xl text-center w-full max-w-2xl'>

          <h1 className='text-5xl font-bold mb-5'>
            Exam Submitted
          </h1>

          <h2 className='text-3xl mb-5'>
            Score: {score}/
            {questions.length}
          </h2>

          <p className='text-purple-300 text-xl font-semibold'>
            AI Monitoring Completed
          </p>

        </div>
      </div>
    )
  }

  // ================= MAIN UI =================
  return (
    <div className='p-10 min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white'>

      {!examStarted && (
        <button
          onClick={startExam}
          className='bg-purple-700 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl mb-6 text-xl'
        >
          Start Exam
        </button>
      )}

      {examStarted && (
        <>
          {/* PROCTORING */}
          <Proctoring
            onAutoSubmit={
              submitExam
            }
            examEnded={
              score !== null
            }
          />

          {/* HEADER */}
          <div className='flex justify-between items-center mb-10'>

            <h1 className='text-5xl font-bold'>
              MCQ Examination
            </h1>

            <div className='text-3xl font-bold text-red-400 bg-purple-900 px-6 py-3 rounded-2xl shadow-lg'>
              {timer}s
            </div>

          </div>

          {/* QUESTION CARD */}
          <div className='bg-purple-900/20 backdrop-blur-lg border border-purple-700 p-10 rounded-3xl shadow-2xl'>

            <h2 className='text-3xl mb-10'>
              {
                questions[
                  currentQuestion
                ]?.question
              }
            </h2>

            <div className='space-y-5'>

              {questions[
                currentQuestion
              ]?.options?.map(
                (
                  option,
                  index
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(
                        option
                      )
                    }
                    className={`border border-purple-600 p-5 w-full text-left rounded-2xl text-xl transition-all duration-300 ${
                      answers[
                        currentQuestion
                      ] === option
                        ? 'bg-purple-700 text-white'
                        : 'bg-black/40 hover:bg-purple-800/40'
                    }`}
                  >
                    {option}
                  </button>
                )
              )}

            </div>

            {/* BUTTONS */}
            <div className='flex gap-5 mt-10'>

              <button
                onClick={
                  previousQuestion
                }
                className='bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-2xl transition-all'
              >
                Previous
              </button>

              <button
                onClick={
                  nextQuestion
                }
                className='bg-purple-700 hover:bg-purple-600 text-white px-8 py-4 rounded-2xl transition-all'
              >
                Next
              </button>

              <button
                onClick={
                  submitExam
                }
                className='bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl transition-all'
              >
                Submit
              </button>

            </div>

          </div>
        </>
      )}
    </div>
  )
}

export default Exam