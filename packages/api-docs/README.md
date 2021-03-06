# @fluentui/api-docs

Processes `package-name.api.json` files generated by [API Extractor](https://api-extractor.com/) into `ComponentName.page.json` files used to populate API reference tables, mainly in the [Fluent UI website's Controls section](https://developer.microsoft.com/en-us/fluentui#/controls/web).

## Using the tool

1. In each API item which should be included on the website (see [Limitations](#limitations) below for supported item types), include a `{@docCategory PageName}` annotation in its top-level doc comment. If the item is related to a specific component, `PageName` should be the name of the component. Otherwise, you can use either the name of the item or a general category that it falls under.

```ts
/**
 * Comment about the props
 * {@docCategory Foo}
 */
interface FooProps {}
```

2. Add a config and build step to run [API Extractor](https://api-extractor.com/) on your package. (Fluent UI has a [shared config](https://github.com/microsoft/fluentui/blob/master/scripts/api-extractor/api-extractor.common.json) extended by each package's config.)

3. Somewhere in your repo (probably in the package that displays the documentation), add a build step to invoke the `generatePageJsonFiles` API. For the config object, see [`IPageJsonOptions` in this file](https://github.com/microsoft/fluentui/blob/master/packages/api-docs/src/types.ts) for docs and [this file](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-resources/config/api-docs.js) for an example.

```js
const { generatePageJsonFiles } = require('@fluentui/api-docs');
const config = {}; // your config here
generatePageJsonFiles(config);
```

4. To render the info from `*.page.json` files, you can either use [`ApiReferencesTableSet`](https://github.com/microsoft/fluentui/blob/master/packages/react-docsite-components/src/components/ApiReferencesTable/ApiReferencesTableSet.tsx) from `@fluentui/react-docsite-components`, or use its logic as a template for your own control.

## Limitations

### Supported API items

Documenting the following API items/types is **supported**:

- Interfaces
- Type aliases
- Classes
- Enums

These API items/types are **not supported** currently (PRs welcome):

- Functions (including function components)
- Constants

### Markdown

If you're using `ApiReferencesTableSet` for rendering the output, top-level doc comments have full markdown support, but individual prop comments have limited support (currently just inline code blocks) due to performance concerns. (May not apply if you've written your own renderer.)

### Prop comments

API Extractor has a particular format required for certain types of doc comments and will fail at build time if this format is not followed. There are also a few suggested best practices.

<table>
<tr>
<th></th>
<th>Good</th>
<th>Bad</th>
</tr>
<tr>
<td><code>@param</code> tags must include a dash and not contain type information</td>
<!-- KEEP EXAMPLES SHORT - otherwise it makes the page scroll horizontally -->
<!-- good -->
<td><pre lang="ts">
/**
 * @param myParam - Description here
 */
</pre></td>
<!-- bad -->
<td><pre lang="ts">
/**
 * @param myParam Description here
 * @param {number} myParam Description here
 */
</pre></tr>
<tr>
<td>Special characters which have meaning in TSDoc (e.g. <code>@ > { }</code>) must be escaped with backslashes or backticks</td>
<!-- KEEP EXAMPLES SHORT - otherwise it makes the page scroll horizontally -->
<!-- good -->
<td><pre lang="ts">
/**
 * Comment about `>` and `{`.
 * As of version \>= 1.0.0.
 */
</pre></td>
<!-- bad -->
<td><pre lang="ts">
/**
 * Comment about '>' and '{'.
 * As of version >= 1.0.0.
 */
</pre></td>
</tr>
<tr>
<td><code>@deprecated</code> tags should include a deprecation message</td>
<!-- KEEP EXAMPLES SHORT - otherwise it makes the page scroll horizontally -->
<!-- good -->
<td><pre lang="ts">
/**
 * @deprecated Use `foo` instead.
 */
</pre></td>
<!-- bad -->
<td><pre lang="ts">
/**
 * Deprecated. Use `foo` instead.
 * @deprecated
 */
</pre></td>
</tr>
<tr>
<td>Default values should be indicated by <code>@defaultvalue</code> tags (<code>@default</code> and <code>@defaultValue</code> also work)</td>
<!-- KEEP EXAMPLES SHORT - otherwise it makes the page scroll horizontally -->
<!-- good -->
<td><pre lang="ts">
/**
 * @defaultvalue 'hello world'
 */
</pre></td>
<!-- bad -->
<td><pre lang="ts">
/**
 * Default is 'hello world'
 */
</pre></td>
</tr>
</table>
