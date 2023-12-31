const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
    entry: "./src/entry.js",
    mode: "development",
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    output: {
      publicPath: 'http://localhost:3000/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--example-host',
                            },
                        },
                    },
                ],
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: "ExampleHost",
            remotes: {
                "ExampleRemote": "ExampleRemote@http://localhost:3001/remoteEntry.js",
                "ExampleRemoteSite": "ExampleRemoteSite@http://localhost:3002/remoteEntry.js",
                "ExampleRemoteProduct": "ExampleRemoteProduct@http://localhost:3003/remoteEntry.js",
                "ExampleRemoteAuth0": "ExampleRemoteAuth0@http://localhost:3005/remoteEntry.js",
            },
            exposes: {
                "./routes": "./src/hostRoutes",
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
                "react-router-dom": {
                  singleton: true,
                  requiredVersion: dependencies["react-router-dom"],
                },
                lodash: {
                    singleton: true,
                    requiredVersion: dependencies["lodash"],
                },
                "@auth0/auth0-react": {
                  singleton: true,
                  requiredVersion: dependencies["@auth0/auth0-react"],
                },
            },
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    target: "web",
};