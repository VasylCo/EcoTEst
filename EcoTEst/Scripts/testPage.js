
let countAnswers = 0;
let countPages = 0;
function checkResult() {
    let answer = $('input:checked').val();
    if (!answer) {
        alert("Зробіть вибір!");
        return false;
    }
    else if (questions[countPages][answer] === questions[countPages]["RightAnswer"]) {
        //alert("you are right!");
        countAnswers++;
    } 
    countPages++;
    return true;
}
function nextQuestion() {
    if (checkResult()) {
        renderPage(countPages);
    }
    
}
function sendResult() {
   if (checkResult()) {
       $.ajax({
           url: '/Test/Result',
           type: 'POST',
           dataType: 'text',
           data: { result : countAnswers },
           //async: false,
           success: function (result, status, xhr) {
               $("#test").html(`<h2>Ваш результат - ${result} з 10!</h2><a href="/Test" class ="btn btn-primary btn-lg">Спробувати ще раз</a>`);
           },
           error: function (xhr, status, error) {
               $("#test").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
           }
       });
   }
    
}
function renderPage(index) {
    $('#test').empty();
    $('#test').append(`<h4>Запитання ${countPages + 1} з 10</h4>`)
    $('#test').append(`<h3>${questions[index]["Question1"]}</h3><br>`)
    $('#test').append(`<label class="btn btn-default btn-lg"><input type="radio" name="qestion" value="FirstAnswer"/>${questions[index]["FirstAnswer"]}</label><br>`);
    $('#test').append(`<label class="btn btn-default btn-lg"><input type="radio" name="qestion" value="SecondAnswer"/>${questions[index]["SecondAnswer"]}</label><br>`);
    $('#test').append(`<label class="btn btn-default btn-lg"><input type="radio" name="qestion" value="ThirdAnswer"/>${questions[index]["ThirdAnswer"]}</label><br>`);
    if (countPages === 9) {
        $('#test').append('<br><a  class="btn btn-success btn-lg" id="resultButton">Результат</a>');
        $('#resultButton').click(sendResult);
    } else {
        $('#test').append('<br><a class="btn btn-primary btn-lg" id="nextButton">Далі</a>');
        $('#nextButton').click(nextQuestion);
    }
    
}
$('document').ready(renderPage(countPages));
