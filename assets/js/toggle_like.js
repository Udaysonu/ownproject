 {console.log('like called')
   let uday= $('.toggle-like')
    uday.click(function(event){
        var self=this
         
        event.preventDefault();
        console.log(this.getAttribute("href"))
        var value=this.getAttribute('href')
        $.ajax({
            url:value,
            type:'get',
            success:function(data){
                self.innerHTML='<i class="far fa-thumbs-up"></i>'+data.likes+" likes"
                if(data.deleted){self.style.color="red"}else{self.style.color="green"}
                
                console.log(data.likes);
            }
        })

    })
 }