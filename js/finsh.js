export class Finish {
  constructor(score, totalQuestions) {
    this.score = score;
    this.totalQuestions = totalQuestions;
    this.resultContainer = document.querySelector("#finish");
    this.displayResult();
  }

  displayResult() {
    this.resultContainer.innerHTML = `
      <h2>Quiz Finished</h2>
      <p>Your Score: ${this.score} out of ${this.totalQuestions}</p>
      <button
        class="btn py-2 px-4 mainColor rounded-pill text-white my-4"
        id="tryAgainBtn"
      >
        Try Again?
      </button>
    `;
    $("#quiz").fadeOut(300, () => {
      $("#finish").fadeIn(300);
      document.querySelector("#tryAgainBtn").addEventListener("click", () => {
        location.reload(); 
      });
    });
  }
}