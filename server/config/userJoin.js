import JoinUsers from "../models/joinUsers.js";

export const joinUser = async ({ userName, userId, roomName }) => {
  try {
    const userExist = await JoinUsers.findOne({ userId });
    if (userExist) return { error: "User already joined!" };

    const user = await JoinUsers.create({
      userName,
      userId,
      roomName,
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

// export const removeUser = async ({ userId, roomName }) => {
//   try {
//     const user = await JoinUsers.findOne({ userId });
//     if (user) return { user };

//     console.log(user);
//     return { user };
//   } catch (error) {
//     return { error };
//   }
// };
