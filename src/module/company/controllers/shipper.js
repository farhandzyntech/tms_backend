const asyncHandler = require('../../../middleware/async');
const Shipper = require('../../../schemas/Shipper');
const User = require('../../../schemas/User');
const ErrorResponse = require('../../../utils/errorResponse');


exports.fetch = asyncHandler(async (req, res, next) => { 
    res.status(200).json(res.advancedResults);
});
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
// Create a Shipper with multiple images
exports.create = async (req, res, next) => {
    try {
        const createdBy = req.user.id;
        // let address = JSON.parse(req.body.address);
      
      // Extracting image URLs from Cloudinary response
    //   const photos = req.files.map(file => file.path);
  
      // Create the Shipper
      const record = await Shipper.create({...req.body, createdBy });
  
      res.status(201).json({ success: true, record });
    } catch (error) {
      console.error('ERROR', error);
      return next(error);
    }
  };
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
exports.update = async (req, res, next) => {
try {
    const record = await Shipper.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if(!record) return next(new ErrorResponse("Record not found!", 400))
        
    // const record = await Shipper.findById(req.params.id)
    // if(!record) return next(new ErrorResponse("Record not found!", 400))
        // Make sure user is Shipper owner
    // if (record.seller.toString() !== req.user.id) {
    //     return next(
    //         new ErrorResponse(
    //             `User ${req.user.id} is not authorized to update this Shipper`,
    //             401
    //         )
    //     );
    // }
    // record.name = req.body.name || record.name;
    // record.description = req.body.description || record.description;
    // record.price = req.body.price || record.price;
    // record.filters = (req.body.filters) ? JSON.parse(req.body.filters) : record.filters;
    // record.photos = (req.files && req.files.length > 0) ? req.files.map(file => file.path) : record.photos;
    // await record.save();
    res.status(200).json({
        success: true,
        data: record
    });
} catch (error) {
        console.error(error);
        return next(error)
    }
}
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
exports.delete = async (req, res, next) => {
    try {
        const record = await Shipper.findById(req.params.id)
        if(!record) return next(new ErrorResponse("Record not found!", 400))
          // Make sure user is Shipper owner
        // if (record.seller.toString() !== req.user.id) {
        //     return next(
        //       new ErrorResponse(
        //           `User ${req.user.id} is not authorized to delete this Shipper`,
        //           401
        //       )
        //     );
        // }
        await record.deleteOne()
        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        console.error(error);
        return next(error)
    }
  }
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////