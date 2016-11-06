var models = require('../models');

exports.users = {
  all: function(request, reply) {
    models.User.findAll()
      .then(function(users) {
        reply(users).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  },
  one: function(request, reply) {
    models.User.findById(request.params.userId)
    .then(function (user) {
      reply(user).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  create: function(request, reply) {
    models.User.create(request.payload)
      .then(function (newUser) {
        reply(newUser).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  }
};

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

    var projectId = request.params.projectId;
    var userId = request.params.userId;

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
  }
};

exports.sessions = {
  startWorkSession: function(request, reply) {
    models.WorkSession.create({
      createdAt: Date.now(),
      UserId: request.payload.userId,
      ProjectId: request.payload.projectId
    })
    .then(function(addedSession) {
      reply(addedSession).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  endWorkSession: function(request, reply) {
    var sessionId = request.payload.sessionId;

    models.WorkSession.update(
      { endedAt: Date.now() },
      { where: { id: sessionId } }
    )
    .then(function (updatedSession) {
      reply(updatedSession).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  getProjectHours: function(request, reply) {
    models.WorkSession.findAll({
      where: {
        ProjectId: request.params.projectId
      }
    })
    .then(function(sessions) {
      var minutes = 0;
      sessions.forEach(function(session){
        if(session.endedAt) {
          minutes += Math.floor( (session.endedAt - session.createdAt)/1000/60 );
        }
      });

      reply({
        minutes: minutes
      }).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  getSessionHours: function(request, reply) {
    models.WorkSession.findAll({
      where: {
        id: request.params.sessionId
      }
    })
    .then(function(sessions) {
      var minutes = 0;
      sessions.forEach(function(session){
        if(session.endedAt) {
          minutes += Math.floor( (session.endedAt - session.createdAt)/1000/60 );
        }
      });

      reply({
        minutes: minutes
      }).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  }
}
