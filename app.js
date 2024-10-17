const express= require ('express');
const app=express();
const userModel = require("./models/Users");
const cookieParser= require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const path= require('path');

// Set the views directory
// app.set('views', 'C:\\Users\\hp\\OneDrive\\Desktop\\start\\views');  // Make sure this path is correct

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get('/',(req,res)=>{
   res.render("index");
})

app.get('/login',(req,res)=>{
   res.render("login");
})

app.get('/register/mntrreg',(req,res)=>{
   res.render('mntrreg', { user: req.user });
   // res.render('mntrreg');
})
app.get('/register/mteereg',(req,res)=>{
   res.render('mteereg', { user: req.user });
   // res.render('mteereg');
})

app.get('/register',(req,res)=>{
   res.render("register");
})

app.post('/register',(req,res)=>{
    // Redirect based on the role
    let {role1}=req.body;
    if (role1 === 'mentor') {
        res.redirect('/register/mntrreg'); // Adjust this to your mentor route
    } else if (role1 === 'mentee') {
        res.redirect('/register/mteereg'); // Adjust this to your mentee route
    }
})

// app.post('/register/mntrreg',async (req, res) => {

//    // Handle mentor registration
//    let { name, email, password, image, details, industry, level, language, mondaystart, mondayend, tuesdaystart, tuesdayend,
//       wednesdaystart, wednesdayend, thursdaystart, thursdayend,
//       fridaystart, fridayend, saturdaystart, saturdayend,
//       sundaystart, sundayend } = req.body;
//    // // Perform mentor-specific registration logic here
//    let user= await userModel.findOne({email});
//    if(user) return res.status(500).send("user already registered");

//    bcrypt.genSalt(10,(err, salt)=>{
//       bcrypt.hash(password,salt,async (err,hash)=>{
//          // console.log(salt);  //showing password
//          let user = await userModel.create({
//             name,
//             email,
//             password:hash,
//             image,
//             details,
//             role:'mentor',
//             industry,
//             level,
//             language,
//             schedule:{
//                monday: { start: mondaystart, end: mondayend },
//                tuesday: { start: tuesdaystart, end: tuesdayend },
//                wednesday: { start: wednesdaystart, end: wednesdayend },
//                thursday: { start: thursdaystart, end: thursdayend },
//                friday: { start: fridaystart, end: fridayend },
//                saturday: { start: saturdaystart, end: saturdayend },
//                sunday: { start: sundaystart, end: sundayend }
//             }
//          });

//          let token=jwt.sign({email:email , userid:user._id}, "shhh");
//          res.cookie('token',token);
//          res.send('Mentor registered successfully!');
//       })
//    });

//    // res.send('Mentor registered successfully!');
// });

// app.post('/register/mteereg',async (req, res) => {
//    // Handle mentee registration
//    const { name, email, password,image, details,industry, level, language } = req.body;
//    // Perform mentee-specific registration logic here
//    let user= await userModel.findOne({email});
//    if(user) return res.status(500).send("user already registered");
//    else 
//    bcrypt.genSalt(10,(err, salt)=>{
//       bcrypt.hash(password,salt,async (err,hash)=>{
//          // console.log(salt);  
//          let user = await userModel.create({
//             name,
//             email,
//             password:hash,
//             image,
//             details,
//             role:'mentee',
//             industry,
//             level,
//             language
//          });

//          let token=jwt.sign({email:email ,userid:user._id }, "shhh");
//          res.cookie('token',token);
//          res.send('Mentee registered successfully!');
//       })
//    });

//    // res.send('Mentee registered successfully!');
// });

// app.post('/register/mntrreg', isLoggedIn, async (req, res) => {
//    let { name, email, password, image, details, industry, level, language, mondaystart, mondayend, tuesdaystart, tuesdayend,
//       wednesdaystart, wednesdayend, thursdaystart, thursdayend,
//       fridaystart, fridayend, saturdaystart, saturdayend,
//       sundaystart, sundayend } = req.body;

//    let user = await userModel.findOne({email: req.user.email});

//    // Update user fields with new data
//    user.name = name;
//    user.email = email;
//    user.image = image;
//    user.details = details;
//    user.industry = industry;
//    user.level = level;
//    user.language = language;
//    user.schedule = {
//       monday: { start: mondaystart, end: mondayend },
//       tuesday: { start: tuesdaystart, end: tuesdayend },
//       wednesday: { start: wednesdaystart, end: wednesdayend },
//       thursday: { start: thursdaystart, end: thursdayend },
//       friday: { start: fridaystart, end: fridayend },
//       saturday: { start: saturdaystart, end: saturdayend },
//       sunday: { start: sundaystart, end: sundayend }
//    };

