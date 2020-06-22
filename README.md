<img src="https://raw.githubusercontent.com/bradlc/vscode-tailwindcss/diagnostics/.github/banner.png" alt="" />

## Installation

In order for the extension to activate you must have [`tailwindcss` installed](https://tailwindcss.com/docs/installation/#1-install-tailwind-via-npm) and a [Tailwind config file](https://tailwindcss.com/docs/installation/#3-create-your-tailwind-config-file-optional) named `tailwind.config.js` or `tailwind.js` in your workspace.

## Features

- **Autocomplete**  
  Intelligent suggestions for class names, [CSS directives](https://tailwindcss.com/docs/functions-and-directives/), and the [`theme` helper](https://tailwindcss.com/docs/functions-and-directives/#theme)

<img src="https://raw.githubusercontent.com/bradlc/vscode-tailwindcss/diagnostics/.github/autocomplete.png" alt="" />

- **Hover Preview**  
  See the complete CSS for a Tailwind class name by hovering over it

<img src="https://raw.githubusercontent.com/bradlc/vscode-tailwindcss/diagnostics/.github/hover.png" alt="" />

- **Linting**  
  Highlights errors and potential bugs in your HTML and CSS files

<img src="https://raw.githubusercontent.com/bradlc/vscode-tailwindcss/diagnostics/.github/linting.png" alt="" />

- **CSS Syntax Highlighting**  
  Provides syntax definitions so that use of Tailwind features doesn’t mess up your syntax highlighting

## Troubleshooting

## Settings

### `tailwindCSS.includeLanguages`

This setting allows you to add additional language support. The key of each entry is the new language ID and the value is any one of the extensions built-in languages, depending on how you want the new language to be treated (e.g. `html`, `css`, or `javascript`):

```json
{
  "tailwindCSS.includeLanguages": {
    "plaintext": "html"
  }
}
```

### `tailwindCSS.emmetCompletions`

Enable completions when using [Emmet](https://emmet.io/)-style syntax, for example `div.bg-red-500.uppercase`. **Default: `false`**

```json
{
  "tailwindCSS.emmetCompletions": true
}
```

### `tailwindCSS.validate`

Enable linting. Rules can be configured individually using the `tailwindcss.lint` settings:

- `ignore`: disable lint rule entirely
- `warning`: rule violations will be considered "warnings," typically represented by a yellow underline
- `error`: rule violations will be considered "errors," typically represented by a red underline
