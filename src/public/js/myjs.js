$(document).ready(function () {
    var courseId;
    var formDelete = document.forms['form-course-delete'];
    $('#exampleModal').on('show.bs.modal', function (event) {
        var clickDelete = $(event.relatedTarget);
        courseId = clickDelete.data('id');
    });
    $('.btn-confirm-delete').click(function () {
        console.log(courseId);
        formDelete.action = '/course/' + courseId + '?_method=DELETE';
        formDelete.submit();
    });

    // ========================================================= //

    //This code process flow check item in store course
    var checkBoxAll = $('#check-all'); //check box tag
    var itemsCheck = $('input[name="courseId[]"]'); //items check box tags

    //when clicked check all ==> all item checked
    checkBoxAll.change(function () {
        var isCheckedAll = $(this).prop('checked'); //return true or false
        itemsCheck.prop('checked', isCheckedAll);
        enableSubmitBtn();
    });

    itemsCheck.change(function () {
        var isCheckedAll =
            itemsCheck.length === $('input[name="courseId[]"]:checked').length
                ? true
                : false; //return true or false
        //if lengthItem = lengthItemChecked --> checkAll have to checked
        checkBoxAll.prop('checked', isCheckedAll);
        enableSubmitBtn();
    });

    var submitBtnAction = $('.btn-submit-action');
    var containerForm = $('.container-form');

    //enable submit btn || remove class disabled
    function enableSubmitBtn() {
        var checkedCount = $('input[name="courseId[]"]:checked').length;
        if (checkedCount > 0) {
            //enable btn submit
            submitBtnAction.removeClass('disabled');
        } else {
            submitBtnAction.addClass('disabled');
        }
    }

    //Listen action submit in browser
    containerForm.on('submit', function (e) {
        var isSubmitable = !$(submitBtnAction).hasClass('disabled');
        if (!isSubmitable) {
            e.preventDefault();
        }
    });
    // ========================================================= //
});
