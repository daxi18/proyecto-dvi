var profileImgInput = document.getElementById('profile-img-input');
var profileImg = document.getElementById('profile-img');
var clearProfileImgButton = document.getElementById('clear-profile-img');
var usernameInput = document.getElementById('username');

// Cargar datos guardados
if (localStorage.getItem('profileImg')) profileImg.src = localStorage.getItem('profileImg');
if (localStorage.getItem('username')) usernameInput.value = localStorage.getItem('username');
 
// Cambiar imagen de perfil
profileImgInput.addEventListener('change', function(e) {
  var reader = new FileReader();
  reader.onload = function() {
    profileImg.src = reader.result;
    localStorage.setItem('profileImg', reader.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Limpiar imagen de perfil
clearProfileImgButton.addEventListener('click', function() {
  profileImg.src = 'https://via.placeholder.com/80';
  localStorage.removeItem('profileImg');
});

// Guardar nombre de usuario
usernameInput.addEventListener('input', function(e) {
  localStorage.setItem('username', e.target.value);
});

// Publicar comentario
function postComment(category) {
  var text = document.getElementById('comment-text-' + category).value.trim();
  if (!text) return;

  var newComment = document.createElement('li');
  newComment.className = 'comment';
  newComment.innerHTML = '<div><img src="' + profileImg.src + '" alt="Perfil"><span>' + (usernameInput.value || 'Anónimo') + '</span></div><p>' + text + '</p>';
  
  document.getElementById('comments-list-' + category).appendChild(newComment);
  document.getElementById('comment-text-' + category).value = '';
}


// Establecer el video para el comentario
function setVideo(event, category) {
  const file = event.target.files[0];
  const videoPreview = document.getElementById(`video-preview-${category}`);
  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          videoPreview.style.display = 'block';
          videoPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
  }
}

// Modificar la función submitComment para incluir videos
function submitComment(category) {
  const text = document.getElementById(`comment-text-${category}`).value;
  if (text === '') return; // No publicar si el comentario está vacío

  const commentItem = document.createElement('li');
  commentItem.classList.add('comment');

  // Imagen de perfil
  const profileImage = document.createElement('img');
  profileImage.src = document.getElementById('profile-img').src;
  profileImage.classList.add('profile');
  commentItem.appendChild(profileImage);

  // Texto del comentario
  const commentText = document.createElement('p');
  commentText.classList.add('comment-text');
  commentText.textContent = text;
  commentItem.appendChild(commentText);

  // Imagen cuadrada
  const squareImage = document.getElementById(`square-img-${category}`);
  if (squareImage.style.display === 'block') {
      const img = document.createElement('img');
      img.src = squareImage.src;
      img.style.width = '200px';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      commentItem.appendChild(img);
  }

  // Video
  const videoPreview = document.getElementById(`video-preview-${category}`);
  if (videoPreview.style.display === 'block') {
      const video = document.createElement('video');
      video.src = videoPreview.src;
      video.controls = true;
      video.style.width = '200px';
      video.style.height = '150px';
      commentItem.appendChild(video);
  }

  // Agregar el comentario a la lista
  document.getElementById(`comments-list-${category}`).appendChild(commentItem);

  // Limpiar los campos
  document.getElementById(`comment-text-${category}`).value = '';
  document.getElementById(`square-img-${category}`).style.display = 'none';
  document.getElementById(`video-preview-${category}`).style.display = 'none';
}
