
function toggleFriend(toggleFriendBtn){
    console.log(toggleFriendBtn);
    console.log($(toggleFriendBtn));
    $(toggleFriendBtn).click(function(event){
        event.preventDefault();
        $.ajax({
            type : "GET",
            url : $(toggleFriendBtn).attr("href"),
            success : function(data){
                console.log(data.deleted);
                if(data.deleted){
                    $(toggleFriendBtn).html("Add Friend")
                }else{
                    $(toggleFriendBtn).html("Remove Friend")
                }
                
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
}

console.log('hiii')

toggleFriend($(".toggle-friend-btn"));


// class ToggleFriend {
//     constructor(toggleElement){
//         this.toggler = toggleElement;
//         this.toggleFriend();
//     }
// }

// toggleFriend(toggleFriendBtn){
//     $(toggleFriendBtn).click(function(event){
//                 event.preventDefault();
//                 $.ajax({
//                     type : "GET",
//                     url : $(toggleFriendBtn).attr("href")
//                })
//                 .done(function(data){
//                     if(data.deleted){
//                        $(toggleFriendBtn).html("Add Friend")
//                     }else{
//                        $(toggleFriendBtn).html("Remove Friend")
//                     }
//                 })
//                 .fail(function(errData){
//                   console.log('error in adding a friend',errData);
//                 });
//     });
// }