// Open Trivia
// https://opentdb.com/api_config.php

// Instrucciones
// 1. Muestra al usuario las distintas categorias entre las cuáles puede elegir para
// las preguntas
// 2. Le das al usuario la opción de elegir entre preguntas de opción múltiple o preguntas de
// verdadero o falso
// 3. Mostramos 10 preguntas aplicando los filtros anteriores junto con las respuestas posibles



// 3.1 El usuario selecciona las respuestas 
// 4. Le indicas al usuario cuántos aciertos tuvo y cuántos errores tuvo

var categoryID = 9;
var type = 'multiple';
var endpoint = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple'

// Está función se ecargara de obtener todas las categorías disponibles
function getCategories() {
    const endpointCategories = 'https://opentdb.com/api_category.php'
    fetch(endpointCategories)
        .then(response => response.json())
        .then(dataJson => {
            printCategories(dataJson.trivia_categories)
        })
        .catch(error => {
            console.error(error)
        })

}
// 1. obtengo el elemento donde quiero imprimir las categorías
// 2. Genero el html
// 3. Imprimo las categorías
function printCategories(categories) {
    const selectCategories = document.getElementById('select-categories')

    let html = ''
    categories.forEach(category => {
        html += `<option value="${category.id}">${category.name}</option>`
    });

    selectCategories.innerHTML = html
}

function selectCategory() {
    categoryID = document.getElementById('select-categories').value
    alert(`Se seleccionó la categoría con el id ${categoryID}`)  
}

function selectType() {
    type = document.getElementById('select-types').value
    alert(`Se seleccionó tipo de pregunta: ${type}`)
}
function printCuestions(questions)
{
    const questions_form = document.getElementById('questions-form');
    let answers = [];
    console.log(questions_form)
    console.log(questions)
    let html = '';
    if(type =='multiple')
    {
        questions.forEach(question =>
            {
                html += `<div class="card mt-5 col-4 " style="width: 18rem;">
                              <div class="card-body">
                                  <h5 class="card-title text-justify">${question.question}</h5>
                                  <div class="ml-4 mt-3">
                                      <div class="radio">
                                          <label><input type="radio" name="optradio" checked>${question.correct_answer}</label>
                                      </div>
                                      <div class="radio">
                                          <label><input type="radio" name="optradio">${question.incorrect_answers[0]}</label>
                                      </div>
                                      <div class="radio">
                                          <label><input type="radio" name="optradio" checked>${question.incorrect_answers[1]}</label>
                                      </div>
                                      <div class="radio">
                                          <label><input type="radio" name="optradio">${question.incorrect_answers[2]}</label>
                                      </div>
                                  </div>
                              </div>
                          </div>`;});
    }
    else
    {
        
        questions.forEach(question =>
            {
                if(question.correct_answer == "True")
                {
                    answers[0] = question.correct_answer;
                    answers[1] = question.incorrect_answers[0];
                }
                else
                {
                    answers[0] = question.incorrect_answers[0];
                    answers[1] = question.correct_answer;
                }
                html += `<div class="card mt-5 col-4 " style="width: 18rem;">
                              <div class="card-body">
                                  <h5 class="card-title text-justify">${question.question}</h5>
                                  <div class="ml-4 mt-3">
                                      <div class="radio">
                                           <label><input type="radio" name="optradio" checked>${answers[0]}</label>
                                      </div>
                                      <div class="radio">
                                           <label><input type="radio" name="optradio">${answers[1]}</label>
                                      </div>
                                  </div>
                              </div>
                          </div>`;});
    }
                                        
    questions_form.innerHTML = html
    
}
function getCuestions()
{
    alert(`se imprimiran preguntas`)
    endpoint = `https://opentdb.com/api.php?amount=10&category=${categoryID}&type=${type}`
    console.log(endpoint)

    fetch(endpoint)
        .then(response => response.json())
        .then(dataJson => {
            printCuestions(dataJson.results)
        })
        .catch(error => {
            console.error(error)
        })
}


getCategories()