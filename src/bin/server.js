import app from '../app.js';

// import d from "dotenv/config"

// import ("dotenv").config();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
})