//    // Update password only if it is provided
//    // if (password) {
//    //    const salt = await bcrypt.genSalt(10);
//    //    user.password = await bcrypt.hash(password, salt);
//    // }

//    await user.save();

//    res.redirect('/profile');
// });

// app.post('/register/mteereg', isLoggedIn, async (req, res) => {
//    const { name, email, password, image, details, industry, level, language } = req.body;

//    let user = await userModel.findOne({email: req.user.email});

//    // Update user fields with new data
//    user.name = name;
//    user.email = email;
//    user.image = image;
//    user.details = details;
//    user.industry = industry;
//    user.level = level;
//    user.language = language;

//    // Update password only if it is provided
//    // if (password) {
//    //    const salt = await bcrypt.genSalt(10);
//    //    user.password = await bcrypt.hash(password, salt);
//    // }

//    await user.save();

//    res.redirect('/profile');
// });

app.post('/register/mntrreg', async (req, res) => {
   // Extract all form fields
   let { name, email, password, image, details, industry, level, language, mondaystart, mondayend, tuesdaystart, tuesdayend,
       wednesdaystart, wednesdayend, thursdaystart, thursdayend,
       fridaystart, fridayend, saturdaystart, saturdayend,
       sundaystart, sundayend } = req.body;

   // Find the user
   let user = await userModel.findOne({ email });

   if (user) {
       // Update existing user, avoid overwriting password if empty
       const updates = {
           name,
           email,
           image,
           details,
           role: 'mentor',
           industry,
           level,
           language,
           schedule: {
               monday: { start: mondaystart, end: mondayend },
               tuesday: { start: tuesdaystart, end: tuesdayend },
               wednesday: { start: wednesdaystart, end: wednesdayend },
               thursday: { start: thursdaystart, end: thursdayend },
               friday: { start: fridaystart, end: fridayend },
               saturday: { start: saturdaystart, end: saturdayend },
               sunday: { start: sundaystart, end: sundayend }
           }
       };

       if (password) {
           // If a new password is provided, hash it and update
           bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(password, salt, async (err, hash) => {
                   updates.password = hash; // only update the password if it's provided
                   await userModel.updateOne({ email }, updates);
                   res.send('Mentor updated successfully!');
               });
           });
       } else {
           // If no new password, just update other fields
           await userModel.updateOne({ email }, updates);
           res.send('Mentor updated successfully!');
       }

   } else {
       // If user does not exist, create new user
       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(password, salt, async (err, hash) => {
               let newUser = await userModel.create({
                   name,
                   email,
                   password: hash,
                   image,
                   details,
                   role: 'mentor',
                   industry,
                   level,
                   language,
                   schedule: {
                       monday: { start: mondaystart, end: mondayend },
                       tuesday: { start: tuesdaystart, end: tuesdayend },
                       wednesday: { start: wednesdaystart, end: wednesdayend },
                       thursday: { start: thursdaystart, end: thursdayend },
                       friday: { start: fridaystart, end: fridayend },
                       saturday: { start: saturdaystart, end: saturdayend },
                       sunday: { start: sundaystart, end: sundayend }
                   }
               });

               let token = jwt.sign({ email: email, userid: newUser._id }, "shhh");
               res.cookie('token', token);
               res.send('Mentor registered successfully!');
           });
       });
   }
});

app.post('/register/mteereg', async (req, res) => {
   const { name, email, password, image, details, industry, level, language } = req.body;

   let user = await userModel.findOne({ email });

   if (user) {
       // Update existing user, avoid overwriting password if empty
       const updates = {
           name,
           email,
           image,
           details,
           role: 'mentee',
           industry,
           level,
           language
       };

       if (password) {
           // If a new password is provided, hash it and update
           bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(password, salt, async (err, hash) => {
                   updates.password = hash; // only update the password if it's provided
                   await userModel.updateOne({ email }, updates);
                   res.send('Mentee updated successfully!');
               });
           });
       } else {
           // If no new password, just update other fields
           await userModel.updateOne({ email }, updates);
           res.send('Mentee updated successfully!');
       }

   } else {
       // If user does not exist, create new user
       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(password, salt, async (err, hash) => {
               let newUser = await userModel.create({
                   name,
                   email,
                   password: hash,
                   image,
                   details,
                   role: 'mentee',
                   industry,
                   level,
                   language
               });

               let token = jwt.sign({ email: email, userid: newUser._id }, "shhh");
               res.cookie('token', token);
               res.send('Mentee registered successfully!');
            res.redirect("profile");
           });
       });
   }
});

