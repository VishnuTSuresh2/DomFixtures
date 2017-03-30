function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
// requires and returns all modules that match

var modules = requireAll(require.context("./src", true, /\.spec\.(ts|js)$/));
// is an array containing all the matching modules