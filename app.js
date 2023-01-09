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
app.get("/carrito", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"));
})

app.get('/productdetails', (req,res)=>{
    res.sendFile(__dirname + '/views/productdetails.html');
});

app.get("/login", (req, res) => {res.sendFile(path.join(__dirname,"./views/login.html"))});
app.get("/recoverpassword", (req, res) => {res.sendFile(path.join(__dirname,"./views/recoverpassword.html"))});
app.get("/newpassword", (req, res) => {res.sendFile(path.join(__dirname,"./views/newpassword.html"))});