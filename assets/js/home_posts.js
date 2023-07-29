{
    // method used for submitting the form using AJAX.
   let createPost = function(){
       let newPostForm = $('#new-post-form')
       .sort('-createdAt')
       .populate('user')
       .populate({
          path:'comments',
          populate:{
              path:'user'
          }
       }).exec();
       newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),
            success:function(data){
               let newPost = newPostDom(data.data.post);
               $('#post-list-container>ul').prepend(newPost);
               deletePost($('.delete-post-button',newPost));

               new PostComments(data.data.post._id);

               // Added for the liking 
               new toggleLike($(' .toggle-like-button', newPost));
               
               new Noty({
                theme:'relax',
               text:"Post is created!",
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
   let newPostDom = function(post){
      return $(
    `<li id="post-${post._id}">
      <p>
        <small>
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
          ${post.content}
        <br>
        <small>
          ${post.user.name}
       </small>
       <br>
       <small>
       <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
           0 Likes
           </a>
      </small>
      </p>
      <div class="post-comments">
       <form action="/comments/create" method="POST">
           <input type="text" name="content" placeholder="Type Here to add comment... " required>
           <input type="hidden" name="post" value="${post._id}">
           <input type="submit" value="Add Comment">
       </form>
       <!-- Showing the comments  -->
       <div class="post-comments-list">
        <ul id="post-comments-${post._id}">

        </ul>
       </div>
      </div>
    </li>`
    );
   }

   //method to delete a post from Dom
   let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
         type:'get',
         url:$(deleteLink).prop('href'),
         success:function(data){
          new Noty({
            theme:'relax',
           text:"Post is Deleted!",
           type:'success  ',
           layout:'topRight',
           timeout:1500
         }).show();
             $(`#post-${data.data.post_id}`).remove();
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
   createPost();
}

