import test from 'ava'
import execa from 'execa'
import isAvailable from 'npm-name'

const path = './index.js'

test('when given no input, provides random related terms', async t => {
  const result = await execa.stdout(path, [])
  const lines = result.split('\n')
  t.is(lines[1], 'Some available package names:')
  t.true(lines.length > 3)
})

test('provides terms related to the given input', async t => {
  const result = await execa.stdout(path, ['car'])
  const lines = result.split('\n')
  t.is(lines[1], `Available package names related to 'car':`)
  t.true(lines.length > 3)
})

test('`--limit` flag limits the number of returned results', async t => {
  const result = await execa.stdout(path, ['car', '--limit=5'])
  const lines = result.split('\n')
  const items = lines[lines.length - 1].split(/\s+/g)
  t.is(lines[1], `Available package names related to 'car':`)
  t.true(items.length === 5)
})

test('results are available npm package names', async t => {
  const result = await execa.stdout(path, ['car'])
  const lines = result.split('\n')
  const names = lines[3].split(/ +/g)
  const availables = await Promise.all(names.map(isAvailable))

  availables.forEach((available, i) => {
    t.true(available, `${names[i]} is available`)
  })
})
