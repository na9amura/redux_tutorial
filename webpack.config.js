module.exports = {
    mode: "development",
    entry: ["./src/app.js"],
    output: {
        path: __dirname + "/dist",
        filename: "app.js"
    },
    module: {
        rules: [
            {
                resource: {
                test: /\.jsx?$/,
                exclude: /node_modules/
                },
                use: ["babel-loader"]
            }
        ]
    }
}