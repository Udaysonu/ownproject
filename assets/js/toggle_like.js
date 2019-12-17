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
                self.innerHTML=data.likes+" likes"
                self.style.color="orange"
                console.log(data.likes);
            }
        })

    })
 }