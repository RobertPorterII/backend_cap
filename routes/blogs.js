import { Router } from "express";
import Blog from "../models/Blog.js";


const router = new Router();

// Get requests thats fetches All blogs from  DB

router.get("/", async (req, res, next) => {
    // res.send('sending all blogs...')
    try {
        const blogs = await Blog.find();
        if (blogs) {
            res.json ({ blogs });
        } else {
            res.json({ message: "No Blogs found" });
        }
    } catch (error){
        next(error)
    }

});

// Get a single blog by Id

router.get("/:id", async(req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(blog) {
            res.json ({ blog });
        } else {
            res.json ({ message: `No Blog entry with that id: ${req.params.id}`});
        }
    } catch (error) {
        next(error)
    }
});

// Post method to create a blog entry into db
router.post("/", async (req, res, next) => {
        try {
            console.log(req.body);
            
            const newBlog = await Blog.create(req.body);

            if (newBlog) {
                res.status(201).json({blog: newBlog});
                
            } else {
                res.status(400).json({message : "Error creating new Blog!!"});
            }
            
            
        } catch (error) {
            next(error);
            
        }
});

// Delete method to remove a blog entry by its id

router.delete("/:id", async (req, res, next) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (deletedBlog) {
            res.json({message : `Blog deleted: ${req.params.id}`, deletedBlog});
            
        } else {
            res.json({message: `Error with deleting Blog: ${req.params.id}`})
            
        }
    } catch(error) {
        next(error);
    }
});

// Put method to update a single blog entry by its id

router.put("/:id", async(req, res, next) =>{
    try {
        const {id} = req.params;
        const {body} = req;
        const updatedBlog = await Blog.findByIdAndUpdate(id,body, {
            new: true,
        });
        if (updatedBlog) {
            res.json({ updatedBlog})
            
        } else {
            res.json({message: `Error updating Blog: ${req.params.id}`})
            
        }
        
    } catch (error) {
        next(error)
        
    }
});







export default router