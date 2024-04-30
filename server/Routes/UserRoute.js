const UserRoute = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require("../Models/User");
const AttendDetail = require("../Models/AttendDetails");
const Activity = require("../Models/Activity");
const Host = require("../Models/Host");
const Comment = require("../Models/Comment");
const Notify = require("../Models/Notify");

//Get a user by uid
UserRoute.get("/get-by-uid/:uid", (req, res) => {
	const uid = req.params.uid

	User.findOne({ uid: uid }).then((data) => {
		res.json(data);
	})
});

//Get a user by email
UserRoute.get("/get-by-email/:email", (req, res) => {
	User.findOne({ email: req.params.email }).then((data) => {
		res.json(data);
	})
});

//Get by any infor
UserRoute.get("/get", (req, res) => {
	const {field, value} = req.query;

	User.findOne({ [field]: value}).then((data) => {
		res.json(data);
	})
});

//Get all attended activity
UserRoute.get("/get-attend/:uid", async (req, res) => {
	const userData = await User.findOne({uid: req.params.uid});

	Activity.find({ actID: { $in: userData.attendedActivitiesID } }).then(data => {
		return res.json(data);
	});
});

//Get all hosted activity
UserRoute.get("/get-host/:uid", async (req, res) => {
	const userData = await User.findOne({uid: req.params.uid});

	Activity.find({ actID: { $in: userData.hostsID } }).then(data => {
		return res.json(data);
	});
});

//Get all comments
UserRoute.get("/get-comment/:uid", async (req, res) => {
	const userData = await User.findOne({uid: req.params.uid});

	Comment.find({ cmtID: { $in: userData.commentsID } }).then(data => {
		return res.json(data);
	});
});

//Get all notify
UserRoute.get("/get-notify/:uid", async (req, res) => {
	const userData = await User.findOne({uid: req.params.uid});

	Notify.find({ notifyID: { $in: userData.notifyID } }).then(data => {
		return res.json(data);
	});
});

//Get all users
UserRoute.get("/", (req, res) => {
	User.find({}).then((data) => {
		res.json(data);
	});
});

