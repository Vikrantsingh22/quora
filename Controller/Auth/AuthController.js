// import formidable from "formidable";
// import dotenv from 'dotenv';
// import Cloudinary from 'cloudinary';
// import { userModel } from "../../Model/User/Users"; 
// import { userSessions } from "../../Model/UserSessions/UserSession";
// import  Bcrypt from 'bcrypt';
// import session, { Cookie, Session } from "express-session";
// dotenv.config();

// const cloudinary = Cloudinary.v2;
// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
// });

// class AuthController{
//     SignUp(request,response){
//         const form = new formidable.IncomingForm();
//         try{
//             form.parse(request, async(error,fields,files)=>{ 
//              if (error){
//                 console.error(error);
//                 return response.status(500).json({msg: "Network Error: Failed to register try again later"});

//              }
//              const { username, password}= fields;
//              const { image }= files;
//              if(!username || !password || !image){
//                 return response.status(400).json({ msg: "All fields are required"});

//              }

//              if (password.length<6){
//                 return response.status(400).json({ msg: "Password has to be at least 6 characters"});
//              }
//              const  isUserExisting = await userModel.findOne({username: username});
//              if (isUserExisting){
//                 return response.status(404).json({msg: " User with this username already exist"});
//              }

//              cloudinary.uploader.upload(image.path, {folder: `/Quora/ProfileImage/${username}`} , async(error, results)=>{
//                 if(error){
//                     console.error(error);
//                     return response
//                     .status(500).json({msg: 'Image upload error:Check the file type',
//                 });
//                 }
//                 const image_url =results.secure_url;
//                 const salt = await Bcrypt.genSalt(15);
//                 const hashedPassword= await Bcrypt.hash(password, salt);
//                 const newUser= new userModel({
//                     username,
//                     password: hashedPassword,
//                     profileImage: image_url
//                 })
//                 const savedUser= await newUser.save();
//                 return response.status(201).json({ msg: " Your account created sucessfully"});
//              }
//              );          
//             });
            
//         }
//         catch(error){
//             return response.status(500).json({msg:'Server  Error : Server is currently down try again later'});
//         }

//     }
//     Login(request, response){
//         const form = new formidable.IncomingForm();
//         try{ 
//             form.parse(request,async(error,fields,files)=>{
//                 if (error){
//                     console.error(error);
//                     return response.status(500).json({msg: "Network Error: Failed to register try again later"});
    
//                  }
//                  const { username, password}= fields;
//                  if(!username|| !password){
//                     return response.status(400).json({msg: "All fields required "});
//                  }
//                  const isUserExisting= await userModel.findOne({username:username})
//                  if(!isUserExisting){
//                     return response.status(404).json({msg:"username does not exist"});

//                  }
//                  const hashedPassword = isUserExisting.password;
//                  const isPasswordValid = await Bcrypt.compare(password, hashedPassword);

//                  if (!isPasswordValid){
//                     return response.status(400).json({msg: "Invalid credentials"});

//                  }
//                  const isUserSessionAvailable = await userSessions.findOne({'session.user.username':username})
//                 //  {
//                 //     expires:'',
//                 //     Session:{
//                 //         cookie,
//                 //         user:{username}


//                 //     }
//                 //  }
//                 if(isUserSessionAvailable){
//                     return response.status(200).json({msg:'Already signed in '});
//                 }
//                 request.session.user={username:isUserExisting.username, id:isUserExisting._id}
//                 response.status(200).send(request.sessionId)

//             });

//         }catch(error){
//             return response.status(500).json({msg: "Server Error: Surver is currently down try again later"});
//         }
        
//     }
// }

// export default AuthController





import formidable from "formidable";
import dotenv from 'dotenv';
import Cloudinary from 'cloudinary';
import { userModel } from "../../Model/User/Users"; 
import { userSessions } from "../../Model/UserSessions/UserSession";
import  Bcrypt from 'bcrypt';
import session, { Cookie, Session } from "express-session";
dotenv.config();

const cloudinary = Cloudinary.v2;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

