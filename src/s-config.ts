export default (framework?: string) => {
  switch (framework) {
    case 'hexo':
      return {
        sourceDir: 'source',
        outputDir: 'public',
      };
    default:
      return {
        sourceDir: 'src',
        outputDir: 'build',
      };
  }
};
