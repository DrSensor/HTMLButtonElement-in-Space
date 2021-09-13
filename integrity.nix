{
  dlint.x86_64-linux.sha256 = "1l2a2f7vvnwvawqc6jm5mcp13f3xarszgslbfcq23ck2d8xl3zi0";
  dprint.x86_64-linux.sha256 = "0iqk7fj2qcwzbyxjj0zyzjmhs0m2xsqffx1p7bks7xhd1r6lryjc";
  # use `nix run -- nixpkgs#nix-prefetch fetchzip --url -E "https://github.com/${owner}/${repo}/releases/latest/download/${name}-${target}.zip""`
  # dprint.x86_64-linux.sha256 = "";
  # dlint.x86_64-linux.sha256 = "";
  # dprint.x86_64-darwin.sha256 = "";
  # dlint.x86_64-darwin.sha256 = "";
  # dprint.x86_64-windows.sha256 = "";
  # dlint.x86_64-windows.sha256 = "";

  # use `nix run -- nixpkgs#nix-prefetch fetchzip --url -E "https://registry.npmjs.org/${packageName}/-/${packageName}-${version}.tgz"`
  # esbuild.sha512 = "";
  # https://github.com/msteen/nix-prefetch/issues/3#issuecomment-876771025
  # nix-prefetch '{ sha256 }: (callPackage (import ./default.nix) { }).go-modules.overrideAttrs (_: { modSha256 = sha256; })'
}
