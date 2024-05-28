const asyncHandler = require('../../../middleware/async');
const Load = require('../../../schemas/Load');
const User = require('../../../schemas/User');
const cloudinary = require('cloudinary').v2;
const ErrorResponse = require('../../../utils/errorResponse');


// exports.fetch = asyncHandler(async (req, res, next) => { 
//     res.status(200).json(res.advancedResults);
// });
// exports.fetch = async (req, res, next) => {
//   try {
//     let filters = {}
//     const records = await Load.find(filters)
//       .populate('customer') 
//       .populate('shipper') 
//       .populate('consignee') 
//       .populate('carrier') 
//     res.status(201).json({ success: true, data: records });
//   } catch (error) {
//     console.error('ERROR', error);
//     return next(error);
//   }
// }
exports.fetch = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    // Build the filters object if there are any filters (currently empty)
    let filters = {};
    if(req.query.id){ filters._id = req.query.id }
    if(req.query.status){ filters.status = req.query.status }

    // Fetch records with pagination and sorting
    const records = await Load.find(filters)
      .populate('customer')
      .populate('shipper')
      .populate('consignee')
      .populate('carrier')
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    // Get total count of records for pagination metadata
    const totalRecords = await Load.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: records,
      pagination: {
        totalRecords,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalRecords / limitNumber)
      }
    });
  } catch (error) {
    console.error('ERROR', error);
    return next(error);
  }
};

//--////////////////////////////////
//--////////////////////////////////
//--////////////////////////////////
// Create a Load with multiple images
exports.create = async (req, res, next) => {
    try {
        const createdBy = req.user.id;
        // let address = JSON.parse(req.body.address);
      
      // Extracting image URLs from Cloudinary response
      const assets = (req.files) ? req.files.map(file => file.path) : [];
  
      // Create the Load
      const record = await Load.create({...req.body, assets, createdBy });
  
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
//     const record = await Load.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if(!record) return next(new ErrorResponse("Record not found!", 400))
        
//     // const record = await Load.findById(req.params.id)
//     // if(!record) return next(new ErrorResponse("Record not found!", 400))
//         // Make sure user is Load owner
//     // if (record.seller.toString() !== req.user.id) {
//     //     return next(
//     //         new ErrorResponse(
//     //             `User ${req.user.id} is not authorized to update this Load`,
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
      const record = await Load.findById(id);
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
        const record = await Load.findById(req.params.id)
        if(!record) return next(new ErrorResponse("Record not found!", 400))
          // Make sure user is Load owner
        // if (record.seller.toString() !== req.user.id) {
        //     return next(
        //       new ErrorResponse(
        //           `User ${req.user.id} is not authorized to delete this Load`,
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