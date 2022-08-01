document.getElementById('formWords').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value.toLowerCase() ;
  const word = { title };

  if (localStorage.getItem('words') === null) {
    let words = [];
    words.push(word);
    localStorage.setItem('words', JSON.stringify(words));
  } else {
    let words = JSON.parse(localStorage.getItem('words'));
    words.push(word);
    localStorage.setItem('words', JSON.stringify(words));
  }

  getTask();
  document.getElementById('formWords').request();
  e.preventDefault();
}

function getTask() {
  let word = JSON.parse(localStorage.getItem('words'));
  let tasksView = document.getElementById('tasks');
  
  let mapLettersAndRegex = new Map([
    ['a', 'a@4'],
    ['b', 'b38'],
    ['c', 'co0'],
    ['d', 'dbp'],
    ['e', 'e3'],
    ['f', 'f7'],
    ['g', 'gp'],
    ['h', 'h'],
    ['i', 'i1l!¡'],
    ['j', 'j7i'],
    ['k', 'k<q'],
    ['l', 'li¡!'],
    ['m', 'mnw'],
    ['n', 'nm'],
    ['ñ', 'ñnm'],
    ['o', 'o0'],
    ['p', 'pbdq'],
    ['q', 'qp'],
    ['r', 'r7'],
    ['s', 's$5'],
    ['t', 't7'],
    ['u', 'uv'],
    ['v', 'vu'],
    ['w', 'wv'],
    ['x', 'xk'],
    ['y', 'yv'],
    ['z', 'z2'],
    ['ç', 'ç'],
    [' ', '.'],
    ['á', 'á@4'],
    ['é', 'é3'],
    ['í', 'í1l!¡'],
    ['ó', 'ó0'],
    ['ú', 'úv'],
    ['à', 'à@4'],
    ['è', 'è3'],
    ['ì', 'ì1l!¡'],
    ['ò', 'ò0'],
    ['ù', 'ùv'],
  ]);
  tasksView.innerHTML = '';

  for (let i = 0; i < word.length; i++) {
    let title = word[i].title;
    let lettersArr = title.split('');
    let wordRegexArr = [];
    for (let i = 0; i < lettersArr.length; i++) {
      let letter = lettersArr[i];
      mapLettersAndRegex.get(letter);
      wordRegexArr.unshift(mapLettersAndRegex.get(letter));
    }
    let wordRegex = wordRegexArr.toString().replaceAll(',', '][');
    wordRegex = '[' + wordRegex + ']';
    tasksView.innerHTML += `<div class="card">
            <div class="card-body">
             <p>${title}</p>
             <p>${wordRegex}</p>
             <a class= "btn btn-danger" onclick= "deleteTask('${title}')">
             Delete
             </a>
            </div>
        </div>`;
  }
}

function deleteTask(title) {
  console.log(title);
  let words = JSON.parse(localStorage.getItem('words'));
  console.log(words);
  for (let i = 0; i < words.length; i++) {
    if (words[i].title == title) {
      words.splice(i, 1);
    }
  }
  localStorage.setItem('words', JSON.stringify(words));
  getTask();
}

getTask();
