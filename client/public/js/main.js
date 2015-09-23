
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

//POST - add new exercise to db from form submit
$('form').on('submit', function(e){
  e.preventDefault();

  var $exerciseName = $('#exercise-name').val();
  var $exerciseDescription = $('#exercise-description').val();
  var $exerciseTags = $('#exercise-tags').val();

  var payload = {
    name: $exerciseName,
    description: $exerciseDescription,
    tags: $exerciseTags,
  };

  $.post('/exercises', payload, function(data){
    $('#message').html(data.Message);
    $(':input', 'form').val('');
    $('#all-exercises').html("");
    $('#message').show();
    renderExercises();
  });
});

// //open edit modal and set field values
// $(document).on('click', '.edit-button', function(){
//   $('#message').hide();
//   $.get('/hike/'+$(this).attr('id'), function(data){
//     $('#edit-exercise-name').val(data.Name);
//     $('#edit-exercise-description').val(data.Location);
//     $('#edit-exercise-tags').val(data.Difficulty);
//     $('#edit-hike-duration').val(data.Duration);
//     $('.save-changes').attr('id', data._id);
//   });
// });

// //PUT - update hike in db
// //if nothing changed in edit modal form...do not display success message
// // $('#edit-modal').one('change', ':input', function() {
// //only works on first time...why???
//   $(document).on('click', '.save-changes', function(){

//     var $updatedName = $('#edit-exercise-name').val();
//     var $updatedLocation = $('#edit-exercise-description').val();
//     var $updatedDifficulty = $('#edit-exercise-tags').val();
//     var $updatedDuration = $('#edit-hike-duration').val();

//     var payload = {
//       Name: $updatedName,
//       Location: $updatedLocation,
//       Difficulty: $updatedDifficulty,
//       Duration: $updatedDuration
//     };

//     $.ajax({
//       method: 'PUT',
//       url: 'hike/'+$(this).attr('id'),
//       data: payload
//     })
//     .done(function(data){
//       $('#message').html(data.Message);
//       $('#all-hikes').html("");
//       $('#message').show();
//       renderExercises();
//     });
//   });
// // });

// //open delete modal and sets yes button attribute to hike id
// $(document).on('click', '.delete-button', function(){
//   $('#message').hide();
//   $.get('/hike/'+$(this).attr('id'), function(data){
//     $('.yes-delete').attr('id', data._id);
//   });
// });

// //DELETE - delete hike from dom and db
// $(document).on('click', '.yes-delete', function(){
//   $.ajax({
//     method: 'DELETE',
//     url: '/hike/'+$(this).attr('id'),
//   })
//   .done(function(data){
//     $('#message').html(data.Message);
//     $('#all-hikes').html("");
//     $('#message').show();
//     renderExercises();
//   });
// });
