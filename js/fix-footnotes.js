// Footnotes don't have backreferences which feel like a must, this script fixes it.
// I've read several times that zola has suppossedly fixed this but I haven't seen that.
// I copied this off https://github.com/getzola/zola/issues/1070#issuecomment-1166637092
function addBackreferencesToFootnotes() {
  const references = document.getElementsByClassName('footnote-reference')
  // For each footnote reference, set an id so we can refer to it from the definition.
  // If the definition had an id of 'some_id', then the reference has id `some_id_ref`.
  for (const reference of references) {
    const link = reference.firstChild
    const id = link.getAttribute('href').slice(1) // skip the '#'
    link.setAttribute('id', `${id}_ref`)
  }

  const footnotes = document.getElementsByClassName('footnote-definition')
  // For each footnote-definition, add an anchor element with an href to its corresponding reference.
  // The text used for the added anchor is 'Leftwards Arrow with Hook' (U+21A9).
  for (const footnote of footnotes) {
    const id = footnote.getAttribute('id')
    const backReference = document.createElement('a')
    backReference.setAttribute('href', `#${id}_ref`)
    backReference.textContent = '↩'
    footnote.append(backReference);
  }
}

// Some visual separation. It's pretty sad that I haven't found a better way to
// edit the footnote styling
function addHrBeforeFootnotes() {
  const firstFootnote = document.querySelector('.footnote-definition')

  if (firstFootnote) {
    const hr = document.createElement("hr");
    firstFootnote.before(hr);
  }
}

document.addEventListener('DOMContentLoaded', (_event) => {
  addBackreferencesToFootnotes();
  addHrBeforeFootnotes();
});