//Update user infor
UserRoute.post('/update', async (req, res) => {
	try {
	  const { uid } = req.body;
	  const updatedUser = await User.findOneAndUpdate(
		{ uid: uid },
		{
		  $set: {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			avatar: req.body.avatar,
			phone: req.body.phone,
			dob: new Date(req.body.dob),
			school: req.body.school,
			class: req.body.class,
			gender: req.body.gender,
			role: req.body.role,
			bio: req.body.bio,
			favorActivitiesID: req.body.favorActivitiesID,
			commentsID: req.body.commentsID,
			reviewsID: req.body.reviewsID,
			hostsID: req.body.hostsID,
			messagesID: req.body.messagesID,
		  },
		},
		{ new: true, upsert: true }
	  );

	  if (!updatedUser) {
		return res.status(404).json({ message: 'User not found' });
	  }

	  res.json(updatedUser);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Add activity to favors
UserRoute.post('/add-to-favor', async (req, res) => {
	try {
		const {uid, actID} = req.body;
		console.log({actID: actID});

		const data = await User.findOneAndUpdate(
			{ uid: uid },
			{
				$push: { favorActivitiesID: actID}
			},
			{ new: true, upsert: true }
		);
		if (!data) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Add to comments
UserRoute.post('/add-to-comment', async (req, res) => {
	try {
		const {uid, cmtID} = req.body;
		console.log({cmtID: cmtID});

		const data = await User.findOneAndUpdate(
			{ uid: uid },
			{
				$push: { commentsID: cmtID}
			},
			{ new: true, upsert: true }
		);
		if (!data) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Add to reviews
UserRoute.post('/add-to-review', async (req, res) => {
	try {
		const {uid, reviewID} = req.body;
		console.log({reviewID: reviewID});

		const data = await User.findOneAndUpdate(
			{ uid: uid },
			{
				$push: { reviewsID: reviewID}
			},
			{ new: true, upsert: true }
		);
		if (!data) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Add to hosts
UserRoute.post('/add-to-host', async (req, res) => {
	try {
		const {uid, hostID} = req.body;
		console.log({hostID: hostID});

		const data = await User.findOneAndUpdate(
			{ uid: uid },
			{
				$push: { hostsID: hostID}
			},
			{ new: true, upsert: true }
		);
		if (!data) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Add to message
UserRoute.post('/add-to-msg', async (req, res) => {
	try {
		const {uid, msgID} = req.body;
		console.log({msgID: msgID});

		const data = await User.findOneAndUpdate(
			{ uid: uid },
			{
				$push: { messagesID: msgID}
			},
			{ new: true, upsert: true }
		);
		if (!data) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Remove from favor
UserRoute.post('/remove-from-favor', async (req, res) => {
	try {
	  const { uid, actID } = req.body;
  
	  const data = await User.findOneAndUpdate(
		{ uid: uid },
		{
		  $pull: { favorActivitiesID: actID }
		},
		{ new: true }
	  );
  
	  if (!data) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.json(data);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Remove from comment
UserRoute.post('/remove-from-comment', async (req, res) => {
	try {
	  const { uid, cmtID } = req.body;
  
	  const data = await User.findOneAndUpdate(
		{ uid: uid },
		{
		  $pull: { commentsID: cmtID }
		},
		{ new: true }
	  );
  
	  if (!data) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.json(data);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Remove from review
UserRoute.post('/remove-from-review', async (req, res) => {
	try {
	  const { uid, reviewID } = req.body;
  
	  const data = await User.findOneAndUpdate(
		{ uid: uid },
		{
		  $pull: { reviewsID: reviewID }
		},
		{ new: true }
	  );
  
	  if (!data) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.json(data);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Remove from host
UserRoute.post('/remove-from-host', async (req, res) => {
	try {
	  const { uid, hostID } = req.body;
  
	  const data = await User.findOneAndUpdate(
		{ uid: uid },
		{
		  $pull: { hostsID: hostID }
		},
		{ new: true }
	  );
  
	  if (!data) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.json(data);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Remove from message
UserRoute.post('/remove-from-msg', async (req, res) => {
	try {
	  const { uid, msgID } = req.body;
  
	  const data = await User.findOneAndUpdate(
		{ uid: uid },
		{
		  $pull: { messagesID: msgID }
		},
		{ new: true }
	  );
  
	  if (!data) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.json(data);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
});

//Sign up
UserRoute.post('/sign-up', async (req, res) => {
	const userData = req.body;
	
	//Hash password
	const hashedPass = await HashPassword(userData.password);

	User.findOne({ email: userData.email }).then((data) => {
		if(data){
			res.send('Người dùng đã tồn tại');
		}
		else{
			// If user not existed, check valid information
			const validation = CheckValidForSignUp(userData)
			if(!validation.isValid){
				res.send(validation.msg);
			}
			else{
	
				// Add new user if all information valid
				const newUser = new User({
					uid: CreateUidFromEmail(userData.email),
					name: userData.name,
					password: hashedPass.hash,
					email: userData.email,
					avatar: userData.avatar || '',
					phone: userData.phone,
					dob: new Date(userData.dob),
					school: userData.school,
					class: userData.class,	
					gender: userData.gender,
					role: userData.role,
					bio: userData.bio || 'Chưa có gì để viết',
					favorActivitiesID: userData.favorActivitiesID || [],
					commentsID: userData.commentsID || [],
					reviewsID: userData.reviewsID || [],
					hostsID: userData.hostsID || [],
					messagesID: userData.messagesID || [],
					salt: hashedPass.salt
				});

				try{
				newUser.save({}).then((result) => {
					console.log("User added:", result);
					res.status(500).json(result);
				});
				}
				catch{
					res.json("Add user failed!");
				}
			}
		}
	});
});

//Login
UserRoute.post('/login', async (req, res) => {
	const {email, password} = req.body;

	const data = await User.findOne({ email: email });

	if(!data){
		return res.status(404).json({ message: 'Tài khoản không tồn tại'});
	}

	const isPasswordCorrect = await CheckPassword(data, email, password);
	if(isPasswordCorrect){
		return res.status(200).json({ message: 'Đăng nhập thành công', data: data});
	} else {
		return res.status(404).json({ message: 'Mật khẩu không đúng'});
	}
});

//Attend activity
UserRoute.post('/attend', async (req, res) => {
	const attendData = req.body;

	//Check if activity not full
	const actData = await Activity.findOne({actID: attendData.actID});
	if(actData.registeredParticipants == actData.maxParticipants){
		return res.send("Đã hết số lượng đăng ký!");
	}

	//Resigter if still have free slot
	const newAttend = new AttendDetail(attendData);
	const result = await newAttend.save({});

	if (result){
		//Update registeredParticipants
		await Activity.findOneAndUpdate(
			{actID: attendData.actID},
			{registeredParticipants: (actData.registeredParticipants + 1)},
			{ new: true, upsert: true }
		);

		await User.findOneAndUpdate(
			{ uid: attendData.userID },
			{
				$push: { attendedActivitiesID: attendData.actID }
			},
			{ new: true, upsert: true }
		);
		
		return res.status(200).send("Đăng ký tham gia thành công!");
	}
	return res.json(null);
});

const CheckValidForSignUp = (data) => {
	var checkState = {
		isValid: false,
		msg: ''
	}

	// Check email
	const emailRegex = /\S+@\S+\.\S+/;
	if (!emailRegex.test(data.email)) {
		checkState.msg = "Email không hợp lệ";
		return checkState;
	}

	// Check phone number
	const phoneRegex = /^0\d{9}$/;
	if (!phoneRegex.test(data.phone)) {
		checkState.msg = "Số điện thoại không hợp lệ";
		return checkState;
	}

	// Check password
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;
	if (!passwordRegex.test(data.password)) {
		checkState.msg = "Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất một ký tự in hoa và một số, từ 8 đến 20 ký tự";
		return checkState;
	}

	// Set isValid true when data valid
	checkState.isValid = true;
	return checkState;
};

const CreateUidFromEmail = (email) => {
	return email.split('@')[0];
}

const HashPassword = async (password) => {
	const saltRounds = 10; // Số lần lặp để tạo muối
	const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

	return {
		salt: salt,
		hash: hash
	};
}

const CheckPassword = async (data, email, password) => {
	const storedHashedPassword = data.password;
	const storedSalt = data.salt;
	const inputHashedPassword = bcrypt.hashSync(password, storedSalt);

	// So sánh giá trị hash mới với giá trị hash từ cơ sở dữ liệu
	console.log(inputHashedPassword);
	return (inputHashedPassword === storedHashedPassword);
};

UserRoute.post('/test-hash', async (req, res) => {
	const correct = await CheckPassword('hihi@gmai.com', 'Daylamk001');
	if(correct){
		res.send('Mật khẩu đúng!');
	} else {
		res.send('Mật khẩu sai!');
	}
});

module.exports = UserRoute;