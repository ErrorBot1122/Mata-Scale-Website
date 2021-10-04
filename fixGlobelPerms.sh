mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
NPM_CONFIG_PREFIX=~/.npm-global

# Test
npm i -g jshint