import { useCallback, useRef, useState } from "react";
import { Editor, Range } from "slate";
import areEqual from "deep-equal";

export default function useSelection(editor: Editor) {
  const [selection, setSelection] = useState(editor.selection);
  const previousSelection = useRef<Range>();
  const setSelectionCallback = useCallback(
    (newSelection) => {
      if (areEqual(selection, newSelection)) {
        return;
      }
      previousSelection.current = selection as Range;
      setSelection(newSelection);
    },
    [setSelection, selection]
  );
  return [previousSelection.current, selection, setSelectionCallback];
}
