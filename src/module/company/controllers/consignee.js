const asyncHandler = require('../../../middleware/async');
const Consignee = require('../../../schemas/Consignee');
const User = require('../../../schemas/User');
const cloudinary = require('cloudinary').v2;
const ErrorResponse = require('../../../utils/errorResponse');


exports.fetch = asyncHandler(async (req, res, next) => { 
    res.status(200).json(res.advancedResults);
});
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
// Create a Consignee with multiple images
exports.create = async (req, res, next) => {
    try {
        const createdBy = req.user.id;
        // let address = JSON.parse(req.body.address);
      
      // Extracting image URLs from Cloudinary response
      const assets = (req.files) ? req.files.map(file => file.path) : [];

  
      // Create the Consignee
      const record = await Consignee.create({...req.body, assets, createdBy });
  
      res.status(201).json({ success: true, record });
    } catch (error) {
      console.error('ERROR', error);
      return next(error);
    }
  };
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
// exports.update = async (req, res, next) => {
// try {
//     const record = await Consignee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if(!record) return next(new ErrorResponse("Record not found!", 400))
        
//     // const record = await Consignee.findById(req.params.id)
//     // if(!record) return next(new ErrorResponse("Record not found!", 400))
//         // Make sure user is Consignee owner
//     // if (record.seller.toString() !== req.user.id) {
//     //     return next(
//     //         new ErrorResponse(
//     //             `User ${req.user.id} is not authorized to update this Consignee`,
//     //             401
//     //         )
//     //     );
//     // }
//     // record.name = req.body.name || record.name;
//     // record.description = req.body.description || record.description;
//     // record.price = req.body.price || record.price;
//     // record.filters = (req.body.filters) ? JSON.parse(req.body.filters) : record.filters;
//     // record.photos = (req.files && req.files.length > 0) ? req.files.map(file => file.path) : record.photos;
//     // await record.save();
//     res.status(200).json({
//         success: true,
//         data: record
//     });
// } catch (error) {
//         console.error(error);
//         return next(error)
//     }
// }
exports.update = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { deleteAssets = [] } = req.body; // List of assets to be deleted
      const newFiles = (req.files) ? req.files.map(file => file.path) : [];
      
      // Fetch the existing record
      const record = await Consignee.findById(id);
      if (!record) {
          return res.status(404).json({ success: false, message: 'Record not found' });
      }

      // Delete specified assets from Cloudinary
      for (const asset of deleteAssets) {
          await cloudinary.uploader.destroy(asset, (error, result) => {
              if (error) console.error('Cloudinary Deletion Error:', error);
          });
      }

      // Filter out deleted assets from the record
      record.assets = record.assets.filter(asset => !deleteAssets.includes(asset));

      // Add new assets
      record.assets.push(...newFiles);

      // Update other fields
      Object.assign(record, req.body);

      // Save the updated record
      await record.save();

      res.status(200).json({ success: true, record });
  } catch (error) {
      console.error('ERROR', error);
      return next(error);
  }
};
//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
exports.delete = async (req, res, next) => {
    try {
        const record = await Consignee.findById(req.params.id)
        if(!record) return next(new ErrorResponse("Record not found!", 400))
          // Make sure user is Consignee owner
        // if (record.seller.toString() !== req.user.id) {
        //     return next(
        //       new ErrorResponse(
        //           `User ${req.user.id} is not authorized to delete this Consignee`,
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