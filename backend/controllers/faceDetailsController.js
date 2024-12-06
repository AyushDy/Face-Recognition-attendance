const FaceDetails = require('../model/faceDetailsSchema.js');

module.exports.updateFaceData = async (req, res) => {
    try {
        const newArray = req.body

        if (!Array.isArray(newArray) || newArray.some(item => !item.label || !Array.isArray(item.descriptors))) {
            return res.status(400).send('Invalid input format. Expected an array of objects with `label` and `descriptors`.');
        }

        // Fetch the existing array in the database
        let faceData = await FaceDetails.findOne();
        console.log('Existing data:', faceData);

        if (!faceData) {
            // No existing data: add the entire newArray
            faceData = new FaceDetails({ data: newArray });
        } else {
            // Use a map to track existing labels and descriptors for quick lookup
            const existingDataMap = new Map(faceData.data.map(item => [item.label, JSON.stringify(item.descriptors)]));

            // Filter out elements that are already present
            const missingElements = newArray.filter(item => {
                const descriptorsString = JSON.stringify(item.descriptors);
                return !existingDataMap.has(item.label);
            });

            if (missingElements.length === 0) {
                return res.status(200).send('No new elements to add.');
            }

            // Add only the missing elements to the existing data array
            faceData.data.push(...missingElements);
        }

        // Save the updated document
        await faceData.save();
        return res.status(200).send('Array updated successfully with missing elements.');

    } catch (error) {
        console.error('Error updating face data:', error);
        return res.status(500).send('Server error');
    }
};


module.exports.getFaceData = async (req, res) => {
    try {
        // Find the face data document
        const faceData = await FaceDetails.findOne();

        if (!faceData) {
            return res.status(404).send('No face data found.');
        }

        // Return the entire data array
        return res.status(200).json(faceData.data);
    } catch (error) {
        console.error('Error fetching face data:', error);
        return res.status(500).send('Server error');
    }
};
