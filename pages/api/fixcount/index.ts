// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from "../../../firebase/server";
export default async function handler(req, res) {
  // const songs = await firebase.firestore().collection("songs").get();
  // for (let a = 0; a < songs.size; a++) {
  //   await firebase
  //     .firestore()
  //     .collection("songs")
  //     .doc(songs.docs[a].id)
  //     .update({
  //       likes: 0,
  //     });
  //     console.log(`current index ${a}, total ${songs.size}`);
  // }
  // const user_data = await firebase.firestore().collection("users").get();
  // console.log('lewat')
  // for (let a = 0; a < user_data.size; a++) {
  //   const userSongLikes = await firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(user_data.docs[a].id)
  //     .collection("song_likes")
  //     .get();
  //   for (let b = 0; b < userSongLikes.size; b++) {
  //     await firebase
  //       .firestore()
  //       .collection("songs")
  //       .doc(userSongLikes.docs[b].id)
  //       .update({
  //         likes: firebase.firestore.FieldValue.increment(1),
  //       });
  //   }
  //   console.log(`curr index - ${a}, total - ${user_data.size}`);
  // }
  res.status(200).json({ success: true });
}
