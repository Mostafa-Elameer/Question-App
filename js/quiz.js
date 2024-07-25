import { Finish } from "./finsh.js";

export class Quiz {
  constructor(questions) {
    this.questionSelector = document.querySelector("#question");
    this.allAnswer = document.querySelector("#rowAnswer");
    this.currentOfQuiz = document.querySelector("#currentQuestion");
    this.totalQuestion = document.querySelector("#totalNumberOfQuestions");
    this.myQuestions = questions;
    this.current = 0;
    this.score = 0; // Initialize score
    this.displayQuestions();
    document.querySelector("#next").addEventListener("click", this.displayNextQuestion.bind(this));
  }

  displayQuestions() {
    this.currentOfQuiz.innerHTML = this.current + 1;
    this.totalQuestion.innerHTML = this.myQuestions.length;
    this.questionSelector.innerHTML = this.myQuestions[this.current].question;
    let incorrect_answers = this.myQuestions[this.current].incorrect_answers;
    let correct_answer = this.myQuestions[this.current].correct_answer;
    let arrForAllAnswers = [...incorrect_answers, correct_answer];
    let box = ``;
    for (let i = 0; i < arrForAllAnswers.length; i++) {
      box += `
        <div class="form-check ms-2">
          <label class="form-check-label mb-1">
            <input type="radio" class="form-check-input" name="answer" value="${arrForAllAnswers[i]}">
            ${arrForAllAnswers[i]}
          </label>
        </div>
      `;
    }
    this.allAnswer.innerHTML = box;

    // Add event listener for immediate feedback
    this.allAnswer.addEventListener("change", this.checkAnswer.bind(this));
  }

  checkAnswer() {
    let selectedAnswer = Array.from(document.getElementsByName("answer")).find(
      (answer) => answer.checked
    );

    if (selectedAnswer) {
      let allAnswers = document.querySelectorAll(".form-check");

      allAnswers.forEach((answer) => {
        let input = answer.querySelector("input");
        if (input.value === this.myQuestions[this.current].correct_answer) {
          answer.classList.add("correct-answer");
        } else if (input === selectedAnswer) {
          answer.classList.add("incorrect-answer");
        } else {
          answer.classList.remove("correct-answer", "incorrect-answer");
        }
      });

      if (selectedAnswer.value === this.myQuestions[this.current].correct_answer) {
        this.score++;
      }

      // Disable the 'Next' button to prevent multiple clicks
      document.querySelector("#next").disabled = true;

      // Wait before moving to the next question
      setTimeout(() => {
        this.current++;
        if (this.current < this.myQuestions.length) {
          this.displayQuestions();
          document.querySelector("#next").disabled = false; // Re-enable 'Next' button
        } else {
          this.finishQuiz();
        }
      }, 1500); // Adjust the delay as needed
    }
  }

  displayNextQuestion() {
    // Placeholder method if you need to handle something when 'Next' is clicked
  }

  finishQuiz() {
    new Finish(this.score, this.myQuestions.length);
  }
}
