# js-cli
> Cli templates for javascript.

## template
```sh
# clone the template
tiged git@github.com:aric-tpls/js-cli.git
replace-in-files --string diary-cli --replacement $(pwd | awk -F'/' '{printf $NF}') *
replace-in-files --string "jsc" --replacement "your-name" *

# update the package.json
{
   "name": "@jswork/your-name",
   "description": "Your description.",
   "private": true, # remove this if you want to publish to npm
}
```

## develop
```sh
# show the current link infomation
ls -alh $(which jsc)

# this is a link to the bin/index.mjs file
NVM_VERSION/node/v20.8.0/bin/jsc -> ../lib/node_modules/js-cli/bin/index.mjs
```
