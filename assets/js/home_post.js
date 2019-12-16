{
   
let createform=function(){
     let newpostform=$('#post-form');
     newpostform.submit(function(e){
         e.preventDefault();
         $.ajax({
            type:'post',
            url:'/feed/post_create',
            data:newpostform.serialize(),
            success:function(data){
               newpst=newpost(data.data.post);
               $("#post_create").prepend(newpst);
                deletePost($(' .delete-post',newpst));
            },
            error:
            function(err){
                console.log(err);
            }
        })
     })
   
 }

let newpost=function(post){
    return $(` 
    <div id="post_div_${post._id}">
     
<li><small> <img width="40px" height="40px" style="border-radius:50%" src="${post.user.avatar}">  ${post.user.name}</small></li>
<li>${post.content} <a class="delete-post" href="/feed/destroy_post/${post._id}"> delete</a> 
 
<form action="/feed/comment_create" method='post'>
<input type='text' value='${post._id}' name='post' hidden>
<input type='text' value="${post.user}" name='user' hidden>
<textarea placeholder="Comment ..... " name='content' ></textarea>
<button style='margin:10px' class="btn btn-outline-success my-2 my-sm-0" type="submit"> Comment</button>
</form>
 
 
 
</div>

 
`)

};

let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                console.log("Data post delete")
                console.log(data.data.post_id)
                $(`#post_div_${data.data.post_id}`).remove()
            },error:function(err){
                console.log('Error in Console Data');
                console.log(error.responseText);
            }
        })
    })
}









 createform();

}