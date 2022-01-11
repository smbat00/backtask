function showCategory(){
    $.ajax({
        url: '/api/category',
        method: "GET",
        dataType: "json",
        cache: false,
        success: function (category) {
            function categoryRec(data, parent_element) {
                for (var i = 0; i < data.length; i++) {
                    $('#' + parent_element).append(`
                                    <li id="par_${data[i]['id']}" >
                                    <div style="padding: 1px 0 1px 0" data-catid="${data[i]['id']}" id="cat_${data[i]['id']}">${data[i]['name']}
                                    <!-- Button trigger modal -->
                                    <span  class="btn btn-outline-secondary editButton" data-bs-toggle="modal" data-bs-target="#exampleModal" data-catid="${data[i]['id']}" data-catname="${data[i]['name']}">
                                      Edit
                                    </span>
                                    </div>
                                       <ol id="${parent_element + '_' + i}" ></ol>

                                    </li>

                    `)
                    if (data[i]['children_categories'].length > 0) {
                        const child_data = data[i]['children_categories']
                        const child_parent_element = parent_element + '_' + i
                        categoryRec(child_data, child_parent_element);
                    }
                }
            }
            for (let j = 0; j < category['category'].length; j++) {
                $('#categoryShowList').append(`
                            <li >
                                <div data-catid="${category['category'][j]['id']}" id="cat_${category['category'][j]['id']}">${category['category'][j]['name']}</div>
                                <ol id="parent_${j}" ></ol>
                            </li>
                            `)
                categoryRec(category['category'][j]['children_categories'], 'parent_' + j)
            }
            $('.editButton').click(function (){
                $('#exampleModal').css('display','block')
                $('#catName').val($(this)[0].getAttribute('data-catname'))
                $('#catId').val($(this)[0].getAttribute('data-catid'))
            })
        }
    })
}
showCategory()
