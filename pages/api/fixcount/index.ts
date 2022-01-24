// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from "../../../firebase/server";
export default async function handler(req, res) {
  res.status(200).json({ success: true });
}
