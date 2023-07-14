let express = require('express');
const router = express.Router();
// const User = require('../models/user');
const Detail = require('../models/detail');
const Admin = require('../models/admin');
const Feedback = require('../models/summary');

router.get('/', function (req, res, next) {
	return res.render('login.ejs');
});


router.post('/', function (req, res, next) {
	Admin.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				req.session.userId = data.unique_id;
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});


router.get('/dashboard', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		Detail.find({}, function (err, users) {
			if (err) {
				console.log(err);
				return res.redirect('/');
			}
			res.render('dashboard.ejs', { users: users });
		});
	  }
	});
  });




router.get('/fb_dashboard', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		Feedback.find({}, (err, feedbacks) => {
			if (err) {
				console.error('Failed to retrieve feedbacks', err);
				res.status(500).send('Internal Server Error');
			} else {
				res.render('fb_dashboard.ejs', { feedbacks });
			}
		});
	  }
	});
  });


router.delete('/delete-feedback/:id', (req, res) => {
    const feedbackId = req.params.id;

    Feedback.findByIdAndRemove(feedbackId, (err) => {
        if (err) {
            console.error('Failed to delete feedback', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(200);
        }
    });
});


router.get('/create', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		res.render('create.ejs'); 
	  }
	});
  });

  router.get('/success', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		res.render('survey_success.ejs'); 
	  }
	});
  });

  router.get('/duplicate', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		res.render('duplicate_error.ejs'); 
	  }
	});
  });
  
  router.get('/roombooked', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		res.render('roombooked.ejs');
	  }
	});
  });

  router.get('/summary', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		res.render('summary.ejs');
	  }
	});
  });

  router.get('/update', function (req, res, next) {
	Admin.findOne({ unique_id: req.session.userId }, function (err, data) {
	  console.log(data);
	  if (!data) {
		res.redirect('/');
	  } else {
		res.render('update.ejs');
	  }
	});
  });
  



router.get('/profile', function (req, res, next) {
	console.log("profile");
	Admin.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			return res.render('data.ejs', {"name":data.username,"email":data.email});
		}
	});
});


router.get('/prof', function (req, res, next) {
	console.log("profile");
	Admin.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			return res.render('profile.ejs', {"name":data.username,"email":data.email});
		}
	});
});


router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	Admin.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router;