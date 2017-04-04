import test from 'ava'
import execa from 'execa'
import isAvailable from 'npm-name'

const path = './bin/index.js'

test('when given no input, provides random related terms', async t => {
  let result = await execa.stdout(path, [])
  let lines = result.split('\n')
  t.is(lines[1], 'Some available package names:')
  t.true(lines.length > 3)
})

test('provides terms related to the given input', async t => {
  let result = await execa.stdout(path, ['car'])
  let lines = result.split('\n')
  t.is(lines[1], `Available package names related to 'car':`)
  t.true(lines.length > 3)
})

test('`--limit` flag limits the number of returned results', async t => {
  let result = await execa.stdout(path, ['car', '--limit=5'])
  let lines = result.split('\n')
  let items = lines[lines.length - 1].split(/\s+/g)
  t.is(lines[1], `Available package names related to 'car':`)
  t.true(items.length === 5)
})

test('results are available npm package names', async t => {
  let result = await execa.stdout(path, ['car'])
  let lines = result.split('\n')
  let names = lines[3].split(/ +/g)
  let availables = await Promise.all(names.map(isAvailable))

  availables.forEach((available, i) => {
    t.true(available, `${names[i]} is available`)
  })
})
