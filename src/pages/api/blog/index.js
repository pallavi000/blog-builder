import Blog from "../../../../models/Blog";
import dbConnect from "../../../../utils/dbConnect";

export default async function blog(req, res, query) {
  const { method, body } = req;
  const { action } = req.query;

  if (method === "GET") {
    await dbConnect();
    const blogs = await Blog.find();
    res.send(blogs);
  } else if (method === "POST") {
    await dbConnect();

    try {
      let blog = new Blog({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        user_id: req.body.user_id,
      });
      blog = await blog.save();
      res.send(blog);
      res.status(200).end();
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
