const fs = require('fs')

const __log = (...args) => console.debug(...args)

const categories = {
  major: 0,
  minor: 1,
  patch: 2,
}

const [, , category] = process.argv

// Validate the passed category
const categoryValues = Object.keys(categories)
if (!categoryValues.includes(category)) {
  const categoryOptions = categoryValues.map(c => `"${c}"`).join(', ')
  throw new Error(
    `Category required.\nUseage: node bump.js [category].\nPossible values: ${categoryOptions}`
  )
}

// Returns the new version number, zeroing out other values if necessary
// Receives "1.1.1" and would return "1.2.0" if type were `minor`
function getNewVersion(version = '0.0.0', type) {
  const parsed = version.split('.').map(Number)

  const index = categories[type]
  parsed[index]++

  // decrement the other version categories
  let i = index + 1
  while (i <= 2) {
    parsed[i] = 0
    ++i
  }

  return parsed.join('.')
}

const pkg = require('../package.json')

__log(`Current package version: ${pkg.version}`)

const newVersion = getNewVersion(pkg.version, category)

__log(`Bumping to ${newVersion}`)

const newPkg = { ...pkg, version: newVersion }

fs.writeFile('package.json', JSON.stringify(newPkg, null, 2), (err, res) => {
  if (err) {
    return __log('Failed to write to package.json')
  }
  __log('Written to package.json')
})
