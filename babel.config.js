module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
        'babel-plugin-component',
        {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
        }
    ]
]
};
