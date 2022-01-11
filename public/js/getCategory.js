function selectCategory(){
    $.ajax({
        url: '/api/category',
        method: "GET",
        dataType: "json",
        cache: false,
        success: function (category) {
            function categoryRec(data,space) {
                for (var i = 0; i < data.length; i++) {
                        $('#parent_id').append(`<option value="${data[i]['id']}">${space + data[i]['name']}</option>`)
                        if (data[i]['children_categories'].length > 0) {
                            const child_data = data[i]['children_categories']
                            const child_space = space+'-'
                            categoryRec(child_data,child_space);
                    }
                }
            }
            for(let j = 0;j<category['category'].length;j++){
                $('#parent_id').append(`<option value="${category['category'][j]['id']}">${category['category'][j]['name']}</option>`)
                categoryRec(category['category'][j]['children_categories'],'-')
            }
        }
    })
}
selectCategory()
