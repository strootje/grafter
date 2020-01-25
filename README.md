# Graft
[![Build Status](https://drone.strootje.com/api/badges/strootje/graft/status.svg)](https://drone.strootje.com/strootje/graft)

## TODO
add the `--merge` option. This merges all packs into one split up into namespaces

## Usage
```
graft build <target> [source]
graft serve <target> [source]
graft pack <target> [source]

// Simple build (builds to ./dist)
graft build

// Build to ./dist folder
graft build ./dist

// Build to Minecraft world
graft build <[profile_name:]world_name>

// Serve to Minecraft world and watch for changes
graft serve <[profile_name:]world_name>

// Build to ./dist folder as archive
graft pack ./dist
```
