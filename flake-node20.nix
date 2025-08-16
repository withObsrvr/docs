{
  description = "Obsrvr Documentation - Docusaurus development environment (Node.js 20)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        nodejs = pkgs.nodejs_20;
        yarn = pkgs.yarn.override { inherit nodejs; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            yarn
            git
            # Optional: Additional tools that might be useful
            nodePackages.npm-check-updates
            nodePackages.serve
          ];

          shellHook = ''
            echo "🚀 Obsrvr Documentation Development Environment"
            echo "📦 Node.js version: $(node --version)"
            echo "📦 Yarn version: $(yarn --version)"
            echo ""
            echo "⚠️  WARNING: Using Node.js 20 instead of Node.js 18"
            echo "⚠️  The project specifies Node.js 18+, so this should work fine."
            echo ""
            echo "Available commands:"
            echo "  yarn install    - Install dependencies"
            echo "  yarn start      - Start development server"
            echo "  yarn build      - Build for production"
            echo "  yarn serve      - Serve production build"
            echo ""
            
            # Set up Node.js environment
            export NODE_ENV=development
            
            # Ensure node_modules/.bin is in PATH for locally installed packages
            export PATH="$PWD/node_modules/.bin:$PATH"
            
            # Create a local tmp directory for Node.js if needed
            export TMPDIR="$PWD/.tmp"
            mkdir -p $TMPDIR
            
            # Check if dependencies are installed
            if [ ! -d "node_modules" ]; then
              echo "⚠️  Dependencies not installed. Run 'yarn install' to get started."
            fi
          '';

          # Environment variables
          NODE_ENV = "development";
          
          # Prevent npm/yarn from trying to install packages globally
          NPM_CONFIG_PREFIX = "$PWD/.npm-global";
          YARN_GLOBAL_FOLDER = "$PWD/.yarn-global";
        };
      }
    );
}