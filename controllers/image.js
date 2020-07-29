const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f2434bacdc0d415b9056a0e17a281b3e'
});

const handleImageUrl = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json("Error working with ClarifyAPI"))
}

const handleImage = (req, res ,db) => {
    const { id } = req.body;
    db('users')
        .returning('entries')
        .where('id', '=', id)
        .increment('entries', 1)
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Error Updating Entries!!'));
}

module.exports = { 
    handleImage : handleImage,
    handleImageUrl :handleImageUrl
}