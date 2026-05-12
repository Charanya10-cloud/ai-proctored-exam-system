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

  const [proctoringStarted,
    setProctoringStarted] =
    useState(false)

  // FETCH QUESTIONS
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions =
    async () => {
      try {
        const response =
          await axios.get(
            'http://localhost:5000/api/questions'
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

  // TIMER
  useEffect(() => {
    if (
      timer > 0 &&
      score === null
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
  }, [timer, score])

  // TAB SWITCH
  useEffect(() => {
    const handleVisibility =
      () => {
        if (
          document.hidden &&
          score === null &&
          proctoringStarted
        ) {
          alert(
            'Tab switching detected. Exam auto submitted.'
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
    proctoringStarted,
  ])

  // FULLSCREEN EXIT
  useEffect(() => {
    const handleFullscreen =
      () => {
        if (
          !document.fullscreenElement &&
          score === null &&
          proctoringStarted
        ) {
          alert(
            'Fullscreen exited. Exam auto submitted.'
          )

          submitExam()
        }
      }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreen
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreen
      )
    }
  }, [
    score,
    proctoringStarted,
  ])

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
        'http://localhost:5000/api/results',
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

  // LOADING
  if (
    questions.length === 0
  ) {
    return (
      <h1 className='text-4xl p-10'>
        Loading Questions...
      </h1>
    )
  }

  // RESULT PAGE
  if (score !== null) {
    return (
      <div className='p-10'>
        <div className='bg-white p-10 rounded-3xl shadow-lg'>

          <h1 className='text-5xl font-bold mb-5'>
            Exam Submitted
          </h1>

          <h2 className='text-3xl mb-5'>
            Score: {score}/
            {questions.length}
          </h2>

          <p className='text-red-500 text-xl font-semibold'>
            AI Monitoring Completed
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className='p-10 bg-gray-100 min-h-screen'>

      {/* PROCTORING */}
      <Proctoring
        onAutoSubmit={
          submitExam
        }
        onReady={() =>
          setProctoringStarted(
            true
          )
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

        <div className='text-3xl font-bold text-red-500'>
          {timer}s
        </div>

      </div>

      {/* QUESTION CARD */}
      <div className='bg-white p-10 rounded-3xl shadow-lg'>

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
                className={`border p-5 w-full text-left rounded-2xl text-xl ${
                  answers[
                    currentQuestion
                  ] === option
                    ? 'bg-black text-white'
                    : 'bg-white'
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
            className='bg-gray-500 text-white px-8 py-4 rounded-2xl'
          >
            Previous
          </button>

          <button
            onClick={
              nextQuestion
            }
            className='bg-blue-500 text-white px-8 py-4 rounded-2xl'
          >
            Next
          </button>

          <button
            onClick={
              submitExam
            }
            className='bg-green-500 text-white px-8 py-4 rounded-2xl'
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  )
}

export default Exam