$(function() {
    console.log( "ready!" );

    $('button').click(function() {
        let column = $('#input1').val()
        let search = $('#input2').val()
        $.ajax({
            type: "POST",
            url: '/',
            data: {column,search},
            success: 'great',
            dataType: 'all'
          });
      });
});