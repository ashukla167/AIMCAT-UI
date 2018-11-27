import "./style.css";
import NProgress from 'nprogress';
(function (document) {

  var currentQu = 1;
  var testNum = "", sectionId = "";
  var currentData;
  var testArr = [];
  for (let i = 1801; i <= 1825; i++) { testArr.push(i) }
  for (let i = 1901; i <= 1925; i++) { testArr.push(i) }

  var moveNext = () => {
    if (currentQu >= Object.keys(currentData).length) {
      alert("No questions anymore");
      return;
    }
    currentQu++;
    rerenderCurrentQuestion(currentQu);
  };

  var movePrevious = () => {
    if (currentQu <= 1) {
      alert("No questions anymore");
      return;
    }
    currentQu--;
    rerenderCurrentQuestion(currentQu);
  };

  var showAnswer = () => {
    document.querySelector("#ans").style.visibility = "visible";
  };

  var showSoln = () => {
    var sectionUrl = sectionId == "QA" ? 3 : (sectionId == "VARC" ? 1 : 2);
    window.open(`https://www.time4education.com/moodle/aimcatsolutions/get-sol-view.asp?tno=${testNum}&sec=${sectionUrl}&qno=${currentQu}`)
  }

  var goToChooseScreen = () => {
    rerenderCurrentScreen();
  };

  var rerenderCurrentScreen = () => {
    var oldRoot = document.querySelector("#root");
    if (oldRoot) {
      oldRoot.remove();
    }

    var oldText = document.querySelector("#textele");
    if (oldText) oldText.remove();

    var newTemplate = getSelectionTemplate();
    document.body.insertAdjacentElement("beforeend", newTemplate);
  };

  var goToQuestionScreen = (evt, testId, section) => {
    NProgress.start();
    testNum = testId;
    sectionId = section;
    import(`./static/${testId}/${testId}_${section}.json`).then(({ default: data }) => {
      NProgress.done();
      currentData = data;
      rerenderCurrentQuestion(1);
    })
  };

  var getSelectionTemplate = () => {
    let testBtns = [];

    testArr.forEach(val => {
      let nameDiv = document.createElement("div");
      nameDiv.innerHTML = `AIMCAT ${val}`;
      ["VARC", "DILR", "QA"].forEach(ele => {
        nameDiv.insertAdjacentElement("beforeend", getBoxEle(val, ele));
      });
      testBtns.push(nameDiv);
    })

    let retElement = document.createElement("div");
    retElement.id = "root";
    testBtns.forEach(obj => {
      retElement.insertAdjacentElement("beforeend", obj);
    });
    return retElement;
  };

  var getBoxEle = (testId, section) => {
    var boxEle = document.createElement("button");
    boxEle.className = "btn";
    boxEle.innerHTML = section;
    boxEle.addEventListener("click", event =>
      goToQuestionScreen(event, testId, section)
    );
    return boxEle;
  };

  var rerenderCurrentQuestion = queNo => {
    var newTemplate = popUpTemplate(queNo);
    var oldRoot = document.querySelector("#root");
    if (oldRoot) {
      oldRoot.remove();
    }

    var oldText = document.querySelector("#textele");
    if (oldText) oldText.remove();

    document.body.insertAdjacentHTML("beforeend", newTemplate);
    document.body.insertAdjacentHTML("beforeend", textAreaEle);

    document
      .querySelector("#btn-move-prev")
      .addEventListener("click", movePrevious);
    document.querySelector("#btn-move-next").addEventListener("click", moveNext);
    document.querySelector("#btn-ans").addEventListener("click", showAnswer);
    document.querySelector("#btn-soln").addEventListener("click", showSoln);
    document
      .querySelector("#btn-choosetest")
      .addEventListener("click", goToChooseScreen);
    document.querySelector("#ans").style.visibility = "hidden";
  };

  const popUpTemplate = queNo => {
    var currentQuestion = `qu${queNo}`;
    if (currentData[currentQuestion].QUESTION_TYPE == "7")
      return `<div id="root">
        <button id="btn-move-prev">Previous</button>
        <button id="btn-move-next">Next</button>
        <button id="btn-ans">Show Answer</button>
        <button id="btn-soln">Show Solution</button>
        <button id="btn-choosetest">Choose Test</button>
        <div id="ans" style="visibility: hidden;">${
        currentData[currentQuestion].ENGLISH.CORRECT_ANSWER
        }</div>
        <div>${currentData[currentQuestion].ENGLISH.EASSY_DETAILS}</div>
        ${currentData[currentQuestion].ENGLISH.QUESTION_TEXT}
        ${currentData[currentQuestion].ENGLISH.OPT1}
        ${currentData[currentQuestion].ENGLISH.OPT2}
        ${currentData[currentQuestion].ENGLISH.OPT3}
        ${currentData[currentQuestion].ENGLISH.OPT4}
      </div>`;
    else
      return `<div id="root">
        <button id="btn-move-prev">Previous</button>
        <button id="btn-move-next">Next</button>
        <button id="btn-ans">Show Answer</button>
        <button id="btn-soln">Show Solution</button>
        <button id="btn-choosetest">Choose Test</button>
        <div id="ans" style="visibility: hidden;">${
        currentData[currentQuestion].ENGLISH.CORRECT_ANSWER
        }</div>
        <div>${currentData[currentQuestion].ENGLISH.EASSY_DETAILS}</div>
        ${currentData[currentQuestion].ENGLISH.QUESTION_TEXT}
      </div>`;
  };

  const textAreaEle = `<textarea rows="10" cols="200" id="textele"></textarea>`;

  import('./data').then(({ default: data }) => {
    currentData = data;
    goToChooseScreen();
  })
})(document);
