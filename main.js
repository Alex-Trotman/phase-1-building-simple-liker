// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const articleHearts = document.querySelectorAll(".like-glyph");
const errorModal = document.querySelector("#modal");
const errorMessage = document.querySelector("#modal-message");

const glyphStates = {
  '♡': '♥',
  '♥': '♡'
};

const colorStates = {
  'red': '', 
  '': 'red'  
};

function likeCallback(e) {
  const heart = e.target;
  mimicServerCall()
    .then(function(serverMessage){
      alert(serverMessage);
      heart.innerText = glyphStates[heart.innerText];
      heart.style.color = colorStates[heart.style.color];
    })
    .catch(function(error) {
      errorMessage.textContent = error; 
      errorModal.classList.remove('hidden'); 
      setTimeout(function () {
        errorModal.classList.add('hidden'); 
      }, 3000);
    });
}

for (const glyph of articleHearts) {
  glyph.addEventListener("click", likeCallback);
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
