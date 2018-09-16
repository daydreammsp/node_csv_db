$(function() {
    console.log( "ready!" );

    $('button').click(function() {
        let column = $('#input1').val()
        let search = $('#input2').val()
        $.post( "/", {column,search})
            .done(function(data) {
                console.log(data)
                $('#input1').val('')
                $('#input2').val('')
            });
        
      });
});