# Prettier Configuration Documentation

This document explains the Prettier configuration used in the project.

## Rules and Configuration

- **`semi: true`**  
  *Enforces semicolons at the end of every statement.*

- **`singleQuote: true`**  
  *Uses single quotes (`'`) instead of double quotes (`"`) for strings.*

- **`trailingComma: "all"`**  
  *Adds trailing commas in objects and arrays, even after the last element.*

- **`arrowParens: "always"`**  
  *Always include parentheses in arrow functions, even with a single parameter.*

- **`printWidth: 100`**  
  *Sets the line length limit to 100 characters.*

- **`tabWidth: 2`**  
  *Defines the number of spaces per tab.*

- **`plugins`**  
  - `"@trivago/prettier-plugin-sort-imports"`  
    *Plugin for automatically sorting and organizing imports.*

- **`useTabs: false`**  
  *Uses spaces instead of tabs for indentation.*

- **`proseWrap: "preserve"`**  
  *Preserves line breaks in markdown and other prose content.*

- **`endOfLine: "lf"`**  
  *Uses LF (Line Feed) as the line ending (commonly used in UNIX/Linux).*

- **`importOrder`**  
  Defines the order of imports:
  - `"^[a-z]"`: *External dependencies in lowercase.*
  - `"^[A-Z]"`: *External dependencies in uppercase.*
  - `"^@/"`: *Local dependencies with an '@' prefix.*
  - `"^[./]"`: *Relative imports (e.g., `./` or `../`).*

- **`importOrderSeparation: true`**  
  *Adds a separation line between different groups of imports.*

- **`importOrderSortSpecifiers: true`**  
  *Sorts the imported specifiers alphabetically within each import statement.*
  