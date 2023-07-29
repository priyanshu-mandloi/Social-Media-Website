{
    // method used for submitting the form using AJAX.
   let createComment = function(){
       let newCommentForm = $('#new-comment-form');
       newCommentForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/comments/create',
            data:newCommentForm.serialize(),
            success:function(data){
               let newComment = newCommentDom(data.data.comment);
               $('#post-comments-list>ul').prepend(newComment);
               deleteComment($(' .delete-comment-button',newComment));
                
              //  Added the likes for the comments
              new ToggleLike($(' .toggle-like-button', newComment));

               new Noty({
                theme:'relax',
               text:"Comment is created!",
               type:'success',
               layout:'topRight',
               timeout:1500
             }).show();
            },error : function(error){
                console.log(error.responseText);
                new Noty({
                  theme:'relax',
                 text:"Error in creating Post",
                 type:'error',
                 layout:'topRight',
                 timeout:1500
               }).show();
            }    
        });
       });
   }


   // method to display the post in DOM.
   let newCommentDom = function(comment){
      return $(

     `<li id="comment-${ comment._id }">
     <!-- <p> -->
     <div>
       ${comment.content}
       <small>
        ${comment.user.name}
       </small>
   
       <small>
               <a class="toggle-like-button" data-likes="${comment.likes.length}" href="/likes/toggle/?id=${comment._id}&type=Comment" style="text-decoration: none;">
                 <i class="fa-regular fa-thumbs-up"></i> ${comment.likes.length}
               </a>
       </small>
       <small>
         <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fa-solid fa-trash"></i></a>
       </small>
     </div>
 </li>`
    );
   }

   //method to delete a post from Dom
   let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
         type:'get',
         url:$(deleteLink).prop('href'),
         success:function(data){
          new Noty({
            theme:'relax',
           text:"Comment is Deleted!",
           type:'success  ',
           layout:'topRight',
           timeout:1500
         }).show(); 
             $(`#post-${data.data.comment_id}`).remove();
         },error:function(error){
          new Noty({
            theme:'relax',
           text:"Error in Deleting a Post!",
           type:'error',
           layout:'topRight',
           timeout:1500
         }).show();
            console.log(error.responseText);
         }
      });
    });
   }
   createComment();
}