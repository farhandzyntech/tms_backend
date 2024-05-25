const Customer = require('../../../schemas/Customer');
const Carrier = require('../../../schemas/Carrier');
const Consignee = require('../../../schemas/Consignee');
const Shipper = require('../../../schemas/Shipper');
const User = require('../../../schemas/User');
const ErrorResponse = require('../../../utils/errorResponse');
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
exports.customer = async (req, res, next) => {
  try {
    const records = await Customer.find();
    res.status(201).json({ success: true, records });
  } catch (error) {
    console.error('ERROR', error);
    return next(error);
  }
}
//--////////////////////////////////
exports.consignees = async (req, res, next) => {
  try {
    const records = await Consignee.find();
    res.status(201).json({ success: true, records });
  } catch (error) {
    console.error('ERROR', error);
    return next(error);
  }
}
//--////////////////////////////////
exports.carriers = async (req, res, next) => {
  try {
    const records = await Carrier.find();
    res.status(201).json({ success: true, records });
  } catch (error) {
    console.error('ERROR', error);
    return next(error);
  }
}
//--////////////////////////////////
exports.shippers = async (req, res, next) => {
  try {
    const records = await Shipper.find();
    res.status(201).json({ success: true, records });
  } catch (error) {
    console.error('ERROR', error);
    return next(error);
  }
}
//--////////////////////////////////