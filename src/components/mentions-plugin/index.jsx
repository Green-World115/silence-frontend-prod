import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalTypeaheadMenuPlugin, useBasicTypeaheadTriggerMatch } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { TextNode } from "lexical";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { $createMentionNode } from "./MentionNode";

const PUNCTUATION = "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";
const NAME = "\\b[A-Z][^\\s" + PUNCTUATION + "]";

const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION,
};

const CapitalizedNameMentionsRegex = new RegExp("(^|[^#])((?:" + DocumentMentionsRegex.NAME + "{" + 1 + ",})$)");

const PUNC = DocumentMentionsRegex.PUNCTUATION;

const TRIGGERS = ["@"].join("");

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = "[^" + TRIGGERS + PUNC + "\\s]";

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS =
  "(?:" +
  "\\.[ |$]|" + // E.g. "r. " in "Mr. Smith"
  " |" + // E.g. " " in "Josh Duck"
  "[" +
  PUNC +
  "]|" + // E.g. "-' in "Salier-Hellendag"
  ")";

const LENGTH_LIMIT = 75;

const AtSignMentionsRegex = new RegExp(
  "(^|\\s|\\()(" + "[" + TRIGGERS + "]" + "((?:" + VALID_CHARS + VALID_JOINS + "){0," + LENGTH_LIMIT + "})" + ")$"
);

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp(
  "(^|\\s|\\()(" + "[" + TRIGGERS + "]" + "((?:" + VALID_CHARS + "){0," + ALIAS_LENGTH_LIMIT + "})" + ")$"
);

function checkForCapitalizedNameMentions(text, minMatchLength) {
  const match = CapitalizedNameMentionsRegex.exec(text);
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[2];
    if (matchingString != null && matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: matchingString,
      };
    }
  }
  return null;
}

function checkForAtSignMentions(text, minMatchLength) {
  let match = AtSignMentionsRegex.exec(text);

  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[3];
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      };
    }
  }
  return null;
}

function getPossibleQueryMatch(text) {
  const match = checkForAtSignMentions(text, 1);
  return match === null ? checkForCapitalizedNameMentions(text, 3) : match;
}

function MentionsTypeaheadMenuItem({ index, isSelected, onClick, onMouseEnter, option }) {
  let className = "item";
  if (isSelected) {
    className += " selected";
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.picture}
      <span className="text">{option.name}</span>
    </li>
  );
}

export default function MentionsPlugin({ options, onQueryChange }) {
  const [editor] = useLexicalComposerContext();

  const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const onSelectOption = useCallback(
    (selectedOption, nodeToReplace, closeMenu) => {
      editor.update(() => {
        const mentionNode = $createMentionNode(selectedOption.name);
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode);
        }
        mentionNode.select();
        closeMenu();
      });
    },
    [editor]
  );

  const checkForMentionMatch = useCallback(
    (text) => {
      const mentionMatch = getPossibleQueryMatch(text);
      const slashMatch = checkForSlashTriggerMatch(text, editor);
      return !slashMatch && mentionMatch ? mentionMatch : null;
    },
    [checkForSlashTriggerMatch, editor]
  );

  return (
    <>
      <LexicalTypeaheadMenuPlugin
        onQueryChange={(q) => onQueryChange && onQueryChange(q)}
        onSelectOption={onSelectOption}
        triggerFn={checkForMentionMatch}
        options={options}
        // menuRenderFn={(anchorElementRef, { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }) => {
        //   return anchorElementRef && options.length > 0
        //     ? ReactDOM.createPortal(
        //         <div className="typeahead-popover mentions-menu">
        //           <ul>
        //             {options.map((option, i) => (
        //               <MentionsTypeaheadMenuItem
        //                 index={i}
        //                 isSelected={selectedIndex === i}
        //                 onClick={() => {
        //                   setHighlightedIndex(i);
        //                   selectOptionAndCleanUp(option);
        //                 }}
        //                 onMouseEnter={() => {
        //                   setHighlightedIndex(i);
        //                 }}
        //                 key={option.key}
        //                 option={option}
        //               />
        //             ))}
        //           </ul>
        //         </div>,
        //         document.body
        //       )
        //     : null;
        // }}

        menuRenderFn={() => <div>fsdfsdf</div>}
      />
    </>
  );
}
