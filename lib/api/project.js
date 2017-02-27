var models = require('../../models');

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
        reply(newProject).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  },
  addUser: function(request, reply) {

    var projectId = request.payload.projectId;
    var userId = request.payload.userId;

    function addUser(userId, reply, project) {
      console.log(userId);
      project.addUser(parseInt(userId))
      .then(function(addedUser) {
        reply(addedUser).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
    }

    models.Project.findById(projectId)
    .then(addUser.bind(null, userId, reply))
    .catch(function (error){
      reply(error).code(500);
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
