//TO DO: get tags working properly

$(document).on('ready', function() {
  renderExercises();
  $('#message').hide();
  $('#exercise-table').hide();
});

//helper function to render exercises
function renderExercises(){
  $.get('/exercises', function(data){
    for (var i = 0; i < data.length; i++) {

      // var tags = data[i].tags[0].split(',');

      // for (var j = 0; j < tags.length; j++) {
      //   var tagsDisplay = '<p>'+tags[j]+'</p>';

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
    // }
  });
}

//toggle all exercises table
$('#show-all').on('click', function(){
  $('#exercise-table').toggle('show');
});

//POST - add new exercise to db from modal submit
$(document).on('click', '#save-exercise', function(e){
  e.preventDefault();

  var $exerciseName = $('#add-exercise-name').val();
  var $exerciseDescription = $('#add-exercise-description').val();
  // var $exerciseTags = $('#exercise-tags').tagsinput('items');
  var $exerciseTags = $('#add-exercise-tags').val();

  var payload = {
    name: $exerciseName,
    description: $exerciseDescription,
    tags: $exerciseTags,
  };
  $.post('/exercises', payload, function(data){
    $('#message').html(data.Message);
    $(':input', '#add-modal').val('');
    $('#add-exercise-tags').tagsinput('removeAll');
    $('#all-exercises').html("");
    $('#message').show();
    $('#exercise-table').show();
    renderExercises();
  });
});

//open edit modal and set field values
$(document).on('click', '.edit-button', function(){
  $('#message').hide();
  $.get('/exercise/'+$(this).attr('id'), function(data){
    $('#edit-exercise-name').val(data.name);
    $('#edit-exercise-description').val(data.description);
    $('#edit-exercise-tags').val(data.tags);
    $('.save-changes').attr('id', data._id);
  });
});

//PUT - update exercise in db
//TO FIX:
//if nothing changed in edit modal form...do not display success message
// $('#edit-modal').one('change', ':input', function() {
//only works on first time...why???
  $(document).on('click', '.save-changes', function(){

    var $updatedName = $('#edit-exercise-name').val();
    var $updatedDescription = $('#edit-exercise-description').val();
    var $updatedTags = $('#edit-exercise-tags').val();

    var payload = {
      name: $updatedName,
      description: $updatedDescription,
      Tags: $updatedTags,
    };

    $.ajax({
      method: 'PUT',
      url: '/exercise/'+$(this).attr('id'),
      data: payload
    })
    .done(function(data){
      $('#message').html(data.Message);
      $('#all-exercises').html("");
      $('#message').show();
      renderExercises();
    });
  });
// });

//open delete modal and sets yes button attribute to hike id
$(document).on('click', '.delete-button', function(){
  $('#message').hide();
  $.get('/exercise/'+$(this).attr('id'), function(data){
    $('.yes-delete').attr('id', data._id);
  });
});

//DELETE - delete hike from dom and db
$(document).on('click', '.yes-delete', function(){
  $.ajax({
    method: 'DELETE',
    url: '/exercise/'+$(this).attr('id'),
  })
  .done(function(data){
    $('#message').html(data.Message);
    $('#all-exercises').html("");
    $('#message').show();
    renderExercises();
  });
});
