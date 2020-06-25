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

var correct_api = [];

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
//seleciona categoria
function selectCategory() {
    categoryID = document.getElementById('select-categories').value 
}
//seleccriona tipo de pregunta
function selectType() {
    type = document.getElementById('select-types').value
}
//se imprimen preguntas
function printCuestions(questions)
{
    const questions_form = document.getElementById('questions-form');
    let answers = [];
    correct_api = [];
    let index = 0;
    let html = '';
    if(type =='multiple')
    {
        questions.forEach(question =>
            {   
               
                html += `<div id="${index}" class="card mt-5 col-4 border-primary" style="width: 18rem;">
                              <div class="card-body">
                                  <h5 class="card-title text-justify">${question.question}</h5>
                                  <div class="ml-4 mt-3">
                                      <div class="radio">
                                          <label><input type="radio" name="${index}" value="${question.correct_answer}">${question.correct_answer}</input></label>
                                      </div>
                                      <div class="radio">
                                          <label><input type="radio" name="${index}" value="${question.incorrect_answers[0]}" checked>${question.incorrect_answers[0]}</input></label>
                                      </div>
                                      <div class="radio">
                                          <label><input type="radio" name="${index}" value="${question.incorrect_answers[1]}">${question.incorrect_answers[1]}</input></label>
                                      </div>
                                      <div class="radio">
                                          <label><input type="radio" name="${index}" value="${question.incorrect_answers[2]}">${question.incorrect_answers[2]}</input></label>
                                      </div>
                                  </div>
                              </div>
                          </div>`;
                if(index == questions.length - 1)
                {
                    html += `<div class="card mt-5 row col-8 ml-1 border-primary">
                                <div class="d-flex">
                                    <div class=" mt-5 col-6 " style="width: 18rem;">
                                        <h1 class="card-title text-center" id="correct" style="color: #33FF93;">0</h1>
                                        <h5 class="card-title text-center">Respuestas correctas</h5>
                                    </div>
                                    <div class=" mt-5 col-6 " style="width: 18rem;">
                                        <h1 class="card-title text-center " id="wrong" style="color: #FF3333;">0</h1>
                                        <h5 class="card-title text-center">Respuestas incorrectas</h5>
                                    </div>
                                </div>
                               
                                <button type="button" onclick="answers_user()" class="btn btn-primary btn-lg btn-block mt-3">Enviar Respuestas</button>
                            </div>`;      
                }     
                index ++; 
            });
    }
    else
    {   
        questions.forEach(question =>
            {
                if(question.correct_answer == "True")
                {
                    answers[0] = question.correct_answer;
                    answers[1] = question.incorrect_answers[0];
                    correct_api[index] = answers[0]; 
                }
                else
                {
                    answers[0] = question.incorrect_answers[0];
                    answers[1] = question.correct_answer;
                    correct_api[index] = answers[1];
                
                }
                html += `<div id="${index}" class="card mt-5 col-4 border-primary" style="width: 18rem;">
                              <div class="card-body">
                                  <h5 class="card-title text-justify">${question.question}</h5>
                                  <div class="ml-4 mt-3">
                                      <div class="radio">
                                           <label><input type="radio" name="${index}" value="${answers[0]}" checked>${answers[0]}</input></label>
                                      </div>
                                      <div class="radio">
                                           <label><input type="radio" name="${index}" value="${answers[1]}">${answers[1]}</input></label>
                                      </div>
                                  </div>
                              </div>
                          </div>`;

                          if(index == questions.length - 1)
                          {
                              html += `<div class="card mt-5 row col-8 ml-1 border-primary">
                                          <div class="d-flex">
                                              <div class=" mt-5 col-6 " style="width: 18rem;">
                                                  <h1 class="card-title text-center" id="correct" style="color: #33FF93;">0</h1>
                                                  <h5 class="card-title text-center">Respuestas correctas</h5>
                                              </div>
                                              <div class=" mt-5 col-6 " style="width: 18rem;">
                                                  <h1 class="card-title text-center " id="wrong" style="color: #FF3333;">0</h1>
                                                  <h5 class="card-title text-center">Respuestas incorrectas</h5>
                                              </div>
                                          </div>
                                         
                                          <button type="button" onclick="answers_user()" class="btn btn-primary btn-lg btn-block mt-3">Enviar Respuestas</button>
                                      </div>`;
                          }
                index++;      
            });
                      
    }

    questions_form.innerHTML = html

}
//obtengo preguntas de la api
function getCuestions()
{
    endpoint = `https://opentdb.com/api.php?amount=10&category=${categoryID}&type=${type}`

    fetch(endpoint)
        .then(response => response.json())
        .then(dataJson => {
            printCuestions(dataJson.results)
        })
        .catch(error => {
            console.error(error)
        })
}
//calculo respuestas de usuario
function answers_user()
{
    let options;
    let answers =[];
    let count = 0;
    let correct = 0;
    let wrong = 0;

    do
    {
        options= document.getElementsByName(count);
        options.forEach(option =>
                        {
                            if(type =="multiple")
                            {
                                correct_api[count] = options[0].value;
                            }
                            if(option.checked)
                            {
                                answers[count] = option.value;
                                if(answers[count]==correct_api[count])
                                {
                                    correct++;
                                    document.getElementById(count).className = "card mt-5 col-4 border-success";
                                }
                                else
                                {
                                    wrong++;
                                    document.getElementById(count).className = "card mt-5 col-4 border-danger";
                                }
                            }           
                        });
        count++;                
    }while(count < 10);

    let html_correct = document.getElementById("correct");
    let html_wrong = document.getElementById("wrong");

    html_correct.innerHTML = correct;
    html_wrong.innerHTML = wrong;

}

getCategories()