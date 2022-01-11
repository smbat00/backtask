function categoryForDrop(){
    $.ajax({
    url: '/api/category',
    method: "GET",
    dataType: "json",
    cache: false,
    success: function (category) {
        console.log(category)
        function categoryRec(data,parent_element) {

            // debugger;
            for (let i = 0; i < data.length; i++) {
                console.log(i)
                $('#'+parent_element).append(`
                        <li id="par_${data[i]['id']}" >
                        <div style="cursor: pointer" data-catid="${data[i]['id']}" id="cat_${data[i]['id']}">${ data[i]['name']}</div>
                           <ol id="${parent_element + '_' + i}" ></ol>
                        </li>
                    `);

                if (data[i]['children_categories'].length > 0) {
                    const child_data = data[i]['children_categories'];
                    const child_parent_element = parent_element+ '_' + i;
                    categoryRec(child_data,child_parent_element);
                }
            }
        }

        for(let j = 0;j<category['category'].length;j++){
            $('#categoryList').append(`
                        <li >
                            <div style="pointer-events: none; " data-catid="${category['category'][j]['id']}" id="cat_${category['category'][j]['id']}">${category['category'][j]['name']}</div>
                            <ol  id="parent_${j}" ></ol>
                        </li>
                    `);

            categoryRec(category['category'][j]['children_categories'],'parent_'+j)
        }
    },
    error:function(error){
        console.log('e')
    }

})

    $('.sortable').nestedSortable({
        handle: 'div',
        items: 'li',
        toleranceElement: '> div'
    });
}
categoryForDrop()
let moved
let downListener = () => {
    moved = false
}
let element = document.getElementById('categoryList')
element.addEventListener('mousedown', downListener)
let moveListener = () => {
    moved = true
}
element.addEventListener('mousemove', moveListener)
let upListener = (e) => {
    if (moved) {
        let target = $(e.target), article;
        let category_id = target[0].getAttribute("data-catid");
        setTimeout(function (){
            console.log(target.parent().parent())
            let mcat = target.parent().parent().parent();
            let parElement = mcat.children('div');

            if(parElement.length<1){
                $('#categoryList').html('')
                categoryForDrop()
                return;
            }
            let category_parent_id = parElement[0].getAttribute("data-catid");

            $.ajax({
                type:'put',
                url:'/api/category/parent',
                dataType: 'json',
                cache: false,
                crossDomain: false,
                data: {
                    category_id: category_id,
                    category_parent_id: category_parent_id,
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (res) {
                    console.log(res)
                }
            })
        },1000)
    }
}
element.addEventListener('mouseup', upListener)
