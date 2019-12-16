
$('.delete-post').click(function(e,x){
    console.log('delete is clicked')
    e.preventDefault();
  
    $.ajax({
        type:'get',
        url:$(this).attr('href'),
        success:function(data){
            console.log(data.data.post_id)
            console.log(data.data.post_id)
            $(`#post_div_${data.data.post_id}`).remove();
        },
        error:function(err){
            console.log(err)
        }
    })


    // console.log($(this),'prevented default delete',$(this).attr('href'));
})

