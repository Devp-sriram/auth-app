const express = require('express');
const router = express.Router();
const UploadModel = require('../models/uploads');
const fs = require('fs');
const path = require('path');

// Adjust the file path to correctly point to your files directory
const filePath = path.join(__dirname, '../task -1/files');

router.delete('/:id', async (req, res) => {
    try {
        const post = await UploadModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const fileToDelete = path.join(filePath, post.image);
        if (!fs.existsSync(fileToDelete)) {
            return res.status(404).send('File not found');
        }

        fs.unlink(fileToDelete, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).send('Error deleting file');
            }

            UploadModel.findByIdAndDelete(req.params.id, (err) => {
                if (err) {
                    console.error('Error deleting post:', err);
                    return res.status(500).send('Error deleting post');
                }
                res.send('Post and file deleted successfully');
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
