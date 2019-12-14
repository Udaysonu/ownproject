{
 let postform=$('#post-form')
postform.submit(function(e){
    e.preventDefault();
     
       
    $.ajax({
        type:'post',
        url:'/feed/post_create',
        data:postform.serialize(),
        success:function(data){
           newpst=newpost(data.data.post);
           $("#feed_screen").prepend(newpst);

        },
        error:
        function(err){
            console.log(err);
        }
    })
})


let newpost=function(post){
    return $(`<li>
    <div id="post_div_${post._id}">
    <ul type='none'>
<li><small> <img width="40px" height="40px" style="border-radius:50%" src="${post.user.avatar}">  ${post.user.name}</small></li>
<li>${post.content} <a class="delete-post" href="/feed/destroy_post/${post._id}">delete</a> 
 
<form action="/feed/comment_create" method='post'>
<input type='text' value='${post.id}' name='post' hidden>
<input type='text' value="${post.user}" name='user' hidden>
<textarea placeholder="Comment ..... " name='content' ></textarea>
<button style='margin:10px' class="btn btn-outline-success my-2 my-sm-0" type="submit"> Comment</button>
</form>
 
</li>
 
</div></li>`)

}





$('.delete-post').click(function(e,x){
    console.log('delete is clicked')
    e.preventDefault();
    $.ajax({
        type:'get',
        url:$(this).attr('href'),
        success:function(data){
            console.log(data)
            console.log(data.data.post_id)
            $(`#post_div_${data.data.post_id}`).remove();
        },
        error:function(err){
            console.log(err)
        }
    })


    // console.log($(this),'prevented default delete',$(this).attr('href'));
})

}