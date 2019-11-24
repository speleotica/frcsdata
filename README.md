# @speleotica/frcsdata

[![CircleCI](https://circleci.com/gh/speleotica/frcsdata.svg?style=svg)](https://circleci.com/gh/speleotica/frcsdata)
[![Coverage Status](https://codecov.io/gh/speleotica/frcsdata/branch/master/graph/badge.svg)](https://codecov.io/gh/speleotica/frcsdata)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/%40speleotica%2Ffrcsdata.svg)](https://badge.fury.io/js/%40speleotica%2Ffrcsdata)

Parser for Chip Hopper's survey data format used in Fisher Ridge Cave System

# Parse function variants

## AsyncIterable: `parseFrcsXFile(file: string, lines: AsyncIterable<string>): Promise<FrcsXFile>`

These can be imported from the package root (`@speleotica/frcsdata`). The other variants wrap these.

## String: `parseFrcsXFile(file: string, data: string): Promise<FrcsXFile>`

These can be imported from `@speleotica/frcsdata/string`.

## Node: `parseFrcsXFile(file: string): Promise<FrcsXFile>`

These can be imported from `@speleotica/frcsdata/node` and read the given file from disk. They require Node >=12.

# File types

I'm not going to document this much right now but there are three types of files:

## Survey Files

These files typically look like `cdata.fr` where the extension is actually an abbrevation of the cave name.

```js
import { parseFrcsSurveyFile } from '@speleotica/frcsdata'
import { parseFrcsSurveyFile } from '@speleotica/frcsdata/node'
import { parseFrcsSurveyFile } from '@speleotica/frcsdata/string'
```

These functions return a `Promise` that resolves to an [`FrcsSurveyFile`](/src/FrcsSurveyFile.ts).

## Trip Summary Files

These files typically look like `STAT_sum.txt`.

```js
import { parseFrcsTripSummaryFile } from '@speleotica/frcsdata'
import { parseFrcsTripSummaryFile } from '@speleotica/frcsdata/node'
import { parseFrcsTripSummaryFile } from '@speleotica/frcsdata/string'
```

These functions return a `Promise` that resolves to an [`FrcsTripSummaryFile`](/src/FrcsTripSummaryFile.ts).

## Plot Files

These files typically look like `FOR008.fr` where the extension is actually an abbrevation of the cave name.

```js
import { parseFrcsPlotFile } from '@speleotica/frcsdata'
import { parseFrcsPlotFile } from '@speleotica/frcsdata/node'
import { parseFrcsPlotFile } from '@speleotica/frcsdata/string'
```

These functions return a `Promise` that resolves to an [`FrcsPlotFile`](/src/FrcsPlotFile.ts).
