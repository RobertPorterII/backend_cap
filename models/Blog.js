import mongoose from "mongoose";


// Setting up the Schema for teh Blog entries on the App
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
        },
        intro: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }

);

  const Blog =  new mongoose.model("Blog", blogSchema);
  export default Blog;