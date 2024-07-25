import { Quiz } from "./quiz.js";

export class Settings {
  constructor() {
    this.chooseCategory = document.querySelector("#category");
    this.chooseDifficulty = document.querySelector("#Difficulty");
    this.chooseNumber = document.querySelector("#numberOfQuestions");
    document
      .getElementById("startBtn")
      .addEventListener("click", this.startQues.bind(this));
  }

  async startQues() {
    let category = this.chooseCategory.value;
    let number = this.chooseNumber.value;
    let difficulty = this.chooseDifficulty.value;
    await this.checkDataEmptyOrNot(category, number, difficulty);
  }

  async checkDataEmptyOrNot(category, number, difficulty) {
    if (number === "") {
      $(".alert").fadeIn(300);
    } else {
      $(".alert").fadeOut(100);
      let API = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`;
      try {
        let questions = await this.getAPI(API);
        $("#settings").fadeOut(300, function () {
          $("#quiz").fadeIn(300);
        });
        const quiz = new Quiz(questions);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    }
  }

  async getAPI(API) {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const finalResponse = await response.json();
    return finalResponse.results;
  }
}
