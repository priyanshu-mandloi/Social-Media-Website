const User = require('../models/users');
const Friendship = require('../models/friendship');

module.exports.toggle_friendship = async (req, res) => {
  try {
    let from_id = req.user._id;
    let to_id = req.params.id;

    const existing_friendship = await Friendship.
    findOne(
     // $or is a or operator present which performs the logical or operation on an array that should satisfy one of the expression.Here it shows either their will be friendship1 will thier or friendship2 will be their.
      {
      $or: [
        { from_user: from_id, to_user: to_id }, // Friendship1
        { from_user: to_id, to_user: from_id }, // friendship2
      ],
    }
    );

  
    if (existing_friendship) {
      /* updating users database */
      await User.findByIdAndUpdate(from_id, { $pull: { friendships: existing_friendship._id } });
      await User.findByIdAndUpdate(to_id, { $pull: { friendships: existing_friendship._id } });

      /* updating friendships database */
      await Friendship.deleteOne({
        $or: [
          { from_user: from_id, to_user: to_id },
          { from_user: to_id, to_user: from_id },
        ],
      });

      console.log('Deleted Friendship!');
    } else {
      /* updating friendships database */
      const new_friendship = await Friendship.create({ from_user: from_id, to_user: to_id });
      new_friendship.save();

      /* updating users database */
      await User.findByIdAndUpdate(from_id, { $push: { friendships: new_friendship._id } });
      await User.findByIdAndUpdate(to_id, { $push: { friendships: new_friendship._id } });
    }

    return res.redirect('back');
  } catch (err) {
    console.error(err);
  }
};



















