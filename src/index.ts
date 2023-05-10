import {parser} from "./syntax.grammar"
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
  HighlightStyle,
  syntaxHighlighting
} from "@codemirror/language"
import {Tag, styleTags, tags as t} from "@lezer/highlight"

let customTags = {
  vernacular: Tag.define()
}

export let highlight = HighlightStyle.define([
  { tag: customTags.vernacular, color:"#6637dd" }
])

export const coqLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren,
        Vernacular: customTags.vernacular
      })
    ]
  }),
  languageData: {
    // commentTokens: {line: ";"}
  }
})

export function coq() {
  return new LanguageSupport(coqLanguage)
}

export function coqSyntaxHighlighting() {
  return syntaxHighlighting(highlight);
}
