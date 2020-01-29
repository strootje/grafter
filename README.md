# Grafter
[![Build Status](https://drone.strootje.com/api/badges/strootje/grafter/status.svg)](https://drone.strootje.com/strootje/grafter)

## TODO
add the `--merge` option. This merges all packs into one split up into namespaces

## Usage
```
grafter build <target> [source]
grafter serve <target> [source]
grafter pack <target> [source]

// Simple build (builds to ./dist)
grafter build

// Build to ./dist folder
grafter build ./dist

// Build to Minecraft world
grafter build <[profile_name:]world_name>

// Serve to Minecraft world and watch for changes
grafter serve <[profile_name:]world_name>

// Build to ./dist folder as archive
grafter pack ./dist
```
