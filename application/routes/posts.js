var express = require("express");
var router = express.Router();
var db = require("../config/database");
const{successPrint, errorPrint} = require("../helpers/debug/debugprinters");
var sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var PostError = require("../helpers/error/PostError");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function(req,file,cb){
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null,`${randomName}.${fileExt}`);
    }
});
var uploader = multer({storage: storage});

router.post("/postImage", uploader.single("uploadImage"),(req, res, next)=>{
   let fileUploaded = req.file.path; // public/images/uploads/filename
   let fileAsThumbnail = `thumbnail-${req.file.filename}`;
   let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
   let title = req.body.title;
   let description = req.body.description;
   let fk_userId = req.session.userId; 

   /**
    * do server validation 
    *if any values that used for the insert statement are undefined, mysql.query or execute will fail with the following error:
    *Bind parameters cannot be undefined
    */
   sharp(fileUploaded)
   .resize(200) // resize the image file with width and height being 200px
   .toFile(destinationOfThumbnail) // adds a thumbnail version of the original image file to the uploads folder
   .then(()=>{
       let baseSQL = "INSERT INTO posts (title, description,photopath,thumbnail,created,fk_userid) VALUE(?,?,?,?,now(),?);";
       return db.execute(baseSQL, [title,description,fileUploaded,destinationOfThumbnail,fk_userId]);
   })
   .then(([results, fields])=>{
       if(results && results.affectedRows){
           req.flash("success", "Your Post was created successfully!");
           res.redirect("/homeGallery");
       }
       else{
           throw new PostError("Post could not be created", "/postImage", 200);
       }
   })
   .catch(err=>{
       if(err instanceof PostError){
           errorPrint(err.getMessage());
           req.flash("error", err.getMessage());
           res.status(err.getStatus());
       }
       else{
           next(err);
       }
   })
})
// localhost:3000/posts/search?search=value
router.get("/search",(req,res,next)=>{
    let searchValue = req.query.search;
    if(!searchValue){
        res.send({
            resultsStatus:"info",
            message:"NO search term given",
            results:[]
            
        });
    }
    else{
        let baseSQL = "SELECT id, title, description, thumbnail, concat_ws(' ', title, description)\
        AS haystack FROM posts HAVING haystack like ?;";
        let sqlReadySearchTerm = "%" + searchValue+ "%";

        db.execute(baseSQL,[sqlReadySearchTerm])
        .then(([results,fields])=>{
            if(results && results.length){
                res.send({
                    resultsStatus:"info",
                    message:`${results.length} results found`,
                    results: results
                })
            }
            else{
                db.query("SELECT id, title, description, thumbnail, created FROM posts \
                ORDER BY created DESC Limit 100",[])
                .then(([results,fields])=>{
                    res.send({
                        resultsStatus:"info",
                        message:"No Results were found for your search but nothing changes",
                        results:results
                    })
                })
            }
        })
        .catch(err => next(err));
    }
})

module.exports = router;