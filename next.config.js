const withSass = require("@zeit/next-sass");
const compose = require('next-compose')

const sassConfig =  {
	sassLoaderOptions: {
		includePaths: ["src/"]
	}
};

module.exports = compose(
  [withSass, sassConfig],
	{
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
  }
);


