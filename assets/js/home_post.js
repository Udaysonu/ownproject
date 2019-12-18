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
                new Noty({
                    theme:'relax',
                    type: 'success',
                layout: 'topRight',
                timeout:1500,    
                text: 'Question added succesfully !'
                 
            }).show();

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
<li>${post.content} <a class="delete-post" href="/feed/destroy_post/${post._id}"> <i class="far fa-trash-alt"></i> Delete</a> 
 
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
        e.stopImmediatePropagation();
        e.stopPropogation();
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                console.log("Data post delete")
                console.log(data.data.post_id)
                $(`#post_div_${data.data.post_id}`).remove()
                new Noty({
                    theme:'relax',
                    type: 'success',
                layout: 'topRight',
                timeout:1500,    
                text: 'Post Deleted Succesfully'
                 
            }).show();
            },error:function(err){
                console.log('Error in Console Data');
                console.log(error.responseText);
            }
        })
    })
}



 {
    console.log('from called')
   var newcommentform=$(" .create_form")
   newcommentform.submit(function(e){
    var self=this;
    e.stopImmediatePropagation();
       e.preventDefault();
       
       var value=$(`#${this.getAttribute('id')}`).serialize();
       
     
       $.ajax({
           type:'post',
           url:"/feed/comment_create",
           data:value,
           success:function(data){
               console.log(data.comment);
            $(`#post_div_${data.comment.post} #comment_create_div`).prepend(newcommentdiv(data.comment));
            new Noty({
                theme:'relax',
                type: 'success',
            layout: 'topRight',
            timeout:1500,    
            text: 'Answer Added Succesfully !!'
             
        }).show();
           },
           error:function(error){
               console.log(error);
           }
       })
    
   })

}







let newcommentdiv=function(comment){
    return $(`    
    <div id="comment_div_${comment._id}">
    <b><li><img width='30' height='30'src='/images/unknown.jpg '>${comment._id}</li></b> 
     <li>${comment.content}<a  > <i class="far fa-trash-alt"></i> Delete</a></li>
</div>
    
    
    `)
}


createform();

}