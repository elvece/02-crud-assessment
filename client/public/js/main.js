
$(document).on('ready', function() {
  renderExercises();
  $('#message').hide();
});

//helper function to render exercises
function renderExercises(){
  $.get('/exercises', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all-exercises').append(
        '<tr>'+
          '<td>'+data[i].name+'</td>'+
          '<td>'+data[i].description+'</td>'+
          '<td>'+data[i].tags+'</td>'+
          '<td><a class="btn btn-primary btn-xs edit-button" data-toggle="modal" data-target="#edit-modal" id="'+data[i]._id+'" role="button">Edit</a>'+
          '&nbsp;<a class="btn btn-danger btn-xs delete-button" data-toggle="modal" data-target="#delete-modal" id="'+data[i]._id+'" role="button">Delete</a></td'+
        '</tr>'
      );
    }
  });
}
