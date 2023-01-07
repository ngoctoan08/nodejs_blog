$(document).ready(function() {
    var courseId;
    var formDelete = document.forms['form-course-delete'];
    $('#exampleModal').on('show.bs.modal', function(event) {
      var clickDelete = $(event.relatedTarget);
      courseId = clickDelete.data('id');
    })
    $('.btn-confirm-delete').click(function() {
      console.log(courseId);
      formDelete.action = '/course/' + courseId + '?_method=DELETE';
      formDelete.submit();
    })
          
          
  })