class AuthController{
    SignUp(request,response){
        const form = new formidable.IncomingForm();
        try{
            form.parse(request, async(error,fields,files)=>{ 
             if (error){
                console.error(error);
                return response.status(500).json({msg: "Network Error: Failed to register try again later"});

             }
             const { username, password}= fields;
             const { image }= files;
             if(!username || !password){
                return response.status(400).json({ msg: "Username and Password are required"});
             }

             if (password.length<6){
                return response.status(400).json({ msg: "Password has to be at least 6 characters"});
             }

             let image_url = '';
             if(image) {
                cloudinary.uploader.upload(image.path, {folder: `/Quora/ProfileImage/${username}`} , async(error, results)=>{
                    if(error){
                        console.error(error);
                        return response
                        .status(500).json({msg: 'Image upload error:Check the file type',
                    });
                    }
                    image_url =results.secure_url;
                });
             }

             const  isUserExisting = await userModel.findOne({username: username});
             if (isUserExisting){
                return response.status(404).json({msg: " User with this username already exist"});
             }

             const salt = await Bcrypt.genSalt(15);
             const hashedPassword= await Bcrypt.hash(password, salt);
             const newUser= new userModel({
                username,
                password: hashedPassword,
                profileImage: image_url
             });

             const savedUser= await newUser.save();
             return response.status(201).json({ msg: " Your account created sucessfully"});
            });
            
        }
        catch(error){
            return response.status(500).json({msg:'Server  Error : Server is currently down try again later'});
        }

    }



    // async SignUp(request,response){
    //     const form = new formidable.IncomingForm();
    //     try{
    //         form.parse(request, async(error,fields,files)=>{ 
    //          if (error){
    //             console.error(error);
    //             return response.status(500).json({msg: "Network Error: Failed to register try again later"});
    
    //          }
    //          const { username, password}= fields;
    //          const { image }= files;
    //          if(!username || !password){
    //             return response.status(400).json({ msg: "Username and Password are required"});
    //          }
    
    //          if (password.length<6){
    //             return response.status(400).json({ msg: "Password has to be at least 6 characters"});
    //          }
    
    //          let image_url = '';
    //          if(image) {
    //             const result = await cloudinary.uploader.upload(image.path, {folder: `/Quora/ProfileImage/${username}`});
    //             image_url = result.secure_url;
    //          }
    
    //          const  isUserExisting = await userModel.findOne({username: username});
    //          if (isUserExisting){
    //             return response.status(404).json({msg: " User with this username already exist"});
    //          }
    
    //          const salt = await Bcrypt.genSalt(15);
    //          const hashedPassword= await Bcrypt.hash(password, salt);
    //          const newUser= new userModel({
    //             username,
    //             password: hashedPassword,
    //             profileImage: image_url
    //          });
    
    //          const savedUser= await newUser.save();
    //          return response.status(201).json({ msg: " Your account created sucessfully"});
    //         });
            
    //     }
    //     catch(error){
    //         return response.status(500).json({msg:'Server  Error : Server is currently down try again later'});
    //     }
    
    // }

    
    Login(request, response){
        const form = new formidable.IncomingForm();
        try{ 
            form.parse(request,async(error,fields,files)=>{
                if (error){
                    console.error(error);
                    return response.status(500).json({msg: "Network Error: Failed to register try again later"});
    
                 }
                 const { username, password}= fields;
                 if(!username || !password){
                    return response.status(400).json({msg: "Username and Password required "});
                 }
                 const isUserExisting= await userModel.findOne({username:username})
                 if(!isUserExisting){
                    return response.status(404).json({msg:"Username does not exist"});

                 }
                 const hashedPassword = isUserExisting.password;
                 const isPasswordValid = await Bcrypt.compare(password, hashedPassword);

                 if (!isPasswordValid){
                    return response.status(400).json({msg: "Invalid credentials"});

                 }
                 const isUserSessionAvailable = await userSessions.findOne({'session.user.username':username})
                //  {
                //     expires:'',
                //     Session:{
                //         cookie,
                //         user:{username}


                //     }
                //  }
                                if(isUserSessionAvailable){
                    return response.status(200).json({msg:'Already signed in '});
                }
                request.session.user={username:isUserExisting.username, id:isUserExisting._id}
                response.status(200).send(request.sessionId)

            });

        }catch(error){
            return response.status(500).json({msg: "Server Error: Surver is currently down try again later"});
        }
        
    }
}

export default AuthController
