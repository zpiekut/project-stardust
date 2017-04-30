var models = require('../../models');

exports.voucherCode = {
	userCodes: function(request, reply) {
		models.VoucherCode.findAll({
			where: { UserId: request.params.userId },
      include: [{
        model: models.Redemption, as: 'Redemption'
      }]
    })
    .then(function(voucherCodes) {
    	reply(voucherCodes).code(200);
    })
    .catch(function(error) {
    	console.log(error);
    	reply().code(500);
    });
	}
}