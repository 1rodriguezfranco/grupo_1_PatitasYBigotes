const express = require("express")
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log('Servidor corriendo en ' + PORT);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});