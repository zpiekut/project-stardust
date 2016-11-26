var models = require('../../models');

exports.sessions = {
  all: function(request, reply) {
    models.WorkSession.findAll()
    .then(function(sessions) {
      reply(sessions).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  startWorkSession: function(request, reply) {
    models.WorkSession.create({
      createdAt: Date.now(),
      UserId: request.payload.userId,
      ProjectId: request.payload.projectId,
      approved: false
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
  approveWorkSession: function(request, reply) {
    var sessionId = request.payload.sessionId;

    models.WorkSession.update(
      { approved: true },
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
  getProjectTimeLeft: function(request, reply) {
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

      models.Project.findById(request.params.projectId)
      .then(function (project) {
        var minutesLeft = (project.hours * 60) - minutes;
        reply({minutes: minutesLeft}).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  getUserHours: function(request, reply) {
    models.WorkSession.findAll({
      where: {
        UserId: request.params.userId
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
  getAllUserHours: function(request, reply) {
    models.sequelize.query(
      "Select UserId, SUM(timestampdiff( minute, w.createdAt, w.endedAt )) as minutes from worksessions w group by w.UserId"
    )
    .then(function(userTimes){
      console.log(userTimes);
      reply(userTimes[0]).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  getPersonProjectHours: function(request, reply) {
    models.WorkSession.findAll({
      where: {
        ProjectId: request.params.projectId,
        UserId: request.params.userId
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
  getPersonProjectUnapprovedSessions: function(request, reply) {
    models.WorkSession.findAll({
      where: {
        ProjectId: request.params.projectId,
        UserId: request.params.userId,
        approved: false
      }
    })
    .then(function(sessions) {
      reply(sessions).code(200);
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
  },
  getTotalHours: function(request, reply) {
    models.WorkSession.findAll()
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
