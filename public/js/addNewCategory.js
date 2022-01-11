$("#addCategory").click(function(){
  let parent_id = $('#parent_id').val();
   let category_name = $('#name').val();
    $.ajax({
        type:'POST',
        url:'/api/category',
        dataType: 'json',
        cache: false,
        crossDomain: false,
        data: {
            parent_id: parent_id,
            category_name: category_name,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            $('#parent_id').html('<option value=""></option>');
            selectCategory()
            $('#categoryShowList').html('');
            showCategory()
            let t = Date.now()
            $('#notification').append(`
                       <div id="alert_${t}" class="alert alert-success" role="alert">
                            ${res['messages']}
                       </div>
                    `)
            setTimeout(function (){
                $(`#alert_${t}`).remove()
            },3000)
        }
    })
});
