$("#editCategoryName").click(function(){
    console.log('ok')
    let catName = $('#catName').val();
    let catId = $('#catId').val();
    $.ajax({
        type:'PUT',
        url:'/api/category',
        dataType: 'json',
        cache: false,
        crossDomain: false,
        data: {
            catId: catId,
            catName: catName,
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
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
