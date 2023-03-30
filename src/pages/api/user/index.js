import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export default async function user(req, res, query) {
  const { method, body } = req;
  const { action } = req.query;
  await dbConnect();
  if (method === "GET") {
    const users = await User.find();
    res.send(users);
  } else if (method === "POST") {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user = await user.save();
    res.send(user);
  }
}