app.post('/login',async (req, res) => {
   // Handle mentee registration
   const { email, password } = req.body;
   // Perform mentee-specific registration logic here
   // console.log(email); // Log the email being searched
   const user= await userModel.findOne({email});
   if (!user) return res.status(404).send("User not found.");
   
   bcrypt.compare(password, user.password, function(err, result){
      if(err){
         return res.status(500).send("Error while comparing passwords.");
      }
      if(result) {
         let token=jwt.sign({email:email ,userid:user._id }, "shhh");
         res.cookie('token',token);
         res.status(200).redirect("/profile");
      }
      else res.redirect('/login');
      // alert("wrong email or password");
   });
});

app.get('/logout',(req, res)=>{
   res.cookie('token', "");
   res.redirect('/login');
});

function isLoggedIn(req,res, next){ //middleware for use in some routes
   if(req.cookies.token === "") res.send("You must be logged in"); //on calling this function anywhere it helps check if token is empty then user should be login to logout
   else{
      let data= jwt.verify(req.cookies.token, "shhh");   //if user logged in then it return data in token by verifying security key 
      req.user= data;   //it has data for user further usage in other routes
      next();
   }
}

app.get('/profile', isLoggedIn,async (req,res)=>{ //that loggedin function called here
   // console.log(req.user)
   let user = await userModel.findOne({email: req.user.email});   //finding user details
   // console.log(user);

   res.render('profile',{user}); //sending user(details) to profile
   // res.render("login");
})

// Route to render edit form for mentors
app.get('/edit/mentor', isLoggedIn, async (req, res) => {
   let user = await userModel.findOne({email: req.user.email});
   res.render('mntrreg', { user });
});

// Route to render edit form for mentees
app.get('/edit/mentee', isLoggedIn, async (req, res) => {
   let user = await userModel.findOne({email: req.user.email});
   res.render('mteereg', { user });
});

app.get('/findmntr', isLoggedIn,async (req,res)=>{
   res.render("findmntr");
})

// app.get('/findmntr-result', isLoggedIn,async (req,res)=>{
//     // res.render("findmntr");
//     app.get('/findmntr-results', isLoggedIn, async (req, res) => {
//         const { industry, level, language } = req.query; // Get filters from query parameters
    
//         try {
//             // Find mentors matching the criteria
//             const mentors = await userModel.find({
//                 role: 'mentor',
//                 industry: industry,
//                 level: level,
//                 language: language
//             });
    
//             // Pass the mentors data to the pcard route to render the filtered results
//             res.render("pcard", { mentors });
//         } catch (error) {
//             console.error('Error fetching mentors:', error);
//             res.status(500).send('Server Error');
//         }
//     });
    
//  })
 

app.post('/schedule-meeting', isLoggedIn, async (req, res) => {
    const { mentorId } = req.body;
    const menteeId = req.user.userid; // Get the mentee's ID from the logged-in user's data

    // Here, you can implement logic to create a meeting between the mentee and mentor
    // For example, you could save the meeting details to a 'meetings' collection in MongoDB

    // For now, just redirect to a confirmation page or back to the profile
    // res.send('Meeting scheduled successfully!');
    res.render("schedMeet");
});

const Meeting = require('./models/meeting'); // Include the Meeting model

app.post('/schedule-meeting', isLoggedIn, async (req, res) => {
    const { mentorId } = req.body;
    const menteeId = req.user.userid; // Get the mentee's ID from the logged-in user's data

    // Generate a unique meeting link (this can be done using a third-party API like Zoom or Google Meet)
    const meetingLink = "https://example.com/meeting-link"; // Replace this with actual link generation logic

    // Save the meeting details to the database
    const newMeeting = new Meeting({
        mentorId,
        menteeId,
        date: new Date(),  // Replace with actual selected date/time
        link: meetingLink
    });

    try {
        await newMeeting.save();
        res.send('Meeting scheduled successfully! Link: ' + meetingLink);
    } catch (error) {
        console.error('Error scheduling meeting:', error);
        res.status(500).send('Error scheduling meeting.');
    }
});

app.get('/pcard',async (req,res)=>{
//    res.render("pcard");
const { industry, level, language } = req.query; // Extract filters from query parameters

try {
    // Find mentors matching the criteria
    const mentors = await userModel.find({
        role: "mentor",
        industry: industry,
        level: level,
        language: language
    });

    // Render the findmntr view with the mentors data
    res.render("pcard", { mentors });
} catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).send('Server Error');
}
})

app.get('/resource', isLoggedIn,async (req,res)=>{
    res.render("resource");
})

app.get('/community', isLoggedIn,async (req,res)=>{
    res.render("community");
})
app.listen(3000);