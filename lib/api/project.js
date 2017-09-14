var models = require('../../models');
var emailApi = require('../emails');

function getRandomCode() {
    return Math.floor(Math.random()*90000) + 10000;
}

function formatAddUserEmailBody(params) {
  return 'Congratulations! \n' + params.username 
    + ', has signed up to volunteer on ' + params.time 
    + '\n\nUser Details: ' 
    + '\nFirst Name: ' + params.firstName
    + '\nLast Name: ' + params.lastName
    + '\nEmail: ' + params.username
    + '\n\nVolunteer Opportunity Details:'
    + '\nName: ' + params.projectName
    + '\nTime: ' + params.time
    + '\nSlots Remaining: ' + params.slotsLeft + ' of ' + params.totalSlots
    + '\n\nIf you have any comments or concerns please contact joininvolvemint@gmail.com.'
    + '\n\nThank you for participating with involveMINT!'
    + '\n\nSincerely,'
    + '\ninvolveMINT Team';
} 

exports.projects = {
  all: function(request, reply) {
    models.Project.findAll()
      .then(function(projects) {
        reply(projects).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  },
  one: function(request, reply) {
    models.Project.findById(request.params.projectId)
    .then(function (project) {
      reply(project).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  create: function(request, reply) {
    models.Project.create(request.payload)
    .then(function (newProject) {
      var randomCode = getRandomCode();
      var projctCode = {
        code: randomCode,
        ProjectId: newProject.id
      }

      models.ProjectCode.create(projctCode)
      .then(function(newCode) {
        reply(newProject).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  addUser: function(request, reply) {

    var projectId = request.payload.projectId;
    var userId = request.payload.userId;

    function addUser(userId, reply, project) {
      // console.log('userid ' + userId);
      // console.log('project ' + JSON.stringify(project, null, 2))
      project.addUser(userId)
      .then(function(addedUser) {
        models.User.findById(userId)
        .then(function (user) {
          // console.log(JSON.stringify(user, null, 2));
          models.Project.findAll({
            include: [{
                model: models.User,
                where: { id: userId }
            }]
          })
          .then(function(userProjects) {
            // console.log(JSON.stringify(userProjects, null, 2));
            var body = formatAddUserEmailBody({
              username: user.email,
              time: project.time,
              firstName: user.firstname,
              lastName: user.lastname,
              projectName: project.title,
              totalSlots: project.numSlots,
              slotsLeft: project.numSlots - userProjects[0].Users.length
            });

            emailApi.emails.send({
              userId: project.OwnerId,
              subject: 'New signup',
              body: body
            });
            reply(addedUser).code(200);
          })
          
        });
      })
      .catch(function (error){
        console.log(error);
        reply(error).code(500);
      });
    }

    models.Project.findById(projectId)
    .then(addUser.bind(null, userId, reply))
    .catch(function (error){
      console.log(error);
      replyerror().code(500);
    });
  },
  getUserProjects: function(request, reply) {

    models.Project.findAll({
      include: [{
          model: models.User,
          where: { id: request.params.userId }
      }]
    })
    .then(function(userProjects) {
      reply(userProjects).code(200);
    })
    .catch(function(error){
      reply(error).code(500);
    });
  }
};
