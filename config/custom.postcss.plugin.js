export const customPlugin = {
  postcssPlugin: 'Custom Plugin',
  Once (Root) {
    console.log(Root)
  }
  /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

  /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

  /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
}
