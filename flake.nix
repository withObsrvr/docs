{
  description = "Obsrvr Documentation - Docusaurus development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    # Use a specific nixpkgs revision that still has Node.js 18
    nixpkgs-node18.url = "github:NixOS/nixpkgs/a3ed7406349a9335cb4c2a71369b697cecd9d351";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, nixpkgs-node18, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        pkgs-node18 = nixpkgs-node18.legacyPackages.${system};
        
        # Use Node.js 18 from the older nixpkgs
        nodejs = pkgs-node18.nodejs_18;
        # Use yarn from current nixpkgs but override with our Node.js 18
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
            # Set custom prompt
            export PS1="\[\033[1;36m\][obsrvr-docs]\[\033[0m\] \[\033[1;32m\]\u@\h\[\033[0m\]:\[\033[1;34m\]\w\[\033[0m\]\$ "
            echo "🚀 Obsrvr Documentation Development Environment"
            echo "📦 Node.js version: $(node --version)"
            echo "📦 Yarn version: $(yarn --version)"
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