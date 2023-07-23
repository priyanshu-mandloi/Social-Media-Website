{let e=function(){let t=$("#new-comment-form");t.submit(function(e){e.preventDefault(),$.ajax({type:"post",url:"/comments/create",data:t.serialize(),success:function(e){e=o(e.data.comment);$("#post-comments-list>ul").prepend(e),n($(" .delete-comment-button",e)),new ToggleLike($(" .toggle-like-button",e)),new Noty({theme:"relax",text:"Comment is created!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText),new Noty({theme:"relax",text:"Error in creating Post",type:"error",layout:"topRight",timeout:1500}).show()}})})},o=function(e){return $(`<li id="comment-${e._id}">
    <p>
          <small>
            <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>
          </small>
        ${e.content}
       <br>
        <small>
          ${e.user.name}
        </small>
        <br>
        <small>
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Comment">
                0 Likes
            </a>
        </small>
     </p>  
   </li>`)},n=function(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){new Noty({theme:"relax",text:"Comment is Deleted!",type:"success  ",layout:"topRight",timeout:1500}).show(),$("#post-"+e.data.comment_id).remove()},error:function(e){new Noty({theme:"relax",text:"Error in Deleting a Post!",type:"error",layout:"topRight",timeout:1500}).show(),console.log(e.responseText)}})})};e()